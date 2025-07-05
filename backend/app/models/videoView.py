from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class VideoView(Base):
    __tablename__ = "video_views"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    video_id = Column(Integer, ForeignKey("videos.id"), primary_key=True)
    first_viewed = Column(DateTime, default=datetime.utcnow)
    user = relationship("User")
    video = relationship("Video")