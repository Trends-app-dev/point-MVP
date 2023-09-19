import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
const { VITE_URL_BASE } = import.meta.env;

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  css: {
    modules: true,
  },
  server: {
    proxy: {
      "/api": {
        target: VITE_URL_BASE, // URL del backend
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "./src/assets/logos/logoClaro.png",
      },
    },
  },
});
