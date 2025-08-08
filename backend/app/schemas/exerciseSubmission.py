from pydantic import BaseModel
from app.schemas.exercise import ExerciseOut
from typing import List

class ExerciseSubmissionCreate(BaseModel):
    answers: List[str]  

class ExerciseSubmissionOut(BaseModel):
    id: int
    user_id: int
    exercise_id: int
    answers: List[str]
    exercise : ExerciseOut

    class Config:
        orm_mode = True