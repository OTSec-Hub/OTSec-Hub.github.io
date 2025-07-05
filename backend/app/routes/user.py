from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserOut, Token, UserLogin, UserUpdate
from app.models.user import User
from app.auth.auth import verify_password, create_access_token
from app.database import get_db
from fastapi import BackgroundTasks
from passlib.hash import bcrypt
from app.auth.email import send_verification_email  # import your email function
from app.auth.verification import create_verification_token
from typing import List
import uuid
from dotenv import load_dotenv
import os

load_dotenv()


router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate,background_tasks: BackgroundTasks
, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password and create user
    hashed = bcrypt.hash(user.password)
    token = create_verification_token(user.email)
    db_user = User(name=user.name, email=user.email, password=hashed,is_verified=False, verification_token=token)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    await send_verification_email(
        email=user.email,
        name=user.name,
        token=token,
        redirect_url=f"{os.getenv('REACT_DOT_SERVER')}/#/verify-email",
        background_tasks=background_tasks,

    )
    return db_user;

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not db_user.is_verified:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email is not verified")
    access_token = create_access_token(data={"user_id": db_user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/users/", response_model=List[UserOut])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    if not users:
        raise HTTPException(status_code=404, detail="User not found")
    return users

@router.put("/update_user/{user_id}", response_model=UserOut)
def update_user(user_id: int, user:UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update fields
    if user.password: db_user.password = bcrypt.hash(user.password)
    if user.name: db_user.name = user.name
    if user.email: db_user.email = user.email
    if user.role: db_user.role = user.role
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.delete("/delete_user/{user_id}", response_model=UserOut)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()
    
    return db_user