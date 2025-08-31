from fastapi import APIRouter, Depends, Query, HTTPException, Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.announcement import Announcement
from fastapi.responses import JSONResponse
from app.models.user import User
from app.schemas.announcement import AnnouncementCreate, AnnouncementOut, AnnouncementUpdate
from app.auth.auth import get_current_user, admin_or_educator
from typing import List
from app.schemas.pagination import PaginatedResponse

router = APIRouter()

# to use in other endpoints
def add_announcement( 
    db: Session,
    content_type: str,
    content_id: int,
    title: str,
    image: str | None = None
) -> Announcement:
    announcement = Announcement(
        content_type=content_type,
        content_id=content_id,
        title=title,
        image=image,
    )
    db.add(announcement)
    return announcement

@router.post('/create_announcement', response_model=AnnouncementOut)
async def create_announcement(
    data: AnnouncementCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    # if current_user.role not in ["admin", "educator"]:
    #     raise HTTPException(status_code=403, detail="Admin or Educator privileges required")
    
    announcement = Announcement(
        content_type=data.content_type,
        content_id=data.content_id,
        title=data.title,
        image=data.image,
        )
    db.add(announcement)

    db.commit()
    db.refresh(announcement)
    return announcement


@router.get('/get_announcement/{id}', response_model=AnnouncementOut)
async def get_announcement(id: int, db: Session = Depends(get_db)):
    announcement = db.query(Announcement).filter(Announcement.id == id).first()
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return announcement

@router.get("/get_announcements", response_model=PaginatedResponse[AnnouncementOut])
async def get_announcements(
    page: int = Query(1, ge=1),
    limit: int = Query(9, ge=1),
    db: Session = Depends(get_db),
):
    announcements_query = db.query(Announcement)
    total = announcements_query.count()

    announcements = announcements_query.offset((page - 1) * limit).limit(limit).all()
    
    # Convert SQLAlchemy objects to Pydantic schemas
    announcement_items = [AnnouncementOut.from_orm(announcement) for announcement in announcements]

    if not announcement_items:
        raise HTTPException(status_code=404, detail="No announcements found")

    return PaginatedResponse(
        total=total,
        page=page,
        limit=limit,
        items=announcement_items
    )

@router.put("/update_announcement/{announcement_id}", response_model=AnnouncementOut)
def update_announcement(announcement_id: int, announcement: AnnouncementUpdate, db: Session = Depends(get_db)):
    
    db_announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()

    if not db_announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    # Update announcement fields
    if announcement.content_type:
        db_announcement.content_type = announcement.content_type
    if announcement.title:
        db_announcement.title = announcement.title
    if announcement.image:
        db_announcement.image = announcement.image

    db.commit()
    db.refresh(db_announcement)
    return db_announcement

@router.delete("/delete_announcement/{announcement_id}", status_code=200)
async def delete_announcement(
    announcement_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    # if current_user.role not in ["admin", "educator"]:
    #     raise HTTPException(status_code=403, detail="Admin or Educator privileges required")
    
    db_announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()

    if not db_announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    db.delete(db_announcement)
    db.commit()
    return JSONResponse(content={"message": "Announcement deleted successfully"})

