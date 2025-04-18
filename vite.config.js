import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    __API__: JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://micostore-api.onrender.com'
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