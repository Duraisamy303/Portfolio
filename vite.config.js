import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Remove or comment out the base path for Vercel deployment
  // base: '/react-portfolio-template/',
  base: './', // Use relative paths for Vercel
  
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split the swiper plugin library into a separate chunk to avoid a large chunk size on index.js
            if (id.includes('swiper'))
              return 'swiper';
            return;
          }
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import"],
      },
    },
  },
  
  // Add this for Vercel compatibility
  server: {
    port: 3000,
    host: true
  }
})