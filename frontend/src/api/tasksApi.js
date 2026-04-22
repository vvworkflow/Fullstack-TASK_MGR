const BASE = import.meta.env.VITE_API_BASE_URL

export async function fetchTasks({ title, status, priority } = {}) {
    const params = new URLSearchParams()
    if (title) params.set('title', title)
    if (status && status !== 'ALL') params.set('status', status)
    if (priority && priority !== 'ALL') params.set('priority', priority)

    const url = `${BASE}/tasks${params.toString() ? '?' + params.toString() : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function createTask(data) {
    const res = await fetch(`${BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function updateTask(id, data, changedById = 1) {
    const res = await fetch(`${BASE}/tasks/${id}?changed_by_id=${changedById}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function deleteTask(id) {
    const res = await fetch(`${BASE}/tasks/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.ok
}
