from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.users import User
from schemas.users import UserCreate


async def create_user(user: UserCreate, session: AsyncSession) -> User:
    user = User(**user.model_dump())
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def get_users(session: AsyncSession) -> Sequence[User]:
    stmt = select(User)
    result = await session.execute(stmt)
    users = result.scalars().all()
    return users


async def get_user_by_id(id: int, session: AsyncSession) -> User | None:
    user = await session.get(User, id)
    return user


async def get_user_by_name(name: str, session: AsyncSession) -> Sequence[User]:
    stmt = select(User).where(User.name.ilike(t"%{name}%"))
    result = await session.execute(stmt)
    users = result.scalars().all()
    return users
