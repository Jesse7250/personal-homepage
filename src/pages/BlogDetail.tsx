import { Link, useParams } from 'react-router-dom'
import { getPosts } from '../api/posts'
import { MarkdownContent, extractHeadings } from '../components/MarkdownContent'

// 博客详情页（Markdown 渲染 + 代码高亮 + TOC）
function BlogDetail() {
  const { id } = useParams()
  const post = getPosts().find((p) => p.id === id)

  if (!post) {
    return <div className="text-foreground/70">文章不存在。</div>
  }

  const headings = extractHeadings(post.content)

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/blog" className="text-sm text-accent hover:underline">
        ← 返回博客列表
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-sm text-foreground/50">{post.date}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
            {tag}
          </span>
        ))}
      </div>

      {/* 目录 */}
      {headings.length > 0 && (
        <nav className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-semibold text-accent">目录</h2>
          <ul className="mt-2 space-y-1">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: (h.level - 1) * 16 }}>
                <a href={`#${h.id}`} className="text-sm text-foreground/70 hover:text-accent">
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Markdown 正文 */}
      <div className="mt-8">
        <MarkdownContent content={post.content} />
      </div>
    </article>
  )
}

export default BlogDetail
