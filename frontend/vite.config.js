import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: { chunkSizeWarningLimit: 2000 },
  server: {
    port: 1000,
  },
  preview: {
    port: 1000,
  },
  optimizeDeps: {
    include: ["redux", "@reduxjs/toolkit"],
  },
});
