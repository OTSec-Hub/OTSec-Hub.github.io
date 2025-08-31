from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LabCreate(BaseModel):
    pdf: str
    title: str
    lab_img: str
    status: str
    message: Optional[str] = None
    content: Optional[str] = None

class LabOut(BaseModel):
    id: int
    pdf: str
    title: str
    lab_img: str
    status: str
    user_id: int
    user_name: Optional[str]
    message: Optional[str] = None
    content: Optional[str] = None
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True  # for ORM

class LabUpdate(BaseModel):
    status: Optional[str] = None
    message: Optional[str] = None
    content: Optional[str] = None

    class Config:
        from_attributes = True
