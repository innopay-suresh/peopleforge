from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status, Cookie
from fastapi.security import OAuth2PasswordBearer
from .auth import verify_token, create_access_token
import os

REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY", "your-refresh-secret-key")

# --- Refresh Token Generator ---
def create_refresh_token(data: dict):
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm="HS256")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return payload  # You can return user object after DB lookup if needed

# --- Refresh Token Endpoint ---
def refresh_token(refresh_token: str = Cookie(...)):
    try:
        payload = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("sub")
        new_access_token = create_access_token({"sub": user_id})
        return {"access_token": new_access_token}
    except JWTError:
        raise HTTPException(status_code=401, detail="Refresh token invalid")
