import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'import.meta.env.VITE_NASA_API_KEY': JSON.stringify(process.env.VITE_NASA_API_KEY)
  }
});
