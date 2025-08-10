from sqlalchemy import Column, Integer, Boolean, String, ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default='member')
    is_verified = Column(Boolean, default=False)  
    verification_token = Column(String, nullable=True)
    
    user_progress = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")
    community_labs = relationship("CommunityLab", back_populates="user")
    community_videos = relationship("CommunityVideo", back_populates="user")