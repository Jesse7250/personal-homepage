import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

// 生成标题锚点 id（保留中文字符）
export function slug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
}

// 目录项
export interface Heading {
  level: number
  text: string
  id: string
}

// 从 Markdown 提取 1-3 级标题用于生成目录
export function extractHeadings(content: string): Heading[] {
  return [...content.matchAll(/^(#{1,3})\s+(.+)$/gm)].map((m) => {
    const text = m[2].trim()
    return { level: m[1].length, text, id: slug(text) }
  })
}

// Markdown 渲染组件：GFM + 代码高亮 + 标题锚点
export function MarkdownContent({ content }: { content: string }) {
  const heading =
    (level: 1 | 2 | 3) =>
    ({ children }: { children?: ReactNode }) => {
      const id = slug(String(children ?? ''))
      if (level === 1) return <h1 id={id}>{children}</h1>
      if (level === 2) return <h2 id={id}>{children}</h2>
      return <h3 id={id}>{children}</h3>
    }

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{ h1: heading(1), h2: heading(2), h3: heading(3) }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
