from typing import TYPE_CHECKING

from fastapi_users.db import SQLAlchemyBaseUserTable
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy import String, Enum

from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.orm import mapped_column

from core.database.base import Base
from models.mixins.timestamp import CreatedAtMixin
from enums.users import UserRole
from custom_types.user_id import UserIDType

if TYPE_CHECKING:
    from models import TaskChangelog
    from models.tasks import Task
    from sqlalchemy.ext.asyncio import AsyncSession


class User(CreatedAtMixin, SQLAlchemyBaseUserTable[UserIDType], Base):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String(255), unique=True)
    fullname: Mapped[str] = mapped_column(String(255))
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.developer)

    created_tasks: Mapped[list["Task"]] = relationship(
        foreign_keys="[Task.created_by_id]",
        back_populates="created_by",
    )
    assigned_tasks: Mapped[list["Task"]] = relationship(
        foreign_keys="[Task.assignee_id]",
        back_populates="assignee",
    )
    tasks_changelogs: Mapped[list["TaskChangelog"]] = relationship(
        back_populates="changed_by",
        lazy="raise",
    )

    @classmethod
    def get_db(cls, session: "AsyncSession"):
        return SQLAlchemyUserDatabase(session, cls)
