import { STORAGE_KEYS, readStorage, writeStorage } from './storage'
import type { User } from '../types/user'

// 默认管理员账号（仅本地模拟，密码不存 localStorage）
const DEFAULT_USERNAME = 'admin'
const DEFAULT_PASSWORD = 'admin123'

// 生成登录 token
function generateToken(): string {
  return `token-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

// 登录：校验账号密码，成功后写入 token
export function login(username: string, password: string): User | null {
  if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
    const user: User = { username, token: generateToken() }
    writeStorage(STORAGE_KEYS.AUTH, user)
    return user
  }
  return null
}

// 登出：清除本地登录态
export function logout(): void {
  localStorage.removeItem(STORAGE_KEYS.AUTH)
}

// 获取当前登录用户
export function getCurrentUser(): User | null {
  return readStorage<User | null>(STORAGE_KEYS.AUTH, null)
}

// 是否已登录
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
