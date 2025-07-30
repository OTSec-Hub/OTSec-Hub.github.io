from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.quiz import Quiz
from app.models.video import Video
from app.models.lab import Lab  # Import Lab model
from app.models.userProgress import UserProgress
from app.models.user import User
from typing import List
from app.schemas.stats import ProgressPieChartOut

router = APIRouter()

@router.get("/stats", response_model=List[ProgressPieChartOut])
def get_all_users_progress_stats(db: Session = Depends(get_db)):
    try:
        # Get distinct users from user_progress table
        user_ids = db.query(UserProgress.user_id).distinct().all()
        user_ids = [u[0] for u in user_ids]

        # Get total videos, quizzes, and labs from DB
        total_videos = db.query(func.count(Video.id)).scalar() or 0
        total_quizzes = db.query(func.count(Quiz.video_id.distinct())).scalar() or 0
        total_labs = db.query(func.count(Lab.id)).scalar() or 0  # Count total labs

        results = []

        for user_id in user_ids:
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                continue

            # Completed videos
            completed_video_ids = (
                db.query(UserProgress.content_id)
                .filter(UserProgress.user_id == user_id, UserProgress.content_type == "video")
                .distinct()
                .all()
            )
            completed_videos = len(completed_video_ids)
            remaining_videos = total_videos - completed_videos

            # Completed quizzes (only where quiz_completed is True)
            completed_quizzes = (
                db.query(UserProgress.content_id)
                .filter(
                    UserProgress.user_id == user_id,
                    UserProgress.content_type == "video",
                    UserProgress.quiz_completed == True
                )
                .distinct()
                .count()
            )
            remaining_quizzes = total_quizzes - completed_quizzes

            # Completed labs
            completed_labs = (
                db.query(UserProgress.content_id)
                .filter(UserProgress.user_id == user_id, UserProgress.content_type == "lab")
                .distinct()
                .count()
            )
            remaining_labs = total_labs - completed_labs

            results.append(
                ProgressPieChartOut(
                    user_id=user.id,
                    name=user.name,
                    completed_videos=completed_videos,
                    remaining_videos=max(0, remaining_videos),
                    completed_quizzes=completed_quizzes,
                    remaining_quizzes=max(0, remaining_quizzes),
                    completed_labs=completed_labs,
                    remaining_labs=max(0, remaining_labs),
                )
            )

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))