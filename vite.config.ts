import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
          '@components': path.resolve(__dirname, './components'),
          '@services': path.resolve(__dirname, './services'),
          '@utils': path.resolve(__dirname, './utils'),
          '@types': path.resolve(__dirname, './types'),
          '@store': path.resolve(__dirname, './store'),
          '@data': path.resolve(__dirname, './data'),
        }
      },
      build: {
        target: 'esnext',
        minify: 'terser',
        sourcemap: mode === 'development',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              ui: ['zustand'],
              utils: ['marked', 'dompurify']
            }
          }
        }
      },
      server: {
        port: 5174,
        host: true,
        open: true
      },
      preview: {
        port: 4173,
        host: true
      }
    };
});
