// 博客类型定义
export interface Post {
  id: string // 唯一 id
  title: string // 标题
  summary: string // 摘要
  content: string // Markdown 正文
  tags: string[] // 标签
  cover?: string // 封面图
  date: string // 发布日期
}
