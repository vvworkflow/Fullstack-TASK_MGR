from fastapi import APIRouter
from fastapi_users import FastAPIUsers

from core.auth.backend import auth_backend
from core.config import settings
from custom_types.user_id import UserIDType
from dependencies.auth.user_manager import get_user_manager
from models import User
from schemas.users import UserRead, UserCreate

fastapi_users = FastAPIUsers[User, UserIDType](
    get_user_manager,
    [auth_backend],
)

router = APIRouter(tags=["Auth"], prefix=settings.api.v1.auth)

router.include_router(fastapi_users.get_register_router(UserRead, UserCreate))
router.include_router(fastapi_users.get_auth_router(auth_backend))
router.include_router(fastapi_users.get_verify_router(UserRead))
router.include_router(fastapi_users.get_reset_password_router())
