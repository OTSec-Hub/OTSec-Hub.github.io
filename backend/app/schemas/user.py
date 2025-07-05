from pydantic import BaseModel, EmailStr
from typing import Optional
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    # role: str = "student"
    # is_verified : bool = False

class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
    role: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None

    class Config:
        # orm_mode = True
        from_attributes = True
        
class Token(BaseModel):
    access_token: str
    token_type: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str