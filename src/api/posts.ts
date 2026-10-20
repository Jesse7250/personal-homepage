import { STORAGE_KEYS, readStorage, writeStorage, generateId } from './storage'
import type { Post } from '../types/post'

// 默认博客数据
const DEFAULT_POSTS: Post[] = [
  {
    id: 'post-1',
    title: '使用 Vite 搭建 React 项目',
    summary: '记录从零搭建 React + TypeScript + Vite 项目的步骤。',
    content:
      '# 使用 Vite 搭建 React 项目\n\n这是一篇示例博客。\n\n```ts\nconsole.log("Hello")\n```\n',
    tags: ['Vite', 'React'],
    date: '2026-10-20',
  },
]

// 获取博客列表
export function getPosts(): Post[] {
  return readStorage(STORAGE_KEYS.POSTS, DEFAULT_POSTS)
}

// 新增博客
export function createPost(data: Omit<Post, 'id'>): Post[] {
  const next = [...getPosts(), { ...data, id: generateId() }]
  writeStorage(STORAGE_KEYS.POSTS, next)
  return next
}

// 更新博客
export function updatePost(id: string, data: Partial<Post>): Post[] {
  const next = getPosts().map((p) => (p.id === id ? { ...p, ...data, id } : p))
  writeStorage(STORAGE_KEYS.POSTS, next)
  return next
}

// 删除博客
export function deletePost(id: string): Post[] {
  const next = getPosts().filter((p) => p.id !== id)
  writeStorage(STORAGE_KEYS.POSTS, next)
  return next
}
