from datetime import datetime, timezone

from sqlalchemy import ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column

from core.database.base import Base
from enums.tasks import TaskStatus
from models.mixins.timestamp import UpdatedAtMixin


class TaskStatistic(UpdatedAtMixin, Base):
    __tablename__ = "task_statistic"

    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    updated_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
    old_status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus))
    new_status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus))
