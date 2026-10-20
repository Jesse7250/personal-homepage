import { Link, useParams } from 'react-router-dom'
import { getProjects } from '../api/projects'
import { MarkdownContent } from '../components/MarkdownContent'

// 项目详情页
function ProjectDetail() {
  const { id } = useParams()
  const project = getProjects().find((p) => p.id === id)

  if (!project) {
    return <div className="text-foreground/70">项目不存在。</div>
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/projects" className="text-sm text-accent hover:underline">
        ← 返回项目列表
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{project.title}</h1>
      <p className="mt-2 text-sm text-foreground/50">{project.date}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
            {tag}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm text-accent hover:underline"
        >
          访问项目
        </a>
      )}

      {project.content ? (
        <div className="mt-8">
          <MarkdownContent content={project.content} />
        </div>
      ) : (
        <p className="mt-6 text-foreground/80">{project.desc}</p>
      )}
    </article>
  )
}

export default ProjectDetail
