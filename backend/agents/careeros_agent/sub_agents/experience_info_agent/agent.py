from google.adk.agents import Agent
from google.adk.agents.callback_context import CallbackContext
from google.genai import types
from typing import Optional
from datetime import datetime 

# import sys
# from pathlib import Path
# sys.path.insert(0, str(Path(__file__).parent.parent))  # adjust depth as needed

# from output_schema import CandidateExperienceLog

from dotenv import load_dotenv
import requests
import os

from pydantic import BaseModel, Field, ConfigDict, EmailStr, AnyUrl, field_serializer
from typing import Optional, List, Literal
from datetime import datetime, date


load_dotenv('agents\\careeros_agent\\.env')
api_url = os.getenv('API_URL') 

class CandidateExperienceLog(BaseModel):
    
    category: Literal['Experience', 'Education', 'Project','Competition','Leadership','Certification']
    title: str = Field(max_length=100)
    organisation:str = Field(max_length=100)
    start_date: date 
    end_date: Optional[date]  
    details: str = Field(max_length=2000)
    skills_used:List[str]
    evidence_link:AnyUrl
    
    @field_serializer('start_date')
    def serialize_start_date(self, v: date) -> str:
        return v.isoformat()

    @field_serializer('end_date')
    def serialize_end_date(self, v: Optional[date]) -> Optional[str]:
        return v.isoformat() if v else None

    @field_serializer('evidence_link')
    def serialize_evidence_link(self, v: AnyUrl) -> str:
        return str(v)



def after_agent_callback(callback_context: CallbackContext) -> Optional[types.Content]:
    """
    Callback function that transfer sub-agent output to API.

    Args:
        callback_context: Contains state and context information

    Returns:
        None to continue with normal agent processing
    """
    # Get the session state
    state = callback_context.state
    result = state.get('candidate_experience', {})
    # validated = CandidateExperienceLog.model_validate(result)
    # json_str = validated.model_dump_json()
    requests.post(f'{api_url}/api/candidates/add_experience', json=result)
    # requests.post(f'{api_url}/add_experience', data=json_str, headers={"Content-Type": "application/json"})

    return None

experience_info_agent = Agent(
    name="experience_info_agent",
    model="gemini-3.5-flash",
    description="An agent that extract experience info from the user prompt.",
    instruction="""
    Extract the following essential information about candidate experience based on the prompt:
    
    - category: Literal['Experience', 'Education', 'Project','Competition','Leadership','Certification']
    - title: str 
    - organisation:str 
    - start_date: date 
    - end_date: Optional[date]  
    - details: str 
    - skills_used:List[str]
    - evidence_link:AnyUrl
    
    Return None if related data not found. 
    
    IMPORTANT: Your response MUST be valid JSON matching this structure:
        {
            category: Literal['Experience', 'Education', 'Project','Competition','Leadership','Certification']
            title: str 
            organisation:str 
            start_date: date 
            end_date: Optional[date]  
            details: str 
            skills_used:List[str]
            evidence_link:AnyUrl
        }
    
    """, 
    output_schema=CandidateExperienceLog,
    output_key='candidate_experience',
    # after_agent_callback=after_agent_callback
)