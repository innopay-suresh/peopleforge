# schemas/ldap_config.py
from pydantic import BaseModel

class LDAPConfigCreate(BaseModel):
    org_id: int
    server_url: str
    bind_dn: str
    bind_password: str
    base_dn: str
    user_filter: str | None = None
