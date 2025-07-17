from datetime import timedelta
from jose import jwt,JWTError
from fastapi import HTTPException
from .auth import create_access_token, SECRET_KEY, ALGORITHM
from dotenv import load_dotenv
import os

#create temp token for educator
def create_verification_token(email: str):
    return create_access_token(
        data={"email": email, "purpose": "verify_educator"},
        expires_delta=timedelta(hours=24)
    )

def verify_educator_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("purpose") != "verify_educator":
            raise HTTPException(status_code=400, detail="Invalid token purpose")
        return payload.get("email")
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid or expired token")