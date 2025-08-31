from fastapi import APIRouter, Depends, Query, HTTPException, Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.userProgress import UserProgress
from app.models.lab import Lab
from app.models.quiz import Quiz
from fastapi.responses import JSONResponse
from app.routes.announcements import add_announcement
from app.schemas.userProgress import UserProgressCreate
from app.schemas.lab import LabOut, LabCreate, LabUpdate
from app.auth.auth import get_current_user
from app.models.user import User
from typing import List
from app.schemas.pagination import PaginatedResponse


router = APIRouter()

@router.post('/create_lab', response_model=LabOut)
async def create_lab(
    lab_data: LabCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_lab = Lab(
        title=lab_data.title,
        lab_img=lab_data.lab_img,
        content=lab_data.content
        )
    db.add(new_lab)
    db.flush()
    
    add_announcement(
        db=db,
        content_type="lab",
        content_id=new_lab.id,
        title=new_lab.title,
        image=new_lab.lab_img
    )

    for quiz in lab_data.quizzes:
        new_quiz = Quiz(
            question=quiz.question,
            correct_answer=quiz.correct_answer,
            option1=quiz.options[0],
            option2=quiz.options[1],
            option3=quiz.options[2],
            option4=quiz.options[3],
            lab_id=new_lab.id
        )
        db.add(new_quiz)

    db.commit()
    db.refresh(new_lab)
    return new_lab


@router.get('/get_lab/{id}', response_model=LabOut)
async def get_lab(id: int, db: Session = Depends(get_db)):
    lab = db.query(Lab).filter(Lab.id == id).first()
    if not lab:
        raise HTTPException(status_code=404, detail="Lab not found")
    return lab

@router.get("/get_labs", response_model=PaginatedResponse[LabOut])
async def get_labs(
    page: int = Query(1, ge=1),
    limit: int = Query(9, ge=1),
    db: Session = Depends(get_db),
):
    labs_query = db.query(Lab)
    total = labs_query.count()

    labs = labs_query.offset((page - 1) * limit).limit(limit).all()
    
    # Convert SQLAlchemy objects to Pydantic schemas
    lab_items = [LabOut.from_orm(lab) for lab in labs]

    if not lab_items:
        raise HTTPException(status_code=404, detail="No labs found")

    return PaginatedResponse(
        total=total,
        page=page,
        limit=limit,
        items=lab_items
    )



@router.put("/update_lab/{lab_id}", response_model=LabOut)
def update_lab(lab_id: int, lab: LabUpdate, db: Session = Depends(get_db)):
    db_lab = db.query(Lab).filter(Lab.id == lab_id).first()

    if not db_lab:
        raise HTTPException(status_code=404, detail="Lab not found")

    # Update lab fields
    if lab.title:
        db_lab.title = lab.title
    if lab.lab_img:
        db_lab.lab_img = lab.lab_img
    if lab.content:
        db_lab.content = lab.content

    # Update quizzes if provided
    if lab.quizzes:
        for updated_quiz in lab.quizzes:
            db_quiz = db.query(Quiz).filter(Quiz.id == updated_quiz.id).first()
            if db_quiz:
                if updated_quiz.question:
                    db_quiz.question = updated_quiz.question
                if updated_quiz.correct_answer:
                    db_quiz.correct_answer = updated_quiz.correct_answer
                if updated_quiz.options:
                    db_quiz.option1 = updated_quiz.options[0]
                    db_quiz.option2 = updated_quiz.options[1]
                    db_quiz.option3 = updated_quiz.options[2]
                    db_quiz.option4 = updated_quiz.options[3]
    db.commit()
    db.refresh(db_lab)
    return db_lab

@router.delete("/delete_lab/{lab_id}", status_code=200)
async def delete_lab(
    lab_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_lab = db.query(Lab).filter(Lab.id == lab_id).first()

    if not db_lab:
        raise HTTPException(status_code=404, detail="Lab not found")
    
    db.delete(db_lab)
    db.commit()
    return JSONResponse(content={"message": "Lab deleted successfully"})


@router.post("/user_lab_progress", status_code=201) #check lab quiz complete 
async def create_user_progress(
    progress_data: UserProgressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if the record already exists (based on PK constraint)
    existing_progress = db.query(UserProgress).filter_by(
        user_id=current_user.id,
        content_type=progress_data.content_type,
        content_id=progress_data.content_id
    ).first()

    if existing_progress:
        raise HTTPException(status_code=409, detail="Progress already recorded for this content.")

    new_progress = UserProgress(
        user_id=current_user.id,
        content_type=progress_data.content_type,
        content_id=progress_data.content_id
    )
    db.add(new_progress)
    db.commit()

    return Response(status_code=201)

# @router.get('/lab_quiz',)