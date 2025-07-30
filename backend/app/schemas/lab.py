from pydantic import BaseModel, Field
from typing import Optional, List
from .quiz import QuizCreate, QuizOut, QuizUpdate

class LabCreate(BaseModel):
    content: str
    title: str
    lab_img : str
    quizzes: List[QuizCreate]
    
class LabOut(BaseModel):
    id: int
    content: str
    title: str
    lab_img : str
    quizzes: List[QuizOut]
    
class LabUpdate(BaseModel):
    content: Optional[str] = None
    title: str
    lab_img : str
    quizzes: Optional[List[QuizUpdate]] = None
    
    class Config:
        # orm_mode = True #old way pydantic v1
        from_attributes = True #new way pydantic v2x