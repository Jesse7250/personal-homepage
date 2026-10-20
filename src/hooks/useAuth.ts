import { useState } from 'react'
import { login as apiLogin, logout as apiLogout, getCurrentUser } from '../api/auth'
import type { User } from '../types/user'

// 登录态管理 Hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(() => getCurrentUser())

  // 登录：成功后更新本地状态
  const login = (username: string, password: string): boolean => {
    const next = apiLogin(username, password)
    setUser(next)
    return next !== null
  }

  // 登出
  const logout = (): void => {
    apiLogout()
    setUser(null)
  }

  return { user, isAuthenticated: user !== null, login, logout }
}
