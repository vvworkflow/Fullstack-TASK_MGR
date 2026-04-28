import {User, UserCreatePayload} from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(`${BASE}/users`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}


export async function deleteUser(id: number): Promise<boolean> {
  const res = await fetch(`${BASE}/users/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.ok
}