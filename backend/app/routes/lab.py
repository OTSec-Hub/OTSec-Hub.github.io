import os, secrets
from passlib.context import CryptContext
from fastapi import APIRouter, Depends, Body, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from ..models.user import User
from ..models.lab import Lab
from ..models.video import Video
from ..models.quiz import Quiz
from app.auth.auth import get_current_user
from ..schemas.quiz import QuizCreate
from ..schemas.lab import UserCreate, LabOut, LabCreate
from ..auth.email import send_verification_email
from ..auth.verification import create_verification_token
from ..database import get_db
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# @router.post("/add_lab_quiz", response_model=LabOut)
# def add_lab_quiz(Lab: LabCreate, db: Session = Depends(get_db)):
    
@router.post("/labs/{lab_id}/quizzes", response_model=LabOut)
def add_quizzes_to_lab(
    lab_id: int,
    quizzes: list[QuizCreate],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if lab exists
    lab = db.query(Lab).filter(Lab.id == lab_id).first()
    if not lab:
        raise HTTPException(status_code=404, detail="Lab not found.")

    # Create and add quiz objects
    for q in quizzes:
        new_quiz = Quiz(
            question=q.question,
            correct_answer=q.correct_answer,
            option1=q.options[0],
            option2=q.options[1],
            option3=q.options[2],
            option4=q.options[3],
            lab_id=lab.id
        )
        db.add(new_quiz)

    db.commit()
    db.refresh(lab)

    return lab