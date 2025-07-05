from pydantic import BaseModel
from datetime import datetime


class VideoViewCreate(BaseModel):
    video_id: int

class VideoViewOut(VideoViewCreate):
    user_id: int
    video_id: int
    first_viewed: datetime
    user_name: str
    video_title: str

    class Config:
        # orm_mode = True
        from_attributes = True