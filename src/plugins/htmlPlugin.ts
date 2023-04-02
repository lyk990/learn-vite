import { Plugin, ResolvedConfig } from "vite";

export default function viteHtmlPlugin(options): Plugin {
  return {
    name: "vite-plugin-html",
    enforce: "pre",
    transformIndexHtml(html, ctx) {
      return html.replace(/<%= title %>/g, options.inject.data.title);
    },
  };
}
