import { useState } from 'react'
import type { ReactNode } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getProfile, updateProfile } from '../../api/profile'
import { zodResolver } from '../../utils/zodResolver'

const inputCls =
  'w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent'

// 表单字段包装（label + 错误提示）
function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-sm text-foreground/70">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

// 个人信息表单校验规则
const profileSchema = z.object({
  name: z.string().min(1, { message: '请输入姓名' }),
  position: z.string().min(1, { message: '请输入职位' }),
  avatar: z.string(),
  bio: z.string(),
  educationText: z.string(),
  experiences: z.array(
    z.object({
      title: z.string(),
      org: z.string(),
      date: z.string(),
      desc: z.string(),
    }),
  ),
  email: z.string().min(1, { message: '请输入邮箱' }),
  github: z.string(),
  linkedin: z.string(),
})

type ProfileForm = z.infer<typeof profileSchema>

// 个人信息管理
function ProfileEdit() {
  const [saved, setSaved] = useState(false)
  const [initial] = useState(() => getProfile())

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initial.name,
      position: initial.position,
      avatar: initial.avatar,
      bio: initial.bio,
      educationText: initial.education.join('\n'),
      experiences: initial.experiences,
      email: initial.contact.email,
      github: initial.contact.github,
      linkedin: initial.contact.linkedin ?? '',
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'experiences' })

  const onSubmit = (data: ProfileForm) => {
    updateProfile({
      name: data.name,
      position: data.position,
      avatar: data.avatar,
      bio: data.bio,
      education: data.educationText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      experiences: data.experiences,
      contact: {
        email: data.email,
        github: data.github,
        linkedin: data.linkedin || undefined,
      },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">个人信息管理</h1>
        {saved && <span className="text-sm text-green-400">已保存</span>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="姓名" error={errors.name?.message}>
            <input {...register('name')} className={inputCls} />
          </Field>
          <Field label="职位" error={errors.position?.message}>
            <input {...register('position')} className={inputCls} />
          </Field>
        </div>

        <Field label="头像 URL">
          <input {...register('avatar')} className={inputCls} />
        </Field>

        <Field label="一句话介绍">
          <textarea {...register('bio')} className={inputCls} rows={2} />
        </Field>

        <Field label="教育背景（每行一条）">
          <textarea {...register('educationText')} className={inputCls} rows={3} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="邮箱" error={errors.email?.message}>
            <input {...register('email')} className={inputCls} />
          </Field>
          <Field label="GitHub">
            <input {...register('github')} className={inputCls} />
          </Field>
        </div>

        <Field label="LinkedIn">
          <input {...register('linkedin')} className={inputCls} />
        </Field>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">经历</h2>
            <button
              type="button"
              onClick={() => append({ title: '', org: '', date: '', desc: '' })}
              className="text-sm text-accent hover:underline"
            >
              添加经历
            </button>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="mt-4 space-y-2 rounded-lg border border-white/10 p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input {...register(`experiences.${index}.title`)} placeholder="职位" className={inputCls} />
                <input {...register(`experiences.${index}.org`)} placeholder="公司/组织" className={inputCls} />
              </div>
              <input
                {...register(`experiences.${index}.date`)}
                placeholder="时间（如 2023 - 至今）"
                className={inputCls}
              />
              <textarea
                {...register(`experiences.${index}.desc`)}
                placeholder="描述"
                className={inputCls}
                rows={2}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm text-red-400 hover:underline"
              >
                删除
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-accent px-6 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          保存
        </button>
      </form>
    </div>
  )
}

export default ProfileEdit
