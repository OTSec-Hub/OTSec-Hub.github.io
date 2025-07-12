from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
from app.schemas.video import VideoCreate, VideoOut, VideoUpdate
from app.schemas.quiz import QuizOut 
from app.schemas.videoView import VideoViewCreate , VideoViewOut
from app.models.video import Video
from app.models.quiz import Quiz
from app.models.videoView import VideoView
from app.database import get_db
from typing import List
from app.auth.auth import get_current_user
from dotenv import load_dotenv
from app.models.user import User
import os

load_dotenv()
router = APIRouter()

@router.post("/add_video", response_model=VideoOut)
def add_video(video: VideoCreate, db: Session = Depends(get_db)):
    try:
        # Prepare quiz objects from input
        quiz_objects = [
            Quiz(
                question=q.question,
                option1=q.options[0],
                option2=q.options[1],
                option3=q.options[2],
                option4=q.options[3],
                correct_answer=q.correct_answer
            )
            for q in video.quizzes
        ]

        # Create video with related quizzes
        db_video = Video(
            title=video.title,
            subtitle=video.subtitle,
            description=video.description,
            url=video.url,
            quizzes=quiz_objects
        )

        db.add(db_video)
        db.commit()
        db.refresh(db_video)

        return db_video

    except IntegrityError as e:
        db.rollback()
        if 'ix_videos_url' in str(e.orig):
            raise HTTPException(status_code=400, detail="Video URL already exists.")
        raise HTTPException(status_code=400, detail="Database integrity error.")

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

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
def update_video(video_id: int, video: VideoUpdate, db: Session = Depends(get_db)):
    db_video = db.query(Video).filter(Video.id == video_id).first()

    if not db_video:
        raise HTTPException(status_code=404, detail="Video not found")

    # Update video fields
    if video.title:
        db_video.title = video.title
    if video.subtitle:
        db_video.subtitle = video.subtitle
    if video.description:
        db_video.description = video.description
    if video.url:
        db_video.url = video.url

    # Update quizzes if provided
    if video.quizzes:
        for updated_quiz in video.quizzes:
            db_quiz = db.query(Quiz).filter(Quiz.id == updated_quiz.id).first()
            if db_quiz:
                if updated_quiz.question:
                    db_quiz.question = updated_quiz.question
                if updated_quiz.correct_answer:
                    db_quiz.correct_answer = updated_quiz.correct_answer
                if updated_quiz.option1:
                    db_quiz.option1 = updated_quiz.option1
                if updated_quiz.option2:
                    db_quiz.option2 = updated_quiz.option2
                if updated_quiz.option3:
                    db_quiz.option3 = updated_quiz.option3
                if updated_quiz.option4:
                    db_quiz.option4 = updated_quiz.option4

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
    return JSONResponse(content={"message": "Video deleted successfully"})


# ====================================================================================
# ====================================================================================
# ====================================================================================

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
                # user_name=current_user.name,
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
                video_title=view.video.title,
                got_fullmark=view.got_fullmark
            )
            for view in views
        ]
        # return [VideoViewOut.from_orm(view) for view in views] 
        # #won't work because Pydantic tries to access .user_name and .video_title on the VideoView model instance, but those fields do not exist directly
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# @router.get("/video_view/has_watched/{video_id}")
# async def has_watched_video(video_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     view = db.query(VideoView).filter_by(
#         video_id=video_id,
#         user_id=current_user.id
#     ).first()

#     return {"hasWatched": view is not None}
    

@router.patch("/video_view/fullmark/{video_id}")
async def mark_fullmark(video_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        view = db.query(VideoView).filter_by(
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
    
@router.get("/single_view/{video_id}", response_model=VideoViewOut)
def single_view(video_id: int, 
                db: Session = Depends(get_db), 
                current_user: User = Depends(get_current_user)):
    user_id = current_user.id

    view = db.query(VideoView).filter_by(user_id=user_id, video_id=video_id).first()

    if not view:
        raise HTTPException(status_code=404, detail="User has not watched this video")

    return view