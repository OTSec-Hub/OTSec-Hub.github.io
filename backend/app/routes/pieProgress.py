from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.quiz import Quiz
from app.models.video import Video
from app.models.videoProgress import VideoProgress
from app.models.user import User
from app.schemas.stats import ProgressPieChartOut
from typing import List

router = APIRouter()

@router.get("/stats", response_model=List[ProgressPieChartOut])
def get_all_users_progress_stats(db: Session = Depends(get_db)):
    # Get distinct users from video_progress table
    user_ids = db.query(VideoProgress.user_id).distinct().all()
    user_ids = [u[0] for u in user_ids]

    # Get total videos and total quizzes from DB
    total_videos = db.query(func.count(Video.id)).scalar()
    total_quizzes = db.query(func.count(Quiz.video_id.distinct())).scalar()

    results = []

    for user_id in user_ids:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            continue

        # Completed videos
        completed_video_ids = (
            db.query(VideoProgress.video_id)
            .filter(VideoProgress.user_id == user_id)
            .distinct()
            .all()
        )
        completed_videos = len(completed_video_ids)
        remaining_videos = total_videos - completed_videos

        # Completed quizzes (only where got_fullmark is True)
        completed_quizzes = (
            db.query(VideoProgress.video_id)
            .filter(VideoProgress.user_id == user_id, VideoProgress.got_fullmark == True)
            .distinct()
            .count()
        )
        remaining_quizzes = total_quizzes - completed_quizzes

        results.append(
            ProgressPieChartOut(
                user_id=user.id,
                name=user.name,
                completed_videos=completed_videos,
                remaining_videos=remaining_videos,
                completed_quizzes=completed_quizzes,
                remaining_quizzes=remaining_quizzes,
                # videoList=[],  # if wanted to show completed videos but need to uncomment from schema too
            )
        )

    return results
