"""empty message

Revision ID: 6a9257ab4774
Revises: 1d845ae38bbd
Create Date: 2026-04-19 11:19:08.001122

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = "6a9257ab4774"
down_revision: Union[str, Sequence[str], None] = "1d845ae38bbd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "tasks_changelogs",
        sa.Column(
            "changed_by_id", sa.Integer(), nullable=True
        ),  # Ставим True Чтобы не упала ошибка
    )
    # Копируем данные
    op.execute("UPDATE tasks_changelogs SET changed_by_id = changed_by")
    # Удаляем старую колонку и ограничения
    op.drop_constraint(
        op.f("fk_tasks_changelogs_changed_by_users"),
        "tasks_changelogs",
        type_="foreignkey",
    )

    op.drop_column("tasks_changelogs", "changed_by")
    # Возвращаем True
    op.alter_column(
        "tasks_changelogs",
        "changed_by_id",
        type_=sa.Integer(),
        nullable=False,
    )
    op.create_foreign_key(
        op.f("fk_tasks_changelogs_changed_by_id_users"),
        "tasks_changelogs",
        "users",
        ["changed_by_id"],
        ["id"],
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column(
        "tasks_changelogs",
        sa.Column("changed_by", mysql.INTEGER(), nullable=True),
    )
    op.execute("UPDATE tasks_changelogs SET changed_by = changed_by_id")
    op.drop_constraint(
        op.f("fk_tasks_changelogs_changed_by_id_users"),
        "tasks_changelogs",
        type_="foreignkey",
    )
    op.drop_column("tasks_changelogs", "changed_by_id")
    op.create_foreign_key(
        op.f("fk_tasks_changelogs_changed_by_users"),
        "tasks_changelogs",
        "users",
        ["changed_by"],
        ["id"],
    )
    op.alter_column("tasks_changelogs", "changed_by", type_=sa.Integer(), nullable=True)
