from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.auth.dependencies import get_current_user  # Ensure this returns the user from JWT
from app.db import get_db
from sqlalchemy.orm import Session
from app.models import Organization

router = APIRouter()

from pydantic import Field

class OrgSetupPayload(BaseModel):
    name: str = Field(..., example="Test Org")
    org_type: str = Field(..., example="Private")
    industry: str = Field(..., example="IT")
    org_size: str = Field(..., example="1-10")
    description: str = Field("", example="India")
    website: str = Field("", example="https://example.com")
    logo_url: str = Field("", example="https://example.com/logo.png")

@router.post("/api/org/setup")
def setup_org(
    data: OrgSetupPayload,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    org = Organization(
        name=data.name,
        org_type=data.org_type,
        industry=data.industry,
        org_size=data.org_size,
        description=data.description,
        website=data.website,
        logo_url=data.logo_url
    )
    db.add(org)
    db.commit()
    db.refresh(org)
    return {"message": "Organization setup complete", "id": org.id}
