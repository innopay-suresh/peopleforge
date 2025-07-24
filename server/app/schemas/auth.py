from pydantic import BaseModel

class LoginRequest(BaseModel):
    username: str
    password: str
    org_id: int
    user_filter: str | None = None  # Optional, for custom LDAP DN templates
