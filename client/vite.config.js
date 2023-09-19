import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
        target: "https://point-mvp-j2g6-dev.fl0.io", // URL del backend
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
