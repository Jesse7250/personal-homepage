import { useState } from 'react'
import { readStorage, writeStorage } from '../api/storage'

// 通用本地存储 Hook：状态与 localStorage 保持同步
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStorage<T>(key, initialValue))

  const setStoredValue = (next: T) => {
    setValue(next)
    writeStorage(key, next)
  }

  return [value, setStoredValue] as const
}
