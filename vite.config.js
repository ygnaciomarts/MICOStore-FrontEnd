import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    __API__: JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://mico-api.ygnaciomarts.com'
        : 'http://localhost:8081'
    )
  },
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/auth': 'http://localhost:8081',
      '/api': 'http://localhost:8081',
      '/admin': 'http://localhost:8081'
    }
  }
});