from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON  # Use this if you're using PostgreSQL
from app.database import Base

class Exercise(Base):
    __tablename__ = "exercise"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subtitle = Column(String, nullable=False)
    content = Column(String, nullable=False)
    questions = Column(JSON, nullable=True)
    
    submissions = relationship("ExerciseSubmission", back_populates="exercise")
