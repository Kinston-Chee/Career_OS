from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

import app.models as models
from app.database import get_db
# from app.schemas import PostResponse, UserCreate, UserPrivate, UserPublic, UserUpdate, Token

from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm

# from auth import  create_access_token, hash_password, oauth2_scheme, verify_access_token, verify_password
# from auth import CurrentUser, create_access_token, hash_password, verify_password
# from config import settings

from PIL import UnidentifiedImageError
from starlette.concurrency import run_in_threadpool
# from app.image_utils import delete_profile_image, process_profile_image

from agents.careeros_agent import agent
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    prompt: str

@router.post(
    "/chat",
    response_model=str,
    status_code=status.HTTP_201_CREATED,
)
async def chat(prompt:ChatRequest):
    response = await agent.chat(prompt.prompt)
    return(response)

