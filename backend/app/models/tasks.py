from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey, Enum
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.orm import mapped_column

from core.database.base import Base
from enums.tasks import TaskStatus, TaskPriority

if TYPE_CHECKING:
    from models.users import User


class Task(Base):
    __tablename__ = "tasks"

    title: Mapped[str] = mapped_column(String(255))
    status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus))
    priority: Mapped[TaskPriority] = mapped_column(Enum(TaskPriority))
    created_by_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    assignee_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"))

    created_by: Mapped["User"] = relationship(
        back_populates="created_tasks",
        foreign_keys=[created_by_id],
        lazy="raise",
    )
    assignee: Mapped["User"] = relationship(
        back_populates="assigned_tasks",
        foreign_keys=[assignee_id],
        lazy="raise",
    )
