import { STORAGE_KEYS, readStorage, writeStorage, generateId } from './storage'
import type { Skill } from '../types/skill'

// 默认技能数据
const DEFAULT_SKILLS: Skill[] = [
  { id: 'skill-1', name: 'React', icon: '', category: '前端', level: '精通' },
  { id: 'skill-2', name: 'TypeScript', icon: '', category: '前端', level: '熟悉' },
  { id: 'skill-3', name: 'Node.js', icon: '', category: '后端', level: '熟悉' },
]

// 获取技能列表
export function getSkills(): Skill[] {
  return readStorage(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS)
}

// 新增技能
export function createSkill(data: Omit<Skill, 'id'>): Skill[] {
  const next = [...getSkills(), { ...data, id: generateId() }]
  writeStorage(STORAGE_KEYS.SKILLS, next)
  return next
}

// 更新技能
export function updateSkill(id: string, data: Partial<Skill>): Skill[] {
  const next = getSkills().map((s) => (s.id === id ? { ...s, ...data, id } : s))
  writeStorage(STORAGE_KEYS.SKILLS, next)
  return next
}

// 删除技能
export function deleteSkill(id: string): Skill[] {
  const next = getSkills().filter((s) => s.id !== id)
  writeStorage(STORAGE_KEYS.SKILLS, next)
  return next
}
