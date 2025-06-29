import os, secrets
from passlib.context import CryptContext
from fastapi import APIRouter, Depends, Body, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from ..models.user import User
from ..schemas.user import UserCreate, UserOut
from ..auth.email import send_verification_email
from ..auth.verification import create_verification_token
from ..database import get_db
from dotenv import load_dotenv

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter(prefix="/educators", tags=["educators"])

@router.post("/add_educator", response_model=UserOut)
async def add_educator(
    background_tasks: BackgroundTasks,
    email: str = Body(...),
    name: str = Body(...),
    redirectUrl: str = Body(...),
    db: Session = Depends(get_db)
):
    # Check if user exists
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create verification token
    token = create_verification_token(email)
    temp_password = secrets.token_urlsafe(8)
    hashed_password = pwd_context.hash(temp_password)
    # Create new user
    db_user = User(
        name=name,
        email=email,
        password=hashed_password,
        role="educator",
        is_verified=False,
        verification_token=token
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Construct redirect URL
    # redirect_url = f"{os.getenv('REACT_DOT_SERVER')}/#/verify-email"
    
    # Send verification email
    await send_verification_email(
        email=email,
        name=name,
        temp_password=temp_password,
        token=token,
        redirect_url=redirectUrl,
        background_tasks=background_tasks
    )

    return db_user