// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use('/api/todos', (req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify([
              { id: 1, title: 'Learn React', completed: false },
              { id: 2, title: 'Build with Vite', completed: true }
            ])
          )
        })
      }
    }
  ],
  // this helps Node ESM handle Windows drive letters properly
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
