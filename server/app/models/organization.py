
from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    org_type = Column(String)
    industry = Column(String)
    org_size = Column(String)
    description = Column(Text)
    website = Column(String)
    logo_url = Column(String)
