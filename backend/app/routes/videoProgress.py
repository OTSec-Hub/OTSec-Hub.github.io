from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.schemas.videoProgress import VideoProgressCreate , VideoProgressOut
from app.models.video import Video
from app.models.videoProgress import VideoProgress
from app.database import get_db
from app.auth.auth import get_current_user
from dotenv import load_dotenv
from app.models.user import User

load_dotenv()
router = APIRouter()


@router.post("/video_view", response_model=VideoProgressOut)
async def track_video_view(
    view: VideoProgressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Check if view already exists
        existing = db.query(VideoProgress).filter(
            VideoProgress.user_id == current_user.id,
            VideoProgress.video_id == view.video_id
        ).first()

        if not existing:
            db_view = VideoProgress(
                user_id=current_user.id,
                video_id=view.video_id
            )
            db.add(db_view)
            db.commit()
            db.refresh(db_view)
            return db_view
        return existing
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
# @router.get('/get_video_views', response_model=List[VideoOut])
# def get_video_views(db: Session = Depends(get_db)):
#     viewed_videos = db.query(VideoProgress).all()
#     return viewed_videos

@router.get("/video_views", response_model=list[VideoProgressOut])
async def get_video_views(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        views = (
            db.query(VideoProgress)
            .join(User, VideoProgress.user_id == User.id)
            .join(Video, VideoProgress.video_id == Video.id)
            .options(joinedload(VideoProgress.user), joinedload(VideoProgress.video))
            .all()
        )
        return [
            VideoProgressOut(
                user_id=view.user_id,
                video_id=view.video_id,
                first_viewed=view.first_viewed,
                user_name=view.user.name,
                user_email=view.user.email,
                video_title=view.video.title,
                got_fullmark=view.got_fullmark
            )
            for view in views
        ]
        # return [VideoProgressOut.from_orm(view) for view in views] 
        # #won't work because Pydantic tries to access .user_name and .video_title on the VideoProgress model instance, but those fields do not exist directly
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# @router.get("/video_view/has_watched/{video_id}")
# async def has_watched_video(video_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     view = db.query(VideoProgress).filter_by(
#         video_id=video_id,
#         user_id=current_user.id
#     ).first()

#     return {"hasWatched": view is not None}
    

@router.patch("/video_view/fullmark/{video_id}")
async def mark_fullmark(video_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        view = db.query(VideoProgress).filter_by(
            video_id=video_id,
            user_id=current_user.id
        ).first()

        if not view:
            raise HTTPException(status_code=404, detail="View not found")

        view.got_fullmark = True
        db.commit()
        return {"message": "Marked as full score"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/video_view/single_view/{video_id}", response_model=VideoProgressOut)
def single_view(video_id: int, 
                db: Session = Depends(get_db), 
                current_user: User = Depends(get_current_user)):
    user_id = current_user.id

    view = db.query(VideoProgress).filter_by(user_id=user_id, video_id=video_id).first()

    if not view:
        raise HTTPException(status_code=404, detail="User has not watched this video")
    
    return VideoProgressOut(
        user_id=view.user_id,
        video_id=view.video_id,
        first_viewed=view.first_viewed,
        user_name=view.user.name,
        user_email=view.user.email,
        video_title=view.video.title,
        got_fullmark=view.got_fullmark,
    )