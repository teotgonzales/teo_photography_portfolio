import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages note:
// - Keep base as './' for a portable project-page build.
// - If you prefer an absolute path, change it to '/your-repo-name/' before building.
export default defineConfig({
  base: './',
  plugins: [react()],
});
