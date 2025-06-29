from fastapi import APIRouter,Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.email import send_verification_email
from ..auth.verification import create_verification_token, verify_educator_token
from ..models.user import User
from ..schemas.user import UserCreate
from pydantic import BaseModel

router = APIRouter(tags=["authentication"])

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