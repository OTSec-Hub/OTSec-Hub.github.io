from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from app.database import Base

class UserProgress(Base):
    __tablename__ = "user_progress"
    
    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'content_type', 'content_id'),
    )

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    content_type = Column(String, nullable=False)  # "video", "lab", or "exercise"
    content_id = Column(Integer, nullable=False)
    quiz_completed = Column(Boolean, default=False)

    user = relationship("User", back_populates="user_progress")  # Fixed back_populates