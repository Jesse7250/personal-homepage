import { STORAGE_KEYS, readStorage, writeStorage, generateId } from './storage'
import type { Project } from '../types/project'

// 默认项目数据
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: '个人展示网站',
    desc: '基于 React + TypeScript + Vite + Tailwind 的个人作品集站点。',
    cover: '',
    tags: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://github.com/example/personal-homepage',
    date: '2026-10',
  },
]

// 获取项目列表
export function getProjects(): Project[] {
  return readStorage(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS)
}

// 新增项目
export function createProject(data: Omit<Project, 'id'>): Project[] {
  const next = [...getProjects(), { ...data, id: generateId() }]
  writeStorage(STORAGE_KEYS.PROJECTS, next)
  return next
}

// 更新项目
export function updateProject(id: string, data: Partial<Project>): Project[] {
  const next = getProjects().map((p) => (p.id === id ? { ...p, ...data, id } : p))
  writeStorage(STORAGE_KEYS.PROJECTS, next)
  return next
}

// 删除项目
export function deleteProject(id: string): Project[] {
  const next = getProjects().filter((p) => p.id !== id)
  writeStorage(STORAGE_KEYS.PROJECTS, next)
  return next
}
