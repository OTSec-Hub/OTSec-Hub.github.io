from pydantic import BaseModel
from datetime import datetime
from .user import UserOut
from .quiz import QuizOut
from typing import List, Optional


class UserProgressCreate(BaseModel):
    content_type: str
    content_id: int
    quiz_completed: Optional[bool] = None 

class UserProgressOut(BaseModel):
    user_id: int
    content_type: str
    content_id: int
    quiz_completed: Optional[bool] = None
    user_name: Optional[str] = None
    user_email: Optional[str] = None
    content_title: Optional[str] = None


    class Config:
        # orm_mode = True
        from_attributes = True