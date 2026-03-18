import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://38b6-27-3-112-127.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
