import { defineConfig } from 'vite';
import reactPreset from '@vitejs/plugin-react';
import svgPreset from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [reactPreset(), svgPreset()],
});
