from sqlalchemy import Column, Integer, Boolean, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from app.database import Base

class LabProgress(Base):
    __tablename__ = "lab_progress"
    __table_args__ = (PrimaryKeyConstraint('user_id', 'lab_id'),)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    lab_id = Column(Integer, ForeignKey("labs.id", ondelete="CASCADE"))
    quiz_completed = Column(Boolean, default=False)
    got_fullmark = Column(Boolean, default=False)

    user = relationship("User", back_populates="lab_progress")
    lab = relationship("Lab", back_populates="user_progress")
