// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { SITE_BASE } from "./config/siteConfig.js";

export default defineConfig({
  base: SITE_BASE,
  plugins: [
    react(),
  ],
  build: {
    outDir: "dist",
  },
});
