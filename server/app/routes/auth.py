from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.auth import create_access_token

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/api/login")
def login(data: LoginRequest):
    # 🔐 Replace this with DB/LDAP user lookup
    if data.email != "admin@example.com" or data.password != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    token = create_access_token({"sub": data.email})
    return {"access_token": token, "token_type": "bearer"}
