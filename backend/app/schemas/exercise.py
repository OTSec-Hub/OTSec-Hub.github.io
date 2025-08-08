from pydantic import BaseModel, Field
from typing import Optional, List

class ExerciseCreate(BaseModel):
    title: str
    subtitle: str
    content: str
    questions: Optional[List[str]] = Field(default_factory=list)

class ExerciseOut(BaseModel):
    id: int
    title: str
    subtitle: str
    content: str
    questions: List[str] = Field(default_factory=list)

class ExerciseUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    content: Optional[str] = None
    questions: Optional[List[str]] = None

    class Config:
        from_attributes = True
