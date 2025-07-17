from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base


class Lab(Base):
    __tablename__ = "labs"
    id = Column(Integer, primary_key=True ,index=True)
    name = Column(String, unique=True)
    
    quizzes = relationship("Quiz", back_populates="lab")
