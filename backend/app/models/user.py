from sqlalchemy import Column, Integer,Boolean, String, ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default='student')
    is_verified = Column(Boolean, default=False)  
    verification_token = Column(String, nullable=True)
    # course_id = Column(Integer, ForeignKey('courses.id'))
    # course = relationship("Course", back_populates="students")
    
    video_progress = relationship("VideoProgress", back_populates="user")
