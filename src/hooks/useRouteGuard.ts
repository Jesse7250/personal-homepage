import { useAuth } from './useAuth'

// 路由守卫 Hook：返回登录态判断，供后台路由拦截使用
export function useRouteGuard() {
  const { isAuthenticated } = useAuth()
  return { isAuthenticated }
}
