from pydantic import BaseModel
from datetime import datetime

class AnnouncementCreate(BaseModel):
    content_type: str
    content_id: int
    title: str
    image : str
    
class AnnouncementOut(BaseModel):
    id: int
    content_type: str
    content_id: int
    title: str
    image : str
    created_at: datetime
    
    class Config:
        from_attributes=True
    
class AnnouncementUpdate(BaseModel):
    content_type: str
    content_id: int
    title: str
    image : str
    
    class Config:
        # orm_mode = True #old way pydantic v1
        from_attributes = True #new way pydantic v2x