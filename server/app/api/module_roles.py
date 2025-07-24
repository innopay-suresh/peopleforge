from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.module_role import ModuleRole, ReportingManager
from app.schemas.module_roles import ModuleRoleCreate, ReportingManagerAssign
from app.db import get_db

router = APIRouter(prefix="/admin/module-roles", tags=["Module Roles"])

@router.post("/assign")
def assign_module_role(payload: ModuleRoleCreate, db: Session = Depends(get_db)):
    existing = db.query(ModuleRole).filter_by(user_id=payload.user_id, module=payload.module).first()
    if existing:
        raise HTTPException(400, "User already has a role in this module")
    new_role = ModuleRole(**payload.dict())
    db.add(new_role)
    db.commit()
    return {"msg": "Module role assigned"}

@router.get("/")
def list_roles(db: Session = Depends(get_db)):
    return db.query(ModuleRole).all()

@router.delete("/{role_id}")
def delete_role(role_id: int, db: Session = Depends(get_db)):
    role = db.query(ModuleRole).get(role_id)
    if not role:
        raise HTTPException(404, "Not found")
    db.delete(role)
    db.commit()
    return {"msg": "Deleted"}

@router.post("/reporting-manager/assign")
def assign_rm(payload: ReportingManagerAssign, db: Session = Depends(get_db)):
    rm = ReportingManager(**payload.dict())
    db.add(rm)
    db.commit()
    return {"msg": "RM assigned"}

@router.get("/reporting-manager/list")
def list_rms(db: Session = Depends(get_db)):
    return db.query(ReportingManager).all()
