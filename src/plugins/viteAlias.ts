import { Plugin, ResolvedConfig } from "vite";

export default function (): Plugin {
  return {
    name: "vite-plugin-alas",
    config(config, env) {
      console.log("config", config);
      console.log("env", env);
      return {};
    },
  };
}
