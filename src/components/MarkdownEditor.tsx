import { MarkdownContent } from './MarkdownContent'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

// Markdown 编辑器：左侧编辑 + 右侧实时预览
export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[300px] w-full resize-y rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-sm text-foreground outline-none focus:border-accent"
        placeholder="在此输入 Markdown 内容..."
      />
      <div className="min-h-[300px] overflow-auto rounded-lg border border-white/10 bg-black/40 p-4">
        <MarkdownContent content={value} />
      </div>
    </div>
  )
}
