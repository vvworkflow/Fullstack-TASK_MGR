"""empty message

Revision ID: 12b87057be4b
Revises: 6a9257ab4774
Create Date: 2026-04-19 13:26:53.663373

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "12b87057be4b"
down_revision: Union[str, Sequence[str], None] = "6a9257ab4774"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "tasks",
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("tasks", "created_at")
