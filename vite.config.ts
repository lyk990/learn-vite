import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import myVirtualVitePlugin from "./src/plugins/myPlugin";
import inspect from "vite-plugin-inspect";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), myVirtualVitePlugin(), inspect()],
});
