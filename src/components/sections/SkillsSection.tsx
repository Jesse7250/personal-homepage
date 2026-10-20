import type { Skill } from '../../types/skill'

// 技能展示：按分类分组 + 图标 + 名称 + 熟练度
export function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map((s) => s.category))]

  return (
    <section id="skills">
      <h2 className="text-2xl font-bold">技能</h2>
      {categories.map((cat) => (
        <div key={cat} className="mt-6">
          <h3 className="text-lg font-semibold text-accent">{cat}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {skills
              .filter((s) => s.category === cat)
              .map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-accent/50"
                >
                  <div className="text-3xl">{s.icon || s.name.charAt(0)}</div>
                  <div className="mt-2 font-medium">{s.name}</div>
                  <div className="mt-1 text-xs text-accent">{s.level}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  )
}
