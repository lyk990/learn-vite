import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import myVirtualVitePlugin from "./src/plugins/myPlugin";
import inspect from "vite-plugin-inspect";
import alias from "./src/plugins/viteAlias";
import htmlPlugin from "./src/plugins/htmlPlugin";
import mockPlugin from "./src/plugins/mockplugin";
import autoImportrouter from "./src/plugins/autoImportrouter";

export default defineConfig({
  plugins: [
    vue(),
    alias(),
    autoImportrouter(),
    // mockPlugin(),
    // htmlPlugin({
    //   inject: {
    //     data: {
    //       title: "主页2",
    //     },
    //   },
    // }),
  ],
});
