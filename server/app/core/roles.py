# app/core/roles.py

class Roles:
    ADMIN = "admin"
    HR_MANAGER = "hr_manager"
    HR_USER = "hr_user"
    MANAGER = "manager"
    EMPLOYEE = "employee"
    EXPENSE_APPROVER = "expense_approver"
    LEAVE_APPROVER = "leave_approver"
    PROJECT_MANAGER = "project_manager"
    REPORTING_MANAGER = "reporting_manager"
    FINANCE = "finance"
    IT_SUPPORT = "it_support"
    LEGAL = "legal"
    RECRUITER = "recruiter"

    ALL_ROLES = [
        ADMIN, HR_MANAGER, HR_USER, MANAGER, EMPLOYEE,
        EXPENSE_APPROVER, LEAVE_APPROVER, PROJECT_MANAGER,
        REPORTING_MANAGER, FINANCE, IT_SUPPORT, LEGAL, RECRUITER
    ]
