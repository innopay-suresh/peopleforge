from fastapi import APIRouter, Depends, HTTPException
from app.deps import get_current_user

router = APIRouter()

@router.get("/employee/profile", response_model=dict)
def read_profile(user: dict = Depends(get_current_user)):
    # Production: Validate user, fetch from DB, handle missing fields, etc.
    if not user or 'sub' not in user:
        raise HTTPException(status_code=400, detail="Invalid user payload")
    return {"message": f"Hello {user['sub']}"}
