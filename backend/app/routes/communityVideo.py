from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.database import get_db
from typing import List
from app.models.communityVideo import CommunityVideo
from app.models.user import User
from app.schemas.communityVideo import VideoCreate, VideoOut, VideoUpdate
from app.auth.auth import get_current_user, admin_or_educator

router = APIRouter()

@router.post("/create_communityVideo", response_model=VideoOut)
async def create_video(
    video_data: VideoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> VideoOut:
    
    print(f"DEBUG: User role is: '{current_user.role}'")  # Add this line
    print(f"DEBUG: User ID: {current_user.id}, Username: {current_user.username}")
    
    # if current_user.role not in ["admin", "educator"]:
    #     raise HTTPException(status_code=403, detail="Admin or Educator privileges required")
    
    new_video = CommunityVideo(
        title=video_data.title,
        subtitle=video_data.subtitle,
        description=video_data.description,
        url=video_data.url,
        status=video_data.status,
        user_id=current_user.id,
        message=video_data.message
    )
    db.add(new_video)
    db.commit()
    db.refresh(new_video)
    return new_video

@router.get("/get_communityVideo/{id}", response_model=VideoOut)
async def get_video(id: int, db: Session = Depends(get_db)) -> VideoOut:
    video = db.query(CommunityVideo).filter(CommunityVideo.id == id).first()
    if not video:
        raise HTTPException(status_code=404, detail="CommunityVideo not found")

    user = db.query(User).filter(User.id == video.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return video

@router.get("/get_communityVideos", response_model=List[VideoOut])
async def get_videos(db: Session = Depends(get_db)) -> List[VideoOut]:
    videos = db.query(CommunityVideo).all()
    if not videos:
        raise HTTPException(status_code=404, detail="No CommunityVideos found")
    return videos


@router.get('/get_userCommunityVideos', response_model=List[VideoOut])
async def get_labs(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> List[VideoOut]:
    """
    Get all community videos submitted by the current user.
    """
    videos = db.query(CommunityVideo).filter(CommunityVideo.user_id == current_user.id).all()
    
    if not videos:
        raise HTTPException(status_code=404, detail="No CommunityVideos found")
    
    return videos


@router.put("/update_communityVideo/{video_id}", response_model=VideoOut)
async def update_video(
    video_id: int,
    video: VideoUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> VideoOut:
    
    # if current_user.role not in ["admin", "educator"]:
    #     raise HTTPException(status_code=403, detail="Admin or Educator privileges required")
    
    db_video = db.query(CommunityVideo).filter(CommunityVideo.id == video_id).first()
    if not db_video:
        raise HTTPException(status_code=404, detail="CommunityVideo not found")

    if video.status is not None:
        db_video.status = video.status
    if video.message is not None:
        db_video.message = video.message

    db.commit()
    db.refresh(db_video)
    return db_video

@router.delete("/delete_communityVideo/{video_id}", status_code=200)
async def delete_video(
    video_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> JSONResponse:
    
    # if current_user.role not in ["admin", "educator"]:
    #     raise HTTPException(status_code=403, detail="Admin or Educator privileges required")
    
    db_video = db.query(CommunityVideo).filter(CommunityVideo.id == video_id).first()
    if not db_video:
        raise HTTPException(status_code=404, detail="CommunityVideo not found")

    db.delete(db_video)
    db.commit()
    return JSONResponse(content={"message": "CommunityVideo deleted successfully"})
