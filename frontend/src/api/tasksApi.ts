import {Task, TaskCreatePayload, TaskUpdatePayload, TaskStatus, TaskPriority} from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL

interface FetchTasksParams {
    title?: string
    status?: TaskStatus | 'ALL'
    priority?: TaskPriority | 'ALL'
}

export async function fetchTasks(params: FetchTasksParams = {}): Promise<Task[]> {
    const query = new URLSearchParams()
    if (params.title) query.set('title', params.title)
    if (params.status && params.status !== 'ALL') query.set('status', params.status)
    if (params.priority && params.priority !== 'ALL') query.set('priority', params.priority)

    const queryString = query.toString()
    const url = `${BASE}/tasks${queryString ? '?' + queryString : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function createTask(data: TaskCreatePayload): Promise<Task[]> {
    const res = await fetch(`${BASE}/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function updateTask(
    id: number,
    data: TaskUpdatePayload,
    changedById = 1
): Promise<Task> {
    const res = await fetch(`${BASE}/tasks/${id}?changed_by_id=${changedById}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function deleteTask(id: number): Promise<boolean> {
    const res = await fetch(`${BASE}/tasks/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.ok
}
