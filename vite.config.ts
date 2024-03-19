import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'

const resolvePath = (p) => path.resolve(__dirname, p)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    host: '127.0.0.1',
  },
  build: {
    outDir: './build',
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': resolvePath('./src/'),
      '@assets': resolvePath('./src/assets'),
      '@components': resolvePath('./src/components'),
      '@hooks': resolvePath('./src/hooks'),
      '@features': resolvePath('./src/features'),
      '@services': resolvePath('./src/services'),
      '@layouts': resolvePath('./src/layouts'),
      '@lib': resolvePath('./src/lib'),
      '@pages': resolvePath('./src/pages'),
      '@utils': resolvePath('./src/utils'),
      '@store': resolvePath('./src/store'),
      '@models': resolvePath('./src/models'),
      '@views': resolvePath('./src/views'),
    },
  },
})
