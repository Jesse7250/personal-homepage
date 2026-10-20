import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSkills } from '../../api/skills'
import { getProjects } from '../../api/projects'
import { getPosts } from '../../api/posts'

// 后台仪表盘：数据统计概览
function Dashboard() {
  const [skills] = useState(() => getSkills())
  const [projects] = useState(() => getProjects())
  const [posts] = useState(() => getPosts())

  const stats = [
    { label: '技能', value: skills.length, to: '/admin/skills' },
    { label: '项目', value: projects.length, to: '/admin/projects' },
    { label: '博客', value: posts.length, to: '/admin/posts' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold">仪表盘</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-accent/50"
          >
            <div className="text-3xl font-bold text-accent">{s.value}</div>
            <div className="mt-2 text-sm text-foreground/70">{s.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
