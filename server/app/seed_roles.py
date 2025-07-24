from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.module_role import ModuleRole, ReportingManager

def seed():
    db: Session = SessionLocal()
    sample_roles = [
        ModuleRole(user_id=1, module="leave", role_type="approver"),
        ModuleRole(user_id=2, module="expense", role_type="approver"),
        ModuleRole(user_id=3, module="payroll", role_type="reviewer"),
    ]
    db.add_all(sample_roles)

    rm = ReportingManager(employee_id=4, manager_id=1)
    db.add(rm)

    db.commit()
    db.close()
    print("Seeded!")

if __name__ == "__main__":
    seed()
