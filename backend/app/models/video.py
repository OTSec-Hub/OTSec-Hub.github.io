from sqlalchemy import Column, Integer, Boolean, String, ForeignKey, DateTime, func
from app.database import Base
from sqlalchemy.orm import relationship

class Video(Base):
    __tablename__ = 'videos'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    subtitle = Column(String, nullable=True)
    description = Column(String, nullable=True)
    url = Column(String, index=True, nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)  # Creation timestamp
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)  # Update timestamp
    
    # Relationships
    quizzes = relationship("Quiz", back_populates="video", cascade="all, delete-orphan")
    
    # relationship for VideoProgress
    user_progress = relationship("VideoProgress", back_populates="video", cascade="all, delete-orphan")
