export type TaskStatus = 'BACKLOG' | 'IN_PROGRESS' | 'REVIEW' | 'DONE' | 'ARCHIVE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type UserRole = 'admin' | 'manager' | 'developer'

export interface User {
    id: number
    username: string
    fullname: string
    role: UserRole
}

export interface UserCreatePayload {
    username: string
    fullname: string
    password: string
    role: UserRole

}

export interface Task {
    id: number
    title: string
    description: string | null
    status: TaskStatus
    priority: TaskPriority
    created_by_id: number | null
    assignee_id: number | null
}

export interface TaskCreatePayload {
    title: string
    description: string | null
    status: TaskStatus
    priority: TaskPriority
    created_by_id: number
    assignee_id: number | null
}

export interface TaskUpdatePayload {
    title?: string
    description?: string | null
    status?: TaskStatus
    priority?: TaskPriority
    assignee_id?: number | null
}

export interface AvgTimeEntry {
    status: TaskStatus
    avg_seconds: number
    task_count?: number
}

export interface LeaderboardEntry {
    user_id: number
    username: string
    tasks_done: number
    avg_seconds_to_done: number
}