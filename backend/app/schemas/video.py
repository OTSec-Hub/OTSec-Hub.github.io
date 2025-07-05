from pydantic import BaseModel, Field
from typing import Optional
class VideoCreate(BaseModel):
    title: str = Field(..., description="Title of the video")
    subtitle: Optional[str] = Field(None, description="Subtitle of the video")
    description: Optional[str] = Field(None, description="Description of the video")
    url: str = Field(..., description="URL of the video")
    
class VideoOut(BaseModel):
    id: int
    title: str
    subtitle: Optional[str] = None
    description: Optional[str] = None
    url: str
    
class VideoUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    description: Optional[str] = None
    
    class Config:
        # orm_mode = True #old way pydantic v1
        from_attributes = True #new way pydantic v2