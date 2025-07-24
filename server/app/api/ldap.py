# backend/api/routes/ldap.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.ldap_config import LDAPConfigCreate
from app.models.ldap_config import LDAPConfig

from app.db import get_db
from ldap3 import Server, Connection, ALL, core
import os
import json
from app.utils.encryption import encrypt_password, decrypt_password

router = APIRouter(prefix="/api/ldap", tags=["LDAP"])

# Simple in-memory store for demo purposes
LDAP_CONFIG_PATH = "config/ldap_config.json"

@router.post("/configure")
def configure_ldap(config: LDAPConfigCreate, db: Session = Depends(get_db)):
    encrypted_pwd = encrypt_password(config.bind_password)
    ldap_obj = LDAPConfig(**config.dict(exclude={"bind_password"}), bind_password=encrypted_pwd)
    db.add(ldap_obj)
    db.commit()
    db.refresh(ldap_obj)
    return {"message": "LDAP configuration saved", "id": ldap_obj.id}


@router.get("/config")
def get_ldap_config(org_id: int, db: Session = Depends(get_db)):
    config = db.query(LDAPConfig).filter(LDAPConfig.org_id == org_id).first()
    if not config:
        raise HTTPException(status_code=404, detail="LDAP config not found")
    return {
        "server_url": config.server_url,
        "base_dn": config.base_dn,
        "bind_dn": config.bind_dn,
        "user_filter": config.user_filter,
        "org_id": config.org_id
        # DO NOT return bind_password
    }

@router.post("/test")
def test_ldap_connection(config: LDAPConfigCreate):
    try:
        password = config.bind_password
        if not password.startswith("plain:"):
            password = decrypt_password(password)
        else:
            password = password[len("plain:"):]
        server = Server(config.server_url, get_info=ALL)
        conn = Connection(server, user=config.bind_dn, password=password, auto_bind=True)
        conn.search(search_base=config.base_dn, search_filter=getattr(config, "user_filter", "(objectClass=person)"))
        conn.unbind()
        return {"success": True, "message": "Connection successful"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"LDAP connection failed: {str(e)}")
