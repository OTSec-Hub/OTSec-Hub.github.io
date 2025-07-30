from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserOut, Token, UserLogin, UserUpdate
from app.models.user import User
from app.auth.auth import get_current_user
from app.database import get_db
from passlib.hash import bcrypt

from typing import List
import uuid
from dotenv import load_dotenv
import os

load_dotenv()
 
router = APIRouter()


@router.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
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