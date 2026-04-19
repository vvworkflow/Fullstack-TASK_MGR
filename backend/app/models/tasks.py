from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey, Enum, Text
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.orm import mapped_column

from core.database.base import Base
from enums.tasks import TaskStatus, TaskPriority
from models.mixins.timestamp import CreatedAtMixin

if TYPE_CHECKING:
    from models.users import User


class Task(CreatedAtMixin, Base):
    __tablename__ = "tasks"

    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)
    status: Mapped[TaskStatus] = mapped_column(
        Enum(TaskStatus),
        index=True,
        default=TaskStatus.backlog,
        server_default=TaskStatus.backlog.value,
    )
    priority: Mapped[TaskPriority] = mapped_column(
        Enum(TaskPriority),
        index=True,
        default=TaskPriority.low,
        server_default=TaskPriority.low.value,
    )
    created_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"))
    assignee_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"))

    created_by: Mapped["User | None"] = relationship(
        back_populates="created_tasks",
        foreign_keys=[created_by_id],
        lazy="raise",
    )
    assignee: Mapped["User | None"] = relationship(
        back_populates="assigned_tasks",
        foreign_keys=[assignee_id],
        lazy="raise",
    )
