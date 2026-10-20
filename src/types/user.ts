// 后台登录用户类型定义
export interface User {
  username: string // 账号
  token: string // 登录 token（不存明文密码）
}
