import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#080F1A',      // 主背景
        foreground: '#E6EAF2', // 主文字
        accent: '#3B82F6',     // 强调色
      },
    },
  },
  plugins: [typography],
}
