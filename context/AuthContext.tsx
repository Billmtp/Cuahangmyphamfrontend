'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User { id: number; name: string; email: string; role: string }
interface AuthCtx { user: User | null; loading: boolean; login: (email: string, password: string) => Promise<void>; register: (name: string, email: string, password: string, phone?: string) => Promise<void>; logout: () => Promise<void> }

const AuthContext = createContext<AuthCtx>({} as AuthCtx)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(u => { setUser(u); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const data = await r.json()
    if (!r.ok) throw new Error(data.error)
    setUser(data.user)
  }

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const r = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, phone }) })
    const data = await r.json()
    if (!r.ok) throw new Error(data.error)
    setUser(data.user)
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
