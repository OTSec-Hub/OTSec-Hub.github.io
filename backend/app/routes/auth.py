from fastapi import APIRouter,Depends, BackgroundTasks, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.email import send_verification_email
from ..auth.verification import create_verification_token, verify_educator_token
from ..models.user import User
from ..schemas.user import UserCreate, UserOut, Token, UserLogin
from ..auth.auth import verify_password, create_access_token
from passlib.hash import bcrypt
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

# Note camelCase to match frontend

# @router.post("/send-verification")
# async def send_verification(
#     request: VerificationRequest,  # Receive as single object
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db)
# ):
#     user = db.query(User).filter(User.email == request.email).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     token = create_verification_token(user.email)
#     user.verification_token = token
#     db.commit()

#     await send_verification_email(
#         email=user.email,
#         name=user.name,
#         token=token,
#         redirect_url=request.redirectUrl,  # Use from request
#         background_tasks=background_tasks
#     )
    
#     return {"message": "Verification email sent"}


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


@router.get("/verify-email")
async def verify_email(
    token: str,
    db: Session = Depends(get_db)
):
    # Verify the token
    email = verify_educator_token(token)
    
    # Update user in database
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_verified:
        raise HTTPException(status_code=400, detail="Email already verified")
    if user.verification_token != token:  # If you're storing tokens
        raise HTTPException(status_code=400, detail="Invalid token")
    
    user.is_verified = True
    user.verification_token = None  # Clear the token
    db.commit()
    
    return {"message": "Email verified successfully"}

# Create a test endpoint
# @router.get("/test-email")
# async def test_email(background_tasks: BackgroundTasks):
#     await send_verification_email(
#         email="abdelrahmann.ramadann@gmail.com",
#         name="Test User",
#         token="test-token",
#         redirect_url="http://localhost:3000/verify",
#         background_tasks=background_tasks
#     )
#     return {"message": "Email sent"}