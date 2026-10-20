import type { FieldErrors, Resolver } from 'react-hook-form'
import type { z } from 'zod'

// 将 zod 校验结果转换为 react-hook-form 的 resolver
// （自行实现以替代 @hookform/resolvers，避免额外依赖）
// 注：此处使用 Resolver<any> 作为两个库之间的类型边界，useForm 的泛型仍保持精确类型。
export function zodResolver(schema: z.ZodTypeAny): Resolver<any> {
  return (values) => {
    const result = schema.safeParse(values)
    if (result.success) {
      return { values: result.data as any, errors: {} as FieldErrors }
    }

    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || 'root'
      if (!errors[key]) {
        errors[key] = { type: issue.code, message: issue.message }
      }
    }
    return { values: {} as any, errors: errors as FieldErrors }
  }
}
