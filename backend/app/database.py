from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from config import settings

# SQLALCHEMY_DATABASE_URL = f'postgresql+psycopg://{settings.db_user}:{settings.db_password}@{settings.db_host}/{settings.db_name}'  # engine_name:///path_to_db (dialect+driver://username:password@host:port/database)

# Connection to the database
# engine = create_async_engine(
#     SQLALCHEMY_DATABASE_URL,
#     connect_args={"check_same_thread": False}, # special arguement for sqlite
# )

engine = create_async_engine(
   settings.database_url
)


# A session is a transaction of data (when commit changes)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
AsyncSessionLocal = async_sessionmaker(engine, class_= AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass



# # Function that provide session to our routes
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session