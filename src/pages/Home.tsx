import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../api/profile'
import { getSkills } from '../api/skills'
import { getProjects } from '../api/projects'
import { getPosts } from '../api/posts'
import type { Profile } from '../types/profile'
import { AboutSection } from '../components/sections/AboutSection'
import { SkillsSection } from '../components/sections/SkillsSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { BlogSection } from '../components/sections/BlogSection'
import { ContactSection } from '../components/sections/ContactSection'

// Hero 区：头像 + 姓名 + 职位 + 一句话介绍 + CTA
function HeroSection({ profile }: { profile: Profile }) {
  const initial = profile.name.trim().slice(0, 1) || '我'

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-28 w-28 rounded-full border-2 border-accent object-cover"
        />
      ) : (
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-accent bg-white/5 text-4xl font-bold text-accent">
          {initial}
        </div>
      )}

      <h1 className="mt-6 text-4xl font-bold sm:text-5xl">{profile.name}</h1>
      <p className="mt-3 text-lg text-accent">{profile.position}</p>
      <p className="mt-4 max-w-xl text-foreground/70">{profile.bio}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/projects"
          className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          查看项目
        </Link>
        {/* 简历文件就绪后改为下载链接 */}
        <button
          type="button"
          className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-white/5"
        >
          下载简历
        </button>
        <Link
          to="/contact"
          className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-white/5"
        >
          联系我
        </Link>
      </div>
    </section>
  )
}

// 首页：Hero + 介绍 + 技能 + 项目 + 博客 + 联系
function Home() {
  const [profile] = useState(() => getProfile())
  const [skills] = useState(() => getSkills())
  const [projects] = useState(() => getProjects())
  const [posts] = useState(() => getPosts())

  return (
    <div className="space-y-24">
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <BlogSection posts={posts} />
      <ContactSection profile={profile} />
    </div>
  )
}

export default Home
