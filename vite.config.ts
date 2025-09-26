import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as fs from 'node:fs'
import * as path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Plugin to copy index.html to 404.html for GitHub Pages SPA routing
    {
      name: 'copy-index-to-404',
      closeBundle() {
        try {
          const distPath = path.resolve('dist')
          const indexPath = path.join(distPath, 'index.html')
          const notFoundPath = path.join(distPath, '404.html')
          
          if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, notFoundPath)
            // eslint-disable-next-line no-console
            console.log('✅ Copied index.html to 404.html for GitHub Pages SPA routing')
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('⚠️ Failed to copy index.html to 404.html:', error)
        }
      }
    }
  ],
  base: '/', // Set to '/' since we'll use a custom domain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
