import {User, UserCreatePayload} from "../types";

const BASE = import.meta.env.VITE_API_BASE_URL


export async function registerUser(data: UserCreatePayload): Promise<User> {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}