from pydantic import BaseModel

class OrganizationCreate(BaseModel):
    name: str
    org_type: str
    industry: str
    org_size: str
    description: str
    website: str | None = None
    logo_url: str | None = None

class OrganizationResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
