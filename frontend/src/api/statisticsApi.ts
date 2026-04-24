import {AvgTimeEntry, LeaderboardEntry} from "../types";

const BASE = import.meta.env.VITE_API_BASE_URL

export async function fetchAvgTimePerStatus(): Promise<AvgTimeEntry[]> {
    const res = await fetch(`${BASE}/statistics/avg-time-per-status`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function fetchTopProductiveUsers(): Promise<LeaderboardEntry[]> {
    const res = await fetch(`${BASE}/statistics/top-productive-users`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}