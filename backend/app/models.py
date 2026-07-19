from __future__ import annotations

from datetime import UTC, datetime, date

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, Enum, Date, ARRAY, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from typing import Optional

from app.database import Base
from app.schema import UserRole
import enum

# Database Table Schema 

# Generic User 
class User(Base):
    __tablename__ = "users"  # define the table name 

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    ) # store as column
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(200), nullable=False)
    image_file: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
        default=None,
    ) # we only used it to store the file path, while images is stored in another file structure
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role_enum"),
        nullable=False,
    )
    
    # @property turns a method into a property; so that we can directly use User.image_path
    @property
    def image_path(self) -> str:
        if self.image_file:
            return f"backend/local_data/profile_pics/{self.image_file}"
        return "backend/local_data/profile_pics/default.jpg"


class Candidate(Base):
    __tablename__ = "candidate"
    
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    ) # store as column
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )
    status: Mapped[str] = mapped_column(
        String
    )



class CandidateExperience(Base):
    __tablename__ = "candidate_experience"
    
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    ) # store as column
    candidate_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("candidate.id"),
        nullable=True,
        index=True,
    )
    
     # --- From CandidateExperienceLog ---
    category: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )
    title: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    organisation: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    start_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )
    end_date: Mapped[Optional[date]] = mapped_column(
        Date,
        nullable=True,
    )
    details: Mapped[str] = mapped_column(
        String(2000),
        nullable=True,
    )
    skills_used: Mapped[list[str]] = mapped_column(
        ARRAY(String),
        nullable=True,
        default=list,
    )
    evidence_link: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )
    

class CompanyProfile(Base):
    
    __tablename__ = 'company_profile'
    
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    num_of_employee: Mapped[int]  = mapped_column(Integer, nullable=True)
    address:Mapped[str] = mapped_column(String(60), nullable=False)
    city: Mapped[str] = mapped_column(String(50), nullable=False)
    country: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(String(2000), nullable=False)
    ssm_id:Mapped[str] = mapped_column(String(100), nullable=False)
    logo_file: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
        default=None,
    )
    
    @property
    def logo_path(self) -> str:
        if self.logo_file:
            return f"backend/local_data/company_logos/{self.logo_file}"
        return "backend/local_data/company_logo/default.jpg"
    

class JobPosting(Base):
    __tablename__ = 'job_posting'
    
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(String(50), nullable=False)    
    detail: Mapped[str] = mapped_column(String(1500), nullable=False)
    minSalary: Mapped[int] = mapped_column(Integer, nullable=True)
    maxSalary: Mapped[int] = mapped_column(Integer, nullable=True)
    application_num : Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    view_num: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    
    avg_match : Mapped[float] = mapped_column(Float, nullable=True) 
    
    # 1. The foreign key column that stores the ID of the top candidate
    top_candidate_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("candidate.id"), nullable=True
    )

    # 2. The relationship object to access the Candidate instance directly
    top_candidate: Mapped[Candidate| None] = relationship(
        "Candidate", foreign_keys=[top_candidate_id]
    )
    
    createdAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), # datatype
        default=lambda: datetime.now(UTC),
    )
    expiredAt:  Mapped[datetime] = mapped_column(
        Date,
        nullable=False,
    )
    

class Employer(Base):
    __tablename__ = 'employer'
    
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    company_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("company_profile.id"),
        nullable=False,
        index=True,
    )



class UniversityProfile(Base):
    __tablename__ = "university_profile"
    
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    ) # store as column
    num_of_student: Mapped[int] = mapped_column(
        Integer,
        nullable= False
    ) 
    num_of_faculties: Mapped[int] = mapped_column(
        Integer,
        nullable= False
    ) 




