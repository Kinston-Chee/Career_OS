# from google.adk.agents import Agent, ParallelAgent, SequentialAgent

# # Your application function that receives the raw model response
# def my_after_model_logic(callback_context, llm_response):
#     # Extract text content or tool calls from the response object
#     # text_output = llm_response.choices[0].message.content
    
#     # Forward the payload directly to your external application systems
    
#     # Return the response unmodified to let ADK continue execution
#     print( llm_response)

# root_agent = Agent(
#     name="careeros_agent",
#     model="gemini-2.5-flash",
#     description="Career advice agent",
#     instruction="""
#     You are a career development advisor, who helps candidates to develop their career goal and find suitable jobs.
#     """,
#     after_model_callback=my_after_model_logic
# )


# # Run the agent with user input
# response = run(root_agent, input="How to be a financial analyst")

# # 1. Capture the final text response string to pass to your UI/app logic
# final_text = response.text
# print(f"Agent response to app: {final_text}")



import asyncio
from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService, DatabaseSessionService
from google.genai.types import Content, Part
from google.adk.errors.already_exists_error import AlreadyExistsError
from google.adk.models.lite_llm import LiteLlm
from google.adk.tools.agent_tool import AgentTool
import os 
from dotenv import load_dotenv
from .sub_agents.experience_info_agent.agent import experience_info_agent

import asyncio
import selectors
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

load_dotenv()


# model_name = LiteLlm(model="ollama/llama2")

model_name = LiteLlm(model=f'{os.getenv('LOCAL_MODEL_PREFIX')}/{os.getenv('LOCAL_MODEL_NAME')}') if (len(os.getenv('LOCAL_MODEL_NAME')) > 0) and (len(os.getenv('LOCAL_MODEL_PREFIX')) > 0) else os.getenv('CLOUD_MODEL_NAME')

# Define a simple agent
root_agent = Agent(
    name="careeros_agent",
    # model="gemini-2.5-flash",
    model = model_name,
    description="A career assistant who gives career advice and help user to navigate the platform",
    instruction="""
    You are a helpful career advisor. Answer questions about careers, skills, and job searching.
    
    Always delegate the task to the appropriate agent if needed. Use your best judgement 
    to determine which agent to delegate to.

    You are responsible for delegating tasks to the following agent:
    1) experience_info_agent 
       - If this agent is delegated, root agent no need to return the value from this sub-agent. Just reply the user whether you have successfully done the task
    
    """,
    # sub_agents=[experience_info_agent]
    tools = [AgentTool(experience_info_agent)]
)

# database_url = "postgresql+psycopg://careeros_admin:admin123@localhost/careeros_ai"
database_url = os.getenv('AI_DATABASE_URL')


async def chat(message: str, session_id: str = "demo-session") -> str:
    session_service = DatabaseSessionService(db_url=database_url) 
    # session_service = InMemorySessionService() ; Use In Memory Session if local model take too long time to respond
    runner = Runner(
        agent=root_agent,
        app_name="careeros",
        session_service=session_service,
    )

    # Create session
    try:
        # Try creating a brand new session
        session = await session_service.create_session(
            app_name="careeros",
            user_id="user",
            session_id="demo-session"
        )
        print(f"Created new session: {session.id}")
    except AlreadyExistsError:
        # If it already exists, just fetch the existing one to resume it
        session = await session_service.get_session(
            app_name="careeros",
            user_id="user",
            session_id="demo-session"
        )
        print(f"Resumed existing session: {session.id}")

    # Wrap message in ADK's Content format
    user_message = Content(role="user", parts=[Part(text=message)])

    # Run agent and collect final response
    final_text = ""
    sub_agent_response={}
    async for event in runner.run_async(
        user_id="user",
        session_id=session_id,
        new_message=user_message,
    ):
        # Sub-agent was invoked as a tool — capture the call
        function_calls = event.get_function_calls()
        if function_calls:
            for call in function_calls:
                print(f"Sub-agent called: {call.name}")
                # print(f"Input: {call.args}")
        
        # Sub-agent returned a result — this is what you want
        function_responses = event.get_function_responses()
        if function_responses:
            for response in function_responses:
                if response.name == experience_info_agent.name:
                      sub_agent_response[response.name] = response.response
                
                # print(f"Sub-agent: {response.name}")
                # print(f"Output: {response.response}")  # dict
            
        if event.is_final_response() and event.content:
            for part in event.content.parts:
                if part.text:
                    final_text += part.text

    return(final_text, sub_agent_response)


async def main():
    print("Career Agent ready. Type 'quit' to exit.\n")

    session_id = "demo-session"

    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ("quit", "exit"):
            break
        if not user_input:
            continue

        response = await chat(user_input, session_id=session_id)
        print(f"Agent: {response}\n")


if __name__ == "__main__":
    asyncio.run(main())



