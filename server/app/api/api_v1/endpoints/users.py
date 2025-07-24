from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.core.roles import Roles
from app.models.user import User
from app.api.deps import get_db, require_roles

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{user_id}/role", response_model=str)
def get_user_role(user_id: int, db: Session = Depends(get_db), user=Depends(require_roles(Roles.ADMIN, Roles.HR_MANAGER))):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user.role

@router.put("/{user_id}/role", response_model=str)
def update_user_role(user_id: int, role: str, db: Session = Depends(get_db), user=Depends(require_roles(Roles.ADMIN, Roles.HR_MANAGER))):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.role = role
    db.commit()
    return db_user.role
