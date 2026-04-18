from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from core.database.base import Base
from models.mixins.timestamp import CreatedAtMixin


class TaskChangelog(CreatedAtMixin, Base):
    __tablename__ = "tasks_changelogs"

    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"), index=True)
    changed_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
    field: Mapped[str] = mapped_column(String(255))
    old_value: Mapped[str] = mapped_column(String(255))
    new_value: Mapped[str] = mapped_column(String(255))
