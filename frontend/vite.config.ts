import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import nightwatchPlugin from 'vite-plugin-nightwatch'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    nightwatchPlugin({
      renderPage: './nightwatch/index.html',
    }),
  ],
  test: {
    environment: 'jsdom', // ← これが大事！（ブラウザっぽい環境で実行する）
    globals: true, // describe, it, expect を import なしで使えるようにする
  },
  server: {
    host: '0.0.0.0', // コンテナ外からアクセス可能にする
    port: 3000, // Docker Composeのポートに合わせる
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
