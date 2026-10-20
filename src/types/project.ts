// 项目类型定义
export interface Project {
  id: string // 唯一 id
  title: string // 项目标题
  desc: string // 项目描述
  content?: string // 详情 Markdown 内容
  cover: string // 封面图 URL
  tags: string[] // 技术标签
  link: string // 项目链接
  date: string // 完成日期
}
