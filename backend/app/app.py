from fastapi import FastAPI, Request, HTTPException, status, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError # handle validation error 
from fastapi.exception_handlers import http_exception_handler, request_validation_exception_handler
from fastapi.responses import HTMLResponse, JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException 

from sqlalchemy import select # Help us to do query
from sqlalchemy.orm import Session, selectinload  # Session use for type hints 
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager

from app.database import engine, AsyncSessionLocal, Base
import routers.users as users
import routers.candidates as candidates 

from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(_app:FastAPI):
    # Startup
    # async with engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.create_all)
    yield
    
    # shutdown
    await engine.dispose()


app = FastAPI(lifespan=lifespan)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    # Allow your specific frontend origin (e.g., "http://localhost:3000")
    # For local testing, you can use ["*"] to allow all origins, 
    # but specify the exact URL in production.
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, OPTIONS, etc.
    allow_headers=["*"],  # Allows all headers
)

app.include_router(users.router, prefix='/api/users', tags=['users'])
app.include_router(candidates.router, prefix='/api/candidates', tags=['candidate'])




###### Exception Handler ######



