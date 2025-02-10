import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default {
  root: "./src/useActionState",
  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
    sourcemap: true,
    minify: false,
    watch: {
      include: "/**",
    },
  },
  mode: "development",
  plugins: [react()],
} satisfies UserConfig;
