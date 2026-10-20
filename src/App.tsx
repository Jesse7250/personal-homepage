import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './components/RequireAuth'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Starfield } from './components/layout/Starfield'
import { AdminSidebar } from './components/admin-layout/AdminSidebar'
import { AdminTopbar } from './components/admin-layout/AdminTopbar'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProfileEdit from './pages/admin/ProfileEdit'
import SkillsManage from './pages/admin/SkillsManage'
import ProjectsManage from './pages/admin/ProjectsManage'
import PostsManage from './pages/admin/PostsManage'
import Settings from './pages/admin/Settings'

// 前台布局：星空背景 + 导航 + 内容 + 页脚
function FrontLayout() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Starfield />
      <Navbar />
      <main className="mx-auto w-full max-w-[1200px] px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

// 后台布局：侧边栏 + 顶栏 + 内容
function AdminLayout() {
  return (
    <div className="flex h-screen bg-base text-foreground">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// 根组件：路由配置（前台 / 后台 /admin 隔离）
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 前台路由 */}
        <Route element={<FrontLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* 后台登录（独立，无后台布局） */}
        <Route path="/admin/login" element={<Login />} />

        {/* 后台路由（守卫 + 后台布局） */}
        <Route path="/admin" element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ProfileEdit />} />
            <Route path="skills" element={<SkillsManage />} />
            <Route path="projects" element={<ProjectsManage />} />
            <Route path="posts" element={<PostsManage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
