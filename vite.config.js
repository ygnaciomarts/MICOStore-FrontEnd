import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    __API__: JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://shopmico-api-devl.up.railway.app'
        : 'http://localhost:8081'
    )
  },
  server: {
    proxy: {
      '/auth': 'http://localhost:8081',
      '/api': 'http://localhost:8081'
    }
  }
});