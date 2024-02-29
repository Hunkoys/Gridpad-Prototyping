// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  publicDir: 'app/public',
  server: {
    host: '0.0.0.0',
  },
});

// old config
// export default {
//   publicDir: 'app/public',
//   server: {
//     host: '0.0.0.0',
//   },
// }
