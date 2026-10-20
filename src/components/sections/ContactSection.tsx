import { useState } from 'react'
import type { Profile } from '../../types/profile'

// 联系：邮箱一键复制 + 社交链接
export function ContactSection({ profile }: { profile: Profile }) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 忽略复制失败
    }
  }

  return (
    <section id="contact">
      <h2 className="text-2xl font-bold">联系我</h2>
      <div className="mt-6 space-y-4">
        <button
          onClick={copyEmail}
          className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm transition hover:bg-white/5"
        >
          <span className="text-foreground/80">{profile.contact.email}</span>
          <span className="text-accent">{copied ? '已复制' : '复制'}</span>
        </button>

        <div className="flex gap-4">
          {profile.contact.github && (
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:underline"
            >
              GitHub
            </a>
          )}
          {profile.contact.linkedin && (
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:underline"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
