import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createSkill, deleteSkill, getSkills, updateSkill } from '../../api/skills'
import type { Skill } from '../../types/skill'
import { zodResolver } from '../../utils/zodResolver'

const inputCls =
  'w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent'

const LEVELS = ['入门', '熟悉', '精通'] as const

// 技能表单校验规则
const skillSchema = z.object({
  name: z.string().min(1, { message: '请输入技能名' }),
  icon: z.string(),
  category: z.string().min(1, { message: '请输入分类' }),
  level: z.enum(['入门', '熟悉', '精通']),
})

type SkillForm = z.infer<typeof skillSchema>

// 技能管理：增删改查
function SkillsManage() {
  const [skills, setSkills] = useState(() => getSkills())
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: '', icon: '', category: '前端', level: '熟悉' },
  })

  const onSubmit = (data: SkillForm) => {
    if (editingId) {
      setSkills(updateSkill(editingId, data))
      setEditingId(null)
    } else {
      setSkills(createSkill(data))
    }
    reset({ name: '', icon: '', category: data.category, level: data.level })
  }

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id)
    reset({ name: skill.name, icon: skill.icon, category: skill.category, level: skill.level })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('确定删除该技能吗？')) {
      setSkills(deleteSkill(id))
      if (editingId === id) setEditingId(null)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">技能管理</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2"
      >
        <input {...register('name')} placeholder="技能名" className={inputCls} />
        <input {...register('icon')} placeholder="图标（可选，留空显示首字）" className={inputCls} />
        <input {...register('category')} placeholder="分类（如 前端/后端/工具）" className={inputCls} />
        <select {...register('level')} className={inputCls}>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <div className="flex gap-2 sm:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            {editingId ? '保存修改' : '新增技能'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                reset({ name: '', icon: '', category: '前端', level: '熟悉' })
              }}
              className="rounded-lg border border-white/20 px-5 py-2 text-sm hover:bg-white/5"
            >
              取消
            </button>
          )}
        </div>

        {(errors.name || errors.category) && (
          <p className="text-xs text-red-400 sm:col-span-2">
            {errors.name?.message ?? errors.category?.message}
          </p>
        )}
      </form>

      <div className="mt-6 space-y-2">
        {skills.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{s.icon || s.name.charAt(0)}</span>
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-foreground/50">
                  {s.category} · {s.level}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="text-sm text-accent hover:underline">
                编辑
              </button>
              <button onClick={() => handleDelete(s.id)} className="text-sm text-red-400 hover:underline">
                删除
              </button>
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-sm text-foreground/50">暂无技能。</p>}
      </div>
    </div>
  )
}

export default SkillsManage
