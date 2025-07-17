from pydantic import BaseModel
from datetime import datetime
from .user import UserOut
from .quiz import QuizOut
from typing import List, Optional


class VideoProgressCreate(BaseModel):
    video_id: int

class VideoProgressOut(VideoProgressCreate):
    user_id: int
    video_id: int
    first_viewed: datetime
    user_name: str
    user_email: str
    video_title: Optional[str] = None
    got_fullmark: Optional[bool] = None
    # quizzes: List[QuizOut]


    class Config:
        # orm_mode = True
        from_attributes = True