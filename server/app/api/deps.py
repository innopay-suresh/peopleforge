from fastapi import Depends, HTTPException, status
from app.core.roles import Roles
from app.schemas.user import UserOut  # or however your auth returns user

def get_current_user():
    # Your current logic to get user from token
    ...

def require_roles(*allowed_roles):
    def role_checker(user: UserOut = Depends(get_current_user)):
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient role privileges"
            )
        return user
    return role_checker
