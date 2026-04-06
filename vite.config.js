import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    server: {
      open: true,
    },
    plugins: [
      react(),
      // SPA fallback: serve index.html for routes like /login, /signup so they don't 404
      {
        name: 'spa-fallback',
        enforce: 'pre',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url ?? ''
            // Don't rewrite API calls, static assets, or Vite internals
            if (url.startsWith('/api') || url.startsWith('/@') || url.includes('.')) return next()
            req.url = '/'
            next()
          })
        },
      },
    ],
  }
})
