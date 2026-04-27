from typing import TYPE_CHECKING

from fastapi import Depends
from fastapi_users.authentication.strategy.db import (
    AccessTokenDatabase,
    DatabaseStrategy,
)

from core.config import settings
from dependencies.auth.db_adapter import get_access_token_db

if TYPE_CHECKING:
    from models.access_tokens import AccessToken


def get_database_strategy(
    access_token_db: "AccessTokenDatabase[AccessToken]" = Depends(get_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(
        database=access_token_db,
        lifetime_seconds=settings.access_token.lifetime_seconds,
    )
