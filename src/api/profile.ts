import { STORAGE_KEYS, readStorage, writeStorage } from './storage'
import type { Profile } from '../types/profile'

// 默认个人信息（首次访问时的初始数据）
const DEFAULT_PROFILE: Profile = {
  name: '张三',
  position: '全栈开发工程师',
  avatar: '',
  bio: '热爱用代码创造价值的开发者。',
  education: ['某某大学 计算机科学与技术 本科'],
  experiences: [
    {
      title: '软件开发工程师',
      org: '某某科技公司',
      date: '2023 - 至今',
      desc: '负责核心业务系统的开发与维护。',
    },
  ],
  contact: {
    email: 'zhangsan@example.com',
    github: 'https://github.com/zhangsan',
  },
}

// 读取个人信息
export function getProfile(): Profile {
  return readStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE)
}

// 更新个人信息
export function updateProfile(profile: Profile): Profile {
  writeStorage(STORAGE_KEYS.PROFILE, profile)
  return profile
}
