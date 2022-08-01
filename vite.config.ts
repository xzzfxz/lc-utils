import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import VitePluginImporter from "vite-plugin-importer";

const resolvePath = (path) => {
  return resolve(__dirname, path);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginImporter({
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: "css",
    }),
  ],
  resolve: {
    alias: {
      "@": resolvePath("./src"),
    },
  },
});
