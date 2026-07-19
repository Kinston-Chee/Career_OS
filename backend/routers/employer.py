from typing import Annotated, Tuple, Dict

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

import app.models as models
from app.database import get_db
from app.schema import JobPostCreate

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

@router.post("/job_posting", response_model=JobPostCreate, status_code=status.HTTP_201_CREATED)
async def create_job_posting(data:JobPostCreate, 
                         db: Annotated[AsyncSession, Depends(get_db)]):
    
    
    # Later add in user validation 
    
    # Validate the date 
    if data.expiredAt <= date.today():
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="End date cannot be set as today or date passed",
        )
    
    # Add in candidate id back later
    new_job_posting = models.JobPosting(
        **data.model_dump(),
    )

    db.add(new_job_posting)  # .add() is still not an I/O bound task 
    await db.commit() # only use await for I/O bound task
    await db.refresh(new_job_posting)
    
    return(new_job_posting)



