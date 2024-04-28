import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig(() => {
  return {
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
    alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    },
  };
});