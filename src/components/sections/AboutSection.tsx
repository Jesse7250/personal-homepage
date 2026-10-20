import type { Profile } from '../../types/profile'

// 个人介绍：教育背景 + 经历时间线
export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about">
      <h2 className="text-2xl font-bold">关于我</h2>

      <h3 className="mt-6 text-lg font-semibold text-accent">教育背景</h3>
      <ul className="mt-3 space-y-2 text-foreground/80">
        {profile.education.map((edu, i) => (
          <li key={i}>{edu}</li>
        ))}
      </ul>

      <h3 className="mt-8 text-lg font-semibold text-accent">经历</h3>
      <ol className="mt-4 space-y-6 border-l border-white/10 pl-6">
        {profile.experiences.map((exp, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[31px] top-1 h-2 w-2 rounded-full bg-accent" />
            <h4 className="font-medium">{exp.title}</h4>
            <p className="text-sm text-foreground/60">
              {exp.org} · {exp.date}
            </p>
            <p className="mt-1 text-sm text-foreground/80">{exp.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
