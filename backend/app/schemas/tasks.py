from pydantic import BaseModel, ConfigDict

from enums.tasks import TaskStatus, TaskPriority


class TaskBase(BaseModel):
    pass


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus
    priority: TaskPriority
    created_by_id: int
    assignee_id: int | None = None


class TaskRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    description: str | None = None
    status: TaskStatus
    priority: TaskPriority
    created_by_id: int
    assignee_id: int | None = None


class TaskUpdatePartial(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    assignee_id: int | None = None
