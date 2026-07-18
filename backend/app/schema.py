from pydantic import BaseModel, Field, ConfigDict, EmailStr
import uuid
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    candidate = "candidate"
    company = "company"
    university = "university"
    
class UserBase(BaseModel):
    username:str = Field(min_length=1, max_length=50)
    email: EmailStr = Field(max_length=120)
    first_name:str = Field(min_length=1, max_length = 50)
    last_name:str = Field(min_length=1, max_length = 50)
    role: UserRole
    

class UserCreate(UserBase):
    password:str = Field(min_length=8)
    
class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id:uuid.UUID
    username: str
    image_file: str|None 
    image_path: str 
    
class UserPrivate(UserPublic):
    email:EmailStr 
    

class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    
    id:uuid.UUID
    image_file: str|None 
    image_path: str 
    
class UserUpdate(BaseModel):
    username:str | None= Field(default=None, min_length=1, max_length=50)
    email: EmailStr | None = Field(default=None, max_length=120)
    # image_file:str | None= Field(default=None, min_length=1, max_length=200)


class CandidateExperience(str, Enum):
    less_than_one_year = 'less than one year'
    one_to_three_years = '1 to 3 years'
    three_to_five_years = '3 to 5 years'
    more_than_five_years = 'more than 5 years'

class UserProfile(BaseModel):
    name: str 
    age: str 
    

class Token(BaseModel):
    access_token : str 
    token_type:str

class PostBase(BaseModel):
    # shared between creating and returning a post 
    title:str = Field(min_length=1, max_length=100)
    content: str = Field(min_length=1)
    # author: str = Field(min_length=1, max_length=50)
    
class PostCreate(PostBase):
    # user_id: int # temporary use, we will change it to author_id later; we need it to link the post to a user
    # user id is no longer part of the data client send to the API during creating post. They cannot claim as someone else
    # server will determine the user from the trusted token
    pass 
    

# Partial update
class PostUpdate(BaseModel):
    title:str = Field(default=None, min_length=1, max_length=100)
    content: str = Field(default=None, min_length=1)

class PostResponse(PostBase):
    # ConfigDict is basically a setting to configure the behaviour of the Pydantic Models
    model_config = ConfigDict(from_attributes=True) 
    # from_attributes allow the model to read data from object with attributes instead of just dictionary (eg. know how to read post.title instead of just knowing read from post['title'])
    
    id:int
    user_id: int 
    date_posted:datetime
    author: UserPublic # Return us the user details 
    
