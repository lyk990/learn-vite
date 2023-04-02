import { Plugin, ResolvedConfig } from "vite";
import fs from "node:fs";
import path from "node:path";

export default function viteMockPlugin(options): Plugin {
  return {
    name: "vite-plugin-mock",
    async configureServer(server) {
      const mockStat = fs.statSync("mock");
      const isDirectory = mockStat.isDirectory();
      let mockResult: any = [];
      if (isDirectory) {
        mockResult = (await import("../../mock/index")).default;
      }
      server.middlewares.use((req, res, next) => {
        const matchItem = mockResult.find(
          (mockDescriptor) => mockDescriptor.url === req.url
        );

        if (matchItem) {
          const responseData = matchItem.response(req);
          // 强制设置一下他的请求头的格式为json
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(responseData)); // 设置请求头 异步的
        } else {
          next();
        }
      });
    },
  };
}
