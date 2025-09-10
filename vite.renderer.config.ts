import { defineConfig } from 'vite' // 导入 defineConfig
import vue from '@vitejs/plugin-vue' // 导入 Vue 插件

// https://vitejs.dev/config
export default defineConfig({
  // 告诉 Vite 如何处理 Vue 组件
  plugins: [vue()], 
  // 告诉 Vite 如何处理 CSS
  css: {
    postcss: {
      // 告诉 PostCSS 如何处理 Tailwind CSS
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
})
