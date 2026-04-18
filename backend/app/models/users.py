from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.orm import mapped_column

from core.database.base import Base
from models.mixins.timestamp import CreatedAtMixin

if TYPE_CHECKING:
    from models.tasks import Task


class User(CreatedAtMixin, Base):
    __tablename__ = "users"

    name: Mapped[str] = mapped_column(String(255))
    created_tasks: Mapped[list["Task"]] = relationship(
        foreign_keys="[Task.created_by_id]",
        back_populates="created_by",
    )
    assigned_tasks: Mapped[list["Task"]] = relationship(
        foreign_keys="[Task.assignee_id]",
        back_populates="assignee",
    )
