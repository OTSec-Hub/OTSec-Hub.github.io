from sqlalchemy import Column, Integer,Boolean, String, ForeignKey, DateTime, func
from app.database import Base
from sqlalchemy.orm import relationship

class Video(Base):
    __tablename__ = 'videos'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    subtitle = Column(String, nullable=True)  # Subtitle of the video
    description = Column(String, nullable=True)
    url = Column(String, index=True)  # URL of the video
    # educator_id = Column(Integer, ForeignKey('educators.id'))  # Foreign key to the educator
    # educator = relationship("Educator", back_populates="videos")  # Relationship to Educator
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)  # Creation timestamp
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)  # Update timestamp
    
    quizzes = relationship("Quiz", back_populates="video", cascade="all, delete-orphan")
