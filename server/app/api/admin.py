from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.module_role import ModuleRole
from app.models.reporting_manager import ReportingManager
from app.models.user import User
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/admin", tags=["admin"])

# --- Module Roles ---

# --- Pydantic Schemas ---
class ModuleRoleAssignRequest(BaseModel):
    user_id: int
    module: str
    role_type: str

class ModuleRoleResponse(BaseModel):
    id: int
    user_id: int
    module: str
    role_type: str
    active: bool
    created_at: datetime

    class Config:
        orm_mode = True

class ReportingManagerAssignRequest(BaseModel):
    employee_id: int
    manager_id: int

class ReportingManagerResponse(BaseModel):
    id: int
    employee_id: int
    manager_id: int
    created_at: datetime

    class Config:
        orm_mode = True


@router.get("/module-roles/", response_model=List[ModuleRoleResponse])
def list_module_roles(db: Session = Depends(get_db)):
    roles = db.query(ModuleRole).all()
    return roles


@router.post("/module-roles/assign", response_model=ModuleRoleResponse)
def assign_module_role(payload: ModuleRoleAssignRequest, db: Session = Depends(get_db)):
    role = ModuleRole(
        user_id=payload.user_id,
        module=payload.module,
        role_type=payload.role_type,
        active=True,
        created_at=datetime.utcnow()
    )
    db.add(role)
    db.commit()
    db.refresh(role)
    return role


@router.delete("/module-roles/{id}", response_model=dict)
def delete_module_role(id: int, db: Session = Depends(get_db)):
    role = db.query(ModuleRole).filter(ModuleRole.id == id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    db.delete(role)
    db.commit()
    return {"message": "Role deleted"}


# --- Reporting Manager ---
@router.post("/reporting-manager/assign", response_model=ReportingManagerResponse)
def assign_reporting_manager(payload: ReportingManagerAssignRequest, db: Session = Depends(get_db)):
    rel = ReportingManager(
        employee_id=payload.employee_id,
        manager_id=payload.manager_id,
        created_at=datetime.utcnow()
    )
    db.add(rel)
    db.commit()
    db.refresh(rel)
    return rel

@router.get("/reporting-manager/list", response_model=List[ReportingManagerResponse])
def list_reporting_managers(db: Session = Depends(get_db)):
    rels = db.query(ReportingManager).all()
    return rels
