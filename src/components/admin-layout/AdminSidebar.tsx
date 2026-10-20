import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const MENU = [
  { to: '/admin', label: '仪表盘', end: true },
  { to: '/admin/profile', label: '个人信息' },
  { to: '/admin/skills', label: '技能管理' },
  { to: '/admin/projects', label: '项目管理' },
  { to: '/admin/posts', label: '博客管理' },
  { to: '/admin/settings', label: '站点设置' },
]

// 后台侧边栏
export function AdminSidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-white/10 bg-black/40">
      <div className="p-4 text-lg font-bold text-accent">管理后台</div>
      <nav className="flex-1 space-y-1 p-2">
        {MENU.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm transition ${
                isActive ? 'bg-accent/20 text-accent' : 'text-foreground/70 hover:bg-white/5'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="m-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-foreground/70 hover:bg-white/10"
      >
        退出登录
      </button>
    </aside>
  )
}
