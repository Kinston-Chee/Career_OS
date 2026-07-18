from typing import Annotated, Tuple, Dict

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

import app.models as models
from app.database import get_db
from app.schema import CandidateExperienceLog, ChatRequest

from datetime import timedelta, datetime, UTC, date
from fastapi.security import OAuth2PasswordRequestForm

# from auth import  create_access_token, hash_password, oauth2_scheme, verify_access_token, verify_password
from auth import CurrentUser, create_access_token, hash_password, verify_password
# from config import settings

from PIL import UnidentifiedImageError
from starlette.concurrency import run_in_threadpool
# from app.image_utils import delete_profile_image, process_profile_image

from agents.careeros_agent import agent
from pydantic import BaseModel

router = APIRouter()

@router.post(
    "/chat",
    response_model=Dict,
    status_code=status.HTTP_201_CREATED,
)
async def chat(prompt:ChatRequest):
    response = await agent.chat(prompt.prompt)
    prompt_reply = response[0]
    data = response[1]
    return({'reply':prompt_reply, 'data':data})



@router.post("/add_experience", response_model=CandidateExperienceLog, status_code=status.HTTP_201_CREATED)
async def add_experience(data:CandidateExperienceLog, 
                         db: Annotated[AsyncSession, Depends(get_db)]):
    
    
    # Later add in user validation 
    
    # Validate the date 
    if data.start_date > date.today():
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="You cannot select a future date as start date",
        )
    
    
    # Add in candidate id back later
    new_experience = models.CandidateExperience(
        **data.model_dump(exclude={"evidence_link"}),
        evidence_link = str(data.evidence_link)
    )

    db.add(new_experience)  # .add() is still not an I/O bound task 
    await db.commit() # only use await for I/O bound task
    await db.refresh(new_experience)
    
    return(new_experience)

