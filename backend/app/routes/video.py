from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from app.schemas.video import VideoCreate, VideoOut, VideoUpdate
from app.schemas.videoView import VideoViewCreate , VideoViewOut
from app.models.video import Video
from app.models.videoView import VideoView
from app.database import get_db
from typing import List
from app.auth.auth import get_current_user
from dotenv import load_dotenv
from app.models.user import User

import os

load_dotenv()

router = APIRouter()


@router.post("/add_video",response_model=VideoOut)
def add_video(video:VideoCreate,db: Session = Depends(get_db)):
    db_video = Video(
        title=video.title,
        subtitle=video.subtitle,
        description=video.description,
        url=video.url,
    )
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

@router.get("/get_videos", response_model=List[VideoOut])
def get_videos(db: Session = Depends(get_db)):
    videos = db.query(Video).all()
    return videos

@router.get("/get_video/{video_id}", response_model=VideoOut)
def get_video(video_id: int, db: Session = Depends(get_db)):
    db_video = db.query(Video).filter(Video.id == video_id).first()
    
    if not db_video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    return db_video

@router.put("/update_video/{video_id}", response_model=VideoOut)
def update_video(video_id:int,video:VideoUpdate,db: Session = Depends(get_db)):

    db_video = db.query(Video).filter(Video.id == video_id).first()
    
    if not db_video:
        raise HTTPException(status_code=404, detail="Video not found")
    if video.title:
        db_video.title = video.title
    if video.subtitle:
        db_video.subtitle = video.subtitle
    if video.description:
        db_video.description = video.description
        
    db.commit()
    db.refresh(db_video)
    return db_video

@router.delete("/delete_video/{video_id}", response_model=VideoOut)
def delete_video(video_id:int,db : Session = Depends(get_db)):
    
    db_video= db.query(Video).filter(Video.id == video_id).first()
    
    if not db_video:
        raise HTTPException(status=404, detail="Video not found")
    
    db.delete(db_video)
    db.commit()
    return db_video

# ===========================================================

@router.post("/video_view", response_model=VideoViewOut)
async def track_video_view(
    view: VideoViewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Check if view already exists
        existing = db.query(VideoView).filter(
            VideoView.user_id == current_user.id,
            VideoView.video_id == view.video_id
        ).first()

        if not existing:
            db_view = VideoView(
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
#     viewed_videos = db.query(VideoView).all()
#     return viewed_videos

@router.get("/video_views", response_model=list[VideoViewOut])
async def get_video_views(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        views = (
            db.query(VideoView)
            .join(User, VideoView.user_id == User.id)
            .join(Video, VideoView.video_id == Video.id)
            .options(joinedload(VideoView.user), joinedload(VideoView.video))
            .all()
        )
        return [
            VideoViewOut(
                user_id=view.user_id,
                video_id=view.video_id,
                first_viewed=view.first_viewed,
                user_name=view.user.name,
                video_title=view.video.title
            )
            for view in views
        ]
        # return [VideoViewOut.from_orm(view) for view in views] 
        # #won't work because Pydantic tries to access .user_name and .video_title on the VideoView model instance, but those fields do not exist directly
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))