import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    "process.env": process.env,
  },
  server: {
    host: true,
    port: Number(process.env.VITE_PORT) || 3000,
    proxy: {
      "/photos": String(process.env.VITE_BE_URL) || "http://localhost:8083",
      "/api": String(process.env.VITE_BE_URL) || "http://localhost:8083",
    },
  },
});
