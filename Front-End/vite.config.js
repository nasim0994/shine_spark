import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 2000 },
  server: {
    port: 9000,
  },
  preview: {
    port: 9000,
  },
});
