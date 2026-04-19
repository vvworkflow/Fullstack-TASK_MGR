const BASE = 'http://127.0.0.1:8000/api/v1'

export async function fetchAvgTimePerStatus() {
    const res = await fetch(`${BASE}/statistics/avg-time-per-status`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function fetchTopProductiveUsers() {
    const res = await fetch(`${BASE}/statistics/top-productive-users`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}