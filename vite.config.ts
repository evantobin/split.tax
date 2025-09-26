import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Plugin to copy index.html to 404.html for GitHub Pages SPA routing
    {
      name: 'copy-index-to-404',
      closeBundle() {
        const distPath = join(__dirname, 'dist')
        copyFileSync(join(distPath, 'index.html'), join(distPath, '404.html'))
        console.log('✅ Copied index.html to 404.html for GitHub Pages SPA routing')
      }
    }
  ],
  base: '/', // Set to '/' since we'll use a custom domain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
