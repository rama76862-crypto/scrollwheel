import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    glsl({
      include: ['**/*.glsl', '**/*.vert', '**/*.frag'],
      compress: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@components': path.resolve(process.cwd(), './src/components'),
      '@shaders': path.resolve(process.cwd(), './src/shaders'),
      '@store': path.resolve(process.cwd(), './src/store'),
      '@hooks': path.resolve(process.cwd(), './src/hooks'),
      '@styles': path.resolve(process.cwd(), './src/styles'),
      '@shared': path.resolve(process.cwd(), './src/components/shared'),
      '@utils': path.resolve(process.cwd(), './src/utils'),
      '@data': path.resolve(process.cwd(), './src/data'),
      '@assets': path.resolve(process.cwd(), './src/assets'),
    },
  },
})
