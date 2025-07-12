from pydantic import BaseModel
from datetime import datetime
from .quiz import QuizOut
from typing import List, Optional


class VideoViewCreate(BaseModel):
    video_id: int

class VideoViewOut(VideoViewCreate):
    user_id: int
    video_id: int
    first_viewed: datetime
    user_name: Optional[str] = None
    video_title: Optional[str] = None
    got_fullmark: Optional[bool] = None
    # quizzes: List[QuizOut]


    class Config:
        # orm_mode = True
        from_attributes = True