from typing import Sequence

from sqlalchemy import select, func, text, and_
from sqlalchemy.ext.asyncio import AsyncSession

from models import TaskChangelog, Task
from models.users import User
from schemas.users import UserCreate, UserUpdatePartial


async def create_user(user_data: UserCreate, session: AsyncSession) -> User:
    user = User(**user_data.model_dump())
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


async def get_users_by_name(name: str, session: AsyncSession) -> Sequence[User]:
    stmt = select(User).where(User.username.ilike(f"%{name}%"))
    result = await session.execute(stmt)
    users = result.scalars().all()
    return users


async def update_user_partial(
    user: User, new_user_data: UserUpdatePartial, session: AsyncSession
) -> User:
    for key, value in new_user_data.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    await session.commit()
    await session.refresh(user)
    return user


async def delete_user(user: User, session: AsyncSession) -> None:
    await session.delete(user)
    await session.commit()


async def get_top_productive_users(session: AsyncSession) -> list[dict]:
    # avg(done_time - task_created_at) по пользователю
    stmt = (
        select(
            User.id.label("user_id"),
            User.username.label("username"),
            func.count(TaskChangelog.id).label("tasks_done"),
            func.avg(
                func.timestampdiff(
                    text("SECOND"),
                    Task.created_at,
                    TaskChangelog.created_at,
                )
            ).label("avg_seconds_to_done"),
        )
        .join(Task, Task.id == TaskChangelog.task_id)
        .join(User, User.id == TaskChangelog.changed_by_id)
        .where(
            and_(
                TaskChangelog.field == "status",
                TaskChangelog.new_value == "done",
            )
        )
        .group_by(User.id, User.username)
        .order_by(
            func.avg(
                func.timestampdiff(
                    text("SECOND"),
                    Task.created_at,
                    TaskChangelog.created_at,
                )
            ).asc()
        )
        .limit(3)
    )

    result = await session.execute(stmt)
    rows = result.mappings().all()

    return [
        {
            "user_id": row["user_id"],
            "username": row["username"],
            "tasks_done": row["tasks_done"],
            "avg_seconds_to_done": int(row["avg_seconds_to_done"] or 0),
        }
        for row in rows
    ]
