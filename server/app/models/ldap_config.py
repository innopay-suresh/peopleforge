from sqlalchemy import Column, Integer, String
from app.core.database import Base

class LDAPConfig(Base):
    __tablename__ = "ldap_configs"

    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, index=True)  # FK to orgs table
    server_url = Column(String, nullable=False)
    bind_dn = Column(String, nullable=False)
    bind_password = Column(String, nullable=False)
    base_dn = Column(String, nullable=False)
    user_filter = Column(String, nullable=True)
