/** @type {import('tailwindcss').Config} */
module.exports = {
  // 告诉 Tailwind 在哪里可以找到你的 HTML 文件和 Vue 组件
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 告诉 Tailwind 如何扩展默认样式
  theme: {
    // 扩展默认样式
    extend: {},
  },
  // 告诉 Tailwind 如何使用插件
  plugins: [],
}
