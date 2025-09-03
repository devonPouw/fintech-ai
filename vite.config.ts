import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    rollupOptions: {
      output: {
        manualChunks: () => "everything", // disables code splitting
        entryFileNames: "assets/index.[hash].js",
        chunkFileNames: "assets/index.[hash].js",
        assetFileNames: "assets/index.[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
