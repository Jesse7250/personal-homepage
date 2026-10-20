import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createPost, deletePost, getPosts, updatePost } from '../../api/posts'
import type { Post } from '../../types/post'
import { zodResolver } from '../../utils/zodResolver'
import { MarkdownEditor } from '../../components/MarkdownEditor'

const inputCls =
  'w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent'

// 博客表单校验规则
const postSchema = z.object({
  title: z.string().min(1, { message: '请输入标题' }),
  summary: z.string(),
  content: z.string(),
  cover: z.string(),
  tagsText: z.string(),
  date: z.string(),
})

type PostForm = z.infer<typeof postSchema>

// 按逗号拆分标签
function splitTags(text: string): string[] {
  return text
    .split(/[,，]/)
    .map((t) => t.trim())
    .filter(Boolean)
}

const emptyForm: PostForm = {
  title: '',
  summary: '',
  content: '',
  cover: '',
  tagsText: '',
  date: '',
}

// 博客管理：增删改查
function PostsManage() {
  const [posts, setPosts] = useState(() => getPosts())
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: emptyForm,
  })

  const onSubmit = (data: PostForm) => {
    const payload = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      cover: data.cover || undefined,
      tags: splitTags(data.tagsText),
      date: data.date,
    }
    if (editingId) {
      setPosts(updatePost(editingId, payload))
      setEditingId(null)
    } else {
      setPosts(createPost(payload))
    }
    reset(emptyForm)
  }

  const startEdit = (p: Post) => {
    setEditingId(p.id)
    reset({
      title: p.title,
      summary: p.summary,
      content: p.content,
      cover: p.cover ?? '',
      tagsText: p.tags.join(', '),
      date: p.date,
    })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('确定删除该博客吗？')) {
      setPosts(deletePost(id))
      if (editingId === id) setEditingId(null)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">博客管理</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4"
      >
        <input {...register('title')} placeholder="标题" className={inputCls} />
        <textarea {...register('summary')} placeholder="摘要" className={inputCls} rows={2} />
        <div className="grid gap-3 sm:grid-cols-2">
          <input {...register('cover')} placeholder="封面图 URL（可选）" className={inputCls} />
          <input {...register('date')} placeholder="发布日期（如 2026-10-20）" className={inputCls} />
        </div>
        <input {...register('tagsText')} placeholder="标签（逗号分隔）" className={inputCls} />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <MarkdownEditor value={field.value} onChange={(value) => field.onChange(value)} />
          )}
        />

        {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            {editingId ? '保存修改' : '新增博客'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                reset(emptyForm)
              }}
              className="rounded-lg border border-white/20 px-5 py-2 text-sm hover:bg-white/5"
            >
              取消
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 space-y-2">
        {posts.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-foreground/50">{p.date}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-sm text-accent hover:underline">
                编辑
              </button>
              <button onClick={() => handleDelete(p.id)} className="text-sm text-red-400 hover:underline">
                删除
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-sm text-foreground/50">暂无博客。</p>}
      </div>
    </div>
  )
}

export default PostsManage
