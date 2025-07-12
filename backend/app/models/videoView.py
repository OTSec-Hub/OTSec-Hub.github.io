from sqlalchemy import Column, Integer, Boolean, ForeignKey, DateTime, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class VideoView(Base):
    __tablename__ = "video_views"
    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'video_id'),
    )
    
    user_id = Column(Integer, ForeignKey("users.id"))
    video_id = Column(Integer, ForeignKey("videos.id", ondelete="CASCADE"))
    first_viewed = Column(DateTime, default=datetime.utcnow)
    got_fullmark = Column(Boolean, default=False)

    user = relationship("User")
    video = relationship("Video", passive_deletes=True)