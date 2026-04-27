from sqlalchemy.ext.asyncio import AsyncSession

from models.tasks_changelogs import TaskChangelog
from sqlalchemy import select, func, text, case
from models.tasks import Task

status_order = {
    "BACKLOG": 1,
    "IN_PROGRESS": 2,
    "REVIEW": 3,
    "DONE": 4,
    "ARCHIVE": 5,
}


async def create_changelog(
    task_id: int,
    changed_by_id: int,
    field: str,
    old_value: str,
    new_value: str,
    session: AsyncSession,
) -> None:
    log = TaskChangelog(
        task_id=task_id,
        changed_by_id=changed_by_id,
        field=field,
        old_value=old_value,
        new_value=new_value,
    )
    session.add(log)


async def get_avg_time_per_status(session: AsyncSession) -> list[dict]:
    # avg(момент_выхода - момент_входа) по каждому old_value
    inner = (
        select(
            TaskChangelog.old_value,
            TaskChangelog.created_at,
            Task.created_at.label("task_created_at"),
            func.lag(TaskChangelog.created_at)
            .over(
                partition_by=TaskChangelog.task_id,
                order_by=TaskChangelog.created_at,
            )
            .label("prev_created_at"),
        )
        .join(Task, Task.id == TaskChangelog.task_id)
        .where(TaskChangelog.field == "status")
        .subquery()
    )

    entry_time = func.coalesce(
        inner.c.prev_created_at,
        inner.c.task_created_at,
    )

    stmt = (
        select(
            inner.c.old_value.label("status"),
            func.avg(
                func.timestampdiff(text("SECOND"), entry_time, inner.c.created_at)
            ).label("avg_seconds"),
        )
        .group_by(inner.c.old_value)
        .order_by(case(status_order, value=inner.c.old_value, else_=99))
    )

    result = await session.execute(stmt)
    rows = result.mappings().all()

    return [
        {
            "status": row["status"],
            "avg_seconds": int(row["avg_seconds"] or 0),
        }
        for row in rows
    ]
