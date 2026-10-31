import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      // In dev, mimic the /api/news serverless function by proxying to NewsAPI
      proxy: {
        '/api/news': {
          target: 'https://newsapi.org',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/news\??/, `/v2/top-headlines?apiKey=${env.NEWS_API_KEY}&`),
        },
      },
    },
  }
})
