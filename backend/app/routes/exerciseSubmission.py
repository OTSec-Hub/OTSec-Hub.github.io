from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.exerciseSubmission import ExerciseSubmission
from app.schemas.exerciseSubmission import ExerciseSubmissionCreate, ExerciseSubmissionOut
from app.auth.auth import get_current_user
from app.models.user import User
from fastapi import HTTPException
from typing import List

router = APIRouter()

@router.post("/submit_exercise/{exercise_id}")
def submit_exercise(
    exercise_id: int,
    submission: ExerciseSubmissionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    submission_record = ExerciseSubmission(
        exercise_id=exercise_id,
        user_id=current_user.id,
        answers=submission.answers
    )
    db.add(submission_record)
    db.commit()
    db.refresh(submission_record)
    return {"message": "Submission successful"}

@router.get("/submission", response_model=List[ExerciseSubmissionOut])
def get_submission(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    submission = db.query(ExerciseSubmission).options(joinedload(ExerciseSubmission.exercise)).filter_by(user_id=current_user.id).all()
    if not submission:
        raise HTTPException(status_code=404, detail="No submissions found")
    return submission