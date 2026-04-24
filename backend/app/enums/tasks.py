from enum import Enum


class TaskStatus(str, Enum):
    backlog = "BACKLOG"
    in_progress = "IN_PROGRESS"
    review = "REVIEW"
    done = "DONE"
    archive = "ARCHIVE"


class TaskPriority(str, Enum):
    critical = "CRITICAL"
    high = "HIGH"
    medium = "MEDIUM"
    low = "LOW"
