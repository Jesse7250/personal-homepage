import { useAuth } from '../../hooks/useAuth'

// 后台顶栏
export function AdminTopbar() {
  const { user } = useAuth()

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 bg-black/40 px-4">
      <span className="text-sm text-foreground/70">欢迎回来</span>
      <span className="text-sm text-foreground">{user?.username ?? ''}</span>
    </header>
  )
}
