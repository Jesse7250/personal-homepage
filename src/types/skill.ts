// 技能熟练度
export type SkillLevel = '入门' | '熟悉' | '精通'

// 技能类型定义
export interface Skill {
  id: string // 唯一 id
  name: string // 技能名
  icon: string // 图标
  category: string // 分类（前端/后端/工具等）
  level: SkillLevel // 熟练度
}
