from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VideoCreate(BaseModel):
    title: str 
    subtitle: str
    description: str
    url: str 
    status: str
    message: Optional[str] = None

class VideoOut(BaseModel):
    id: int
    title: str
    subtitle: str
    description: str
    url: str
    status: str
    user_id: int
    user_name: Optional[str]
    message: Optional[str]
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True  # for ORM

class VideoUpdate(BaseModel):
    status: Optional[str] = None
    message: Optional[str] = None

    class Config:
        from_attributes = True
