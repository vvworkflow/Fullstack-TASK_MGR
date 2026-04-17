from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.orm import mapped_column

from core.database.base import Base

if TYPE_CHECKING:
    from models.tasks import Task


class User(Base):
    __tablename__ = "users"

    name: Mapped[str] = mapped_column(String(255))

    tasks: Mapped[list["Task"] | None] = relationship(
        back_populates="user",
        lazy="raise"
    )