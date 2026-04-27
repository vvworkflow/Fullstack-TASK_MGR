from pathlib import Path

from pydantic import BaseModel, MySQLDsn
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class RunConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8000


class DatabaseConfig(BaseModel):
    url: MySQLDsn
    echo: bool = False
    echo_pool: bool = False
    max_overflow: int = 50
    pool_size: int = 10

    naming_convention: dict[str, str] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_N_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }


class AccessTokenConfig(BaseModel):
    reset_password_token_secret: str
    verification_token_secret: str
    lifetime_seconds: int = 3600


class ApiV1PrefixConfig(BaseModel):
    prefix: str = "/v1"
    users: str = "/users"
    tasks: str = "/tasks"
    statistics: str = "/statistics"
    auth: str = "/auth"


class ApiPrefixConfig(BaseModel):
    prefix: str = "/api"
    v1: ApiV1PrefixConfig = ApiV1PrefixConfig()

    @property
    def bearer_token_url(self) -> str:
        # api/v1/auth/login
        parts = (self.prefix, self.v1.prefix, self.v1.auth, "/login")
        path = "".join(parts)
        return path.removeprefix("/")


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        case_sensitive=False,
        env_prefix="APP_CONFIG__",
        env_file=(BASE_DIR / ".env.example", BASE_DIR / ".env"),
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
        extra="ignore",
    )
    run: RunConfig = RunConfig()
    db: DatabaseConfig
    access_token: AccessTokenConfig
    api: ApiPrefixConfig = ApiPrefixConfig()


settings = Settings()
