import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: '首页', end: true },
  { to: '/about', label: '关于' },
  { to: '/skills', label: '技能' },
  { to: '/projects', label: '项目' },
  { to: '/blog', label: '博客' },
  { to: '/contact', label: '联系' },
]

// 前台吸顶导航栏（含移动端汉堡菜单）
export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-lg font-bold text-accent">
          我的主页
        </NavLink>

        {/* 桌面端导航 */}
        <div className="hidden items-center gap-6 sm:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* 移动端汉堡按钮 */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded p-2 text-foreground sm:hidden"
          aria-label="切换菜单"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {open && (
        <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-3 sm:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `text-sm ${isActive ? 'text-accent' : 'text-foreground/70'}`}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
