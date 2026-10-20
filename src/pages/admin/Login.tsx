import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../../hooks/useAuth'
import { zodResolver } from '../../utils/zodResolver'

// 登录表单校验规则
const loginSchema = z.object({
  username: z.string().min(1, { message: '请输入账号' }),
  password: z.string().min(1, { message: '请输入密码' }),
})

type LoginForm = z.infer<typeof loginSchema>

// 后台登录页
function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: LoginForm) => {
    if (login(data.username, data.password)) {
      navigate('/admin', { replace: true })
    } else {
      setError('root', { message: '账号或密码错误' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base text-foreground">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-6"
      >
        <h1 className="text-xl font-bold text-accent">后台登录</h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-foreground/70">账号</label>
            <input
              type="text"
              {...register('username')}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
            />
            {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>}
          </div>

          <div>
            <label className="text-sm text-foreground/70">密码</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>
        </div>

        {errors.root && <p className="mt-4 text-xs text-red-400">{errors.root.message}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-accent py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          登录
        </button>
      </form>
    </div>
  )
}

export default Login
