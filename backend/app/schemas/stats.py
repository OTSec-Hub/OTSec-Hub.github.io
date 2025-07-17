# schemas/stats.py

from pydantic import BaseModel
from typing import List

class ProgressPieChartOut(BaseModel):
    user_id: int
    name: str
    completed_videos: int
    remaining_videos: int
    completed_quizzes: int
    remaining_quizzes: int
    # videoList: List[str] # List of completed video titles

    class Config:
        orm_mode = True