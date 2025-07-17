from pydantic import BaseModel, Field
from typing import Optional, List
from .quiz import QuizCreate, QuizOut, QuizUpdate

class LabCreate(BaseModel):
    name: str
    quizzes: List[QuizCreate]
    
class LabOut(BaseModel):
    id: int
    name: str
    quizzes: List[QuizOut]
    
class LabUpdate(BaseModel):
    name: Optional[str] = None
    quizzes: Optional[List[QuizUpdate]] = None
    
    class Config:
        # orm_mode = True #old way pydantic v1
        from_attributes = True #new way pydantic v2x