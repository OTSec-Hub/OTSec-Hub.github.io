from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.lab import Lab


class Quiz(Base):
    __tablename__ = 'quizzes'
    
    id = Column(Integer, primary_key=True, index=True)
    
    video_id = Column(Integer, ForeignKey('videos.id'), nullable=True)
    lab_id = Column(Integer, ForeignKey('labs.id'), nullable=True)
    # exercise_id = Column(Integer, ForeignKey('exercises.id'), nullable=True)
    
    question = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)

    option1 = Column(String, nullable=False)
    option2 = Column(String, nullable=False)
    option3 = Column(String, nullable=False)
    option4 = Column(String, nullable=False)

    # Relationships
    video = relationship("Video", back_populates="quizzes")
    lab = relationship("Lab", back_populates="quizzes")
    # exercise = relationship("Exercise", back_populates="quizzes")