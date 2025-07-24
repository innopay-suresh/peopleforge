from pydantic import BaseModel
from typing import Optional

class ModuleRoleCreate(BaseModel):
    user_id: int
    module: str
    role_type: str

class ReportingManagerAssign(BaseModel):
    employee_id: int
    manager_id: int
