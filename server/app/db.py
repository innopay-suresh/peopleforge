from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os



# Set your production database URL here. Example for Postgres:
# DATABASE_URL = "postgresql://postgres:postgres@123@host.docker.internal:5432/peopleforge"
# For now, fallback to environment variable or SQLite for dev
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@pg:5432/peopleforge"
)

# If using SQLite, need connect_args; otherwise, for Postgres, omit it
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
