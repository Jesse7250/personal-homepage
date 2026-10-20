import { Link } from 'react-router-dom'
import type { Post } from '../../types/post'

// 博客展示：列表（标题 + 摘要 + 日期 + 标签）
export function BlogSection({ posts }: { posts: Post[] }) {
  return (
    <section id="blog">
      <h2 className="text-2xl font-bold">博客</h2>
      <div className="mt-6 space-y-4">
        {posts.map((p) => (
          <Link
            key={p.id}
            to={`/blog/${p.id}`}
            className="block rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-accent/50"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold transition hover:text-accent">{p.title}</h3>
              <span className="shrink-0 text-xs text-foreground/50">{p.date}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{p.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
