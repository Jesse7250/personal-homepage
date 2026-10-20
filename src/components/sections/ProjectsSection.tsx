import { Link } from 'react-router-dom'
import type { Project } from '../../types/project'

// 项目展示：卡片列表（封面 + 标题 + 描述 + 标签）
export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects">
      <h2 className="text-2xl font-bold">项目</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-accent/50"
          >
            {p.cover ? (
              <img src={p.cover} alt={p.title} className="h-40 w-full object-cover" />
            ) : (
              <div className="flex h-40 w-full items-center justify-center bg-white/5 text-foreground/40">
                暂无封面
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold transition group-hover:text-accent">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-foreground/70">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
