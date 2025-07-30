from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.schemas.userProgress import UserProgressCreate, UserProgressOut
from app.models.video import Video
from app.models.userProgress import UserProgress
from app.database import get_db
from app.auth.auth import get_current_user
from app.models.user import User
from app.models.lab import Lab
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

@router.post("/track_progress", response_model=UserProgressOut)
async def track_progress(
    progress: UserProgressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check existing
    existing = db.query(UserProgress).filter(
        UserProgress.user_id == current_user.id,
        UserProgress.content_type == progress.content_type,
        UserProgress.content_id == progress.content_id
    ).first()

    if existing:
        if progress.content_type == "lab":  # For labs, conflict if exists
            raise HTTPException(status_code=409, detail="Progress already recorded")
        return existing  # For videos, return existing

    # Create new
    new_progress = UserProgress(
        user_id=current_user.id,
        content_type=progress.content_type,
        content_id=progress.content_id,
        quiz_completed=progress.quiz_completed
    )
    db.add(new_progress)
    db.commit()
    db.refresh(new_progress)

    # Get content title if video
    content_title = None
    if progress.content_type == "video":
        video = db.query(Video).filter(Video.id == progress.content_id).first()
        content_title = video.title if video else None

    return UserProgressOut(
        user_id=new_progress.user_id,
        content_type=new_progress.content_type,
        content_id=new_progress.content_id,
        quiz_completed=new_progress.quiz_completed,
        user_name=current_user.name,
        user_email=current_user.email,
        content_title=content_title
    )

@router.get("/track_progresss", response_model=list[UserProgressOut]) # get all progress
async def get_video_views(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        views = (
            db.query(UserProgress)
            .filter(UserProgress.content_type == "video", UserProgress.user_id == current_user.id)
            .join(User, UserProgress.user_id == User.id)
            .options(joinedload(UserProgress.user))
            .all()
        )
        result = []
        for view in views:
            content_title = None
            if view.content_type == "video":
                video = db.query(Video).filter(Video.id == view.content_id).first()
                content_title = video.title if video else None
            result.append(
                UserProgressOut(
                    user_id=view.user_id,
                    content_type=view.content_type,
                    content_id=view.content_id,
                    quiz_completed=view.quiz_completed,
                    user_name=view.user.name,
                    user_email=view.user.email,
                    content_title=content_title
                )
            )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/track_progress/fullmark/{video_id}") # patch quiz_completed in single progress
async def mark_fullmark(
    video_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        view = db.query(UserProgress).filter_by(
            user_id=current_user.id,
            content_type="video",
            content_id=video_id
        ).first()

        if not view:
            raise HTTPException(status_code=404, detail="View not found")

        view.quiz_completed = True
        db.commit()
        return {"message": "Marked as full score"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/track_progress/single_view", response_model=UserProgressOut) # get single progress
async def single_view(
    content_type: str,
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        if content_type not in ["video", "lab"]:
            raise HTTPException(status_code=400, detail="Invalid content type")
        
        view = db.query(UserProgress).filter_by(
            user_id=current_user.id,
            content_type=content_type,
            content_id=content_id
        ).join(User, UserProgress.user_id == User.id).first()

        if not view:
            raise HTTPException(status_code=404, detail="User has not watched this video")
        
        if content_type == 'video':
            content = db.query(Video).filter(Video.id == view.content_id).first()
        elif content_type == 'lab':
            content = db.query(Lab).filter(Lab.id == view.content_id).first()
            
        return UserProgressOut(
            user_id=view.user_id,
            content_type=view.content_type,
            content_id=view.content_id,
            quiz_completed=view.quiz_completed,
            user_name=view.user.name,
            user_email=view.user.email,
            content_title=content.title if content else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
