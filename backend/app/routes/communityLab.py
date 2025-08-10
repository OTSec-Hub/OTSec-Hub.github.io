from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.communityLab import CommunityLab
from app.schemas.communityLab import LabOut, LabCreate, LabUpdate
from app.auth.auth import get_current_user
from app.models.user import User
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post('/create_communityLab', response_model=LabOut)
async def create_lab(
    lab_data: LabCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  
) -> LabOut:
    """
    Create a new community lab.
    """
    new_lab = CommunityLab(
        title=lab_data.title,
        lab_img=lab_data.lab_img,
        pdf=lab_data.pdf,
        status=lab_data.status,
        user_id=current_user.id,
        message=lab_data.message
    )
    db.add(new_lab)
    db.commit()
    db.refresh(new_lab)
    return new_lab


@router.get('/get_communityLab/{id}', response_model=LabOut)
async def get_lab(id: int, db: Session = Depends(get_db)) -> LabOut:
    """
    Get a community lab by ID.
    """
    lab = db.query(CommunityLab).filter(CommunityLab.id == id).first()
    if not lab:
        raise HTTPException(status_code=404, detail="CommunityLab not found")
    
    user = db.query(User).filter(User.id == lab.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return lab


@router.get('/get_communityLabs', response_model=List[LabOut])
async def get_labs(db: Session = Depends(get_db)) -> List[LabOut]:
    """
    Get all community labs.
    """
    labs = db.query(CommunityLab).all()
    if not labs:
        raise HTTPException(status_code=404, detail="No CommunityLabs found")
    
    return labs


@router.put("/update_communityLab/{lab_id}", response_model=LabOut)
async def update_lab(
    lab_id: int,
    lab: LabUpdate,
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)
) -> LabOut:
    """
    Update a community lab by ID.
    Only the owner of the lab can update.
    """
    db_lab = db.query(CommunityLab).filter(CommunityLab.id == lab_id).first()
    if not db_lab:
        raise HTTPException(status_code=404, detail="CommunityLab not found")

    # if db_lab.user_id != current_user.id:
    #     raise HTTPException(status_code=403, detail="Not authorized to update this lab")

    if lab.status is not None:
        db_lab.status = lab.status
    if lab.message is not None:
        db_lab.message = lab.message

    db.commit()
    db.refresh(db_lab)
    return db_lab


@router.delete("/delete_communityLab/{lab_id}", status_code=200)
async def delete_lab(
    lab_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> JSONResponse:
    """
    Delete a community lab by ID.
    Only the owner of the lab can delete.
    """
    db_lab = db.query(CommunityLab).filter(CommunityLab.id == lab_id).first()
    
    if not db_lab:
        raise HTTPException(status_code=404, detail="CommunityLab not found")

    db.delete(db_lab)
    db.commit()
    return JSONResponse(content={"message": "CommunityLab deleted successfully"})
