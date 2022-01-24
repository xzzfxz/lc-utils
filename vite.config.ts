import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const resolvePath = (path) => {
  return resolve(__dirname, path);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolvePath("./src"),
    },
  },
});
