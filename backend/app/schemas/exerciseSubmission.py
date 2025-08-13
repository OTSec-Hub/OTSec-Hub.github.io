from pydantic import BaseModel
from app.schemas.exercise import ExerciseOut
from typing import List, Optional

class ExerciseSubmissionCreate(BaseModel):
    answers: List[str]  
    status: Optional[str] = "pending"

class ExerciseSubmissionOut(BaseModel):
    id: int
    user_id: int
    exercise_id: int
    answers: List[str]
    exercise : ExerciseOut
    status: str

    class Config:
        orm_mode = True
        
class ExerciseSubmissionUpdate(BaseModel):
    status: str