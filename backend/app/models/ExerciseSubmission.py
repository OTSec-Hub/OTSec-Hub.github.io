from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime


class ExerciseSubmission(Base):
    __tablename__ = "exercise_submissions"
    __table_args__ = (PrimaryKeyConstraint('user_id', 'exercise_id'),)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    exercise_id = Column(Integer, ForeignKey("exercises.id", ondelete="CASCADE"))
    submitted_at = Column(DateTime, default=datetime.utcnow)
    score = Column(Integer, nullable=True)

    user = relationship("User", back_populates="exercise_submissions")
    exercise = relationship("Exercise", back_populates="submissions")
