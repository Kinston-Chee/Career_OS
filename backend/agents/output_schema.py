from pydantic import BaseModel, Field, ConfigDict, EmailStr, AnyUrl
from typing import Optional, List, Literal
from datetime import datetime, date


class CandidateExperienceLog(BaseModel):
    
    category: Literal['Experience', 'Education', 'Project','Competition','Leadership','Certification']
    title: str = Field(max_length=100)
    organisation:str = Field(max_length=100)
    start_date: date 
    end_date: Optional[date]  
    details: str = Field(max_length=2000)
    skills_used:List[str]
    evidence_link:AnyUrl
