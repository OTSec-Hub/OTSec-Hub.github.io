from sqlalchemy import Column, Integer, Boolean, ForeignKey, DateTime, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class VideoProgress(Base):
    __tablename__ = "video_progress"
    __table_args__ = (PrimaryKeyConstraint('user_id', 'video_id'),)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    video_id = Column(Integer, ForeignKey("videos.id", ondelete="CASCADE"))
    first_viewed = Column(DateTime, default=datetime.utcnow)
    # quiz_completed = Column(Boolean, default=False)
    got_fullmark = Column(Boolean, default=False)

    user = relationship("User", back_populates="video_progress")
    video = relationship("Video", back_populates="user_progress")