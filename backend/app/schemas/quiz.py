from pydantic import BaseModel, validator
from typing import List, Optional


class QuizCreate(BaseModel):
    # video_id: int
    question: str
    options: List[str]
    correct_answer: str
    
    @validator('options')
    def must_have_4_options(cls, v):
        if len(v) != 4:
            raise ValueError("Each quiz must have exactly 4 options.")
        return v

class QuizOut(BaseModel):
    id: int
    question: str
    option1: str
    option2: str
    option3: str
    option4: str
    correct_answer: str
    
    class Config:
        from_attributes = True
    
class QuizUpdate(BaseModel):
    id: int
    question: Optional[str] = None
    correct_answer: Optional[str] = None
    options: Optional[List[str]] = None

    class Config:
        from_attributes = True 