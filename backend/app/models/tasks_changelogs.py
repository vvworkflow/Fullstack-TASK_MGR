from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database.base import Base
from models.mixins.timestamp import CreatedAtMixin

if TYPE_CHECKING:
    from models.tasks import Task
    from models.users import User


class TaskChangelog(CreatedAtMixin, Base):
    __tablename__ = "tasks_changelogs"

    task_id: Mapped[int | None] = mapped_column(ForeignKey("tasks.id"), index=True)
    changed_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"))
    field: Mapped[str] = mapped_column(String(255))
    old_value: Mapped[str] = mapped_column(String(255))
    new_value: Mapped[str] = mapped_column(String(255))

    tasks: Mapped["Task"] = relationship(
        back_populates="task_changelogs",
        lazy="raise",
    )
    changed_by: Mapped["User"] = relationship(
        back_populates="tasks_changelogs",
        lazy="raise",
    )
