// 本地存储 key 常量
export const STORAGE_KEYS = {
  AUTH: 'personal_homepage:auth',
  PROFILE: 'personal_homepage:profile',
  SKILLS: 'personal_homepage:skills',
  PROJECTS: 'personal_homepage:projects',
  POSTS: 'personal_homepage:posts',
} as const

// 读取本地存储（JSON 解析 + 容错）
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

// 写入本地存储
export function writeStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

// 生成唯一 id
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
