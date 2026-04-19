from typing import Sequence

from pydantic import BaseModel


class StatusAvgTimeRead(BaseModel):
    status: str
    avg_seconds: int


class TopUserRead(BaseModel):
    user_id: int
    username: str
    tasks_done: int
    avg_seconds_to_done: int


class StatisticsRead(BaseModel):
    avg_time_per_status: Sequence[StatusAvgTimeRead]
    top_users: Sequence[TopUserRead]
