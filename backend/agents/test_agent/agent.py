from pydantic import BaseModel, Field
from typing import List
from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool

# Define the schema
class SummaryReport(BaseModel):
    title: str = Field(description="Report title")
    key_points: List[str] = Field(description="Main findings")
    confidence: float = Field(description="Confidence score 0-1")

# Sub-agent with structured output
summary_agent = LlmAgent(
    name="summary_agent",
    model="gemini-2.5-flash",
    instruction="Summarize the provided text into a structured report.",
    output_schema=SummaryReport,
    output_key="summary_result",   # writes JSON to session.state["summary_result"]
)

# Parent reads the state after the sub-agent runs
root_agent = LlmAgent(
    name="test_agent",
    model="gemini-2.5-flash",
    instruction="""
        Delegate summarization to summary_agent. Return the result from the sub agent directly not need to refomat.
    """,
    tools=[AgentTool(summary_agent)],
)