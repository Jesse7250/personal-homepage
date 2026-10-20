import { useEffect, useRef } from 'react'

// 星空背景组件：Canvas 粒子动画（缓慢闪烁 + 视差滚动，移动端降粒子，尊重 prefers-reduced-motion）
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let scrollY = window.scrollY

    // 移动端（<768px）降低粒子数量
    const isMobile = width < 768
    const count = isMobile ? 40 : 120

    // 生成粒子（depth 用于视差）
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.8 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        // 视差滚动：随页面滚动产生轻微纵向偏移
        const y = s.y - scrollY * s.depth * 0.2
        // 缓慢闪烁：透明度随相位正弦变化
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.phase))
        ctx.beginPath()
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 234, 242, ${alpha})`
        ctx.fill()
        s.phase += s.speed
      }
    }

    let raf = 0
    if (reducedMotion) {
      // 降级为静态背景
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(230, 234, 242, 0.6)'
        ctx.fill()
      }
    } else {
      const loop = () => {
        draw()
        raf = requestAnimationFrame(loop)
      }
      loop()
    }

    const onScroll = () => {
      scrollY = window.scrollY
    }
    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
}
