// 个人信息类型定义
export interface Profile {
  name: string // 姓名
  position: string // 职位/身份
  avatar: string // 头像 URL
  bio: string // 一句话介绍
  education: string[] // 教育背景
  experiences: Array<{
    title: string
    org: string
    date: string
    desc: string
  }>
  contact: {
    email: string
    github: string
    linkedin?: string
  }
}
