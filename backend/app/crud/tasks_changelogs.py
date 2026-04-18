from sqlalchemy.ext.asyncio import AsyncSession

from models.tasks_changelogs import TaskChangelog


async def create_changelog(
    task_id: int,
    changed_by: int,
    field: str,
    old_value: str,
    new_value: str,
    session: AsyncSession,
) -> None:
    log = TaskChangelog(
        task_id=task_id,
        changed_by=changed_by,
        field=field,
        old_value=old_value,
        new_value=new_value,
    )
    session.add(log)
