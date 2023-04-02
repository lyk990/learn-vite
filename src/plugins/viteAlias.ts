import { Plugin, ResolvedConfig } from "vite";
import fs from "fs";
import path from "path";

function diffDirAndFile(dirFilesArr = [], basePath = "") {
  const result = {
    dirs: [],
    files: [],
  };
  dirFilesArr.forEach((name) => {
    const currentFileStat = fs.statSync(
      path.resolve(__dirname, basePath + "/" + name)
    );
    const isDirectory = currentFileStat.isDirectory();

    if (isDirectory) {
      result.dirs.push(name);
    } else {
      result.files.push(name);
    }
  });
  return result;
}

function getTotalSrcDir(keyName) {
  const result = fs.readdirSync(path.resolve(__dirname, "../../src"));
  const diffResult = diffDirAndFile(result, "../../src");
  const resolveAliasesObj = {}; // 放的就是一个一个的别名配置 @assets: xxx
  diffResult.dirs.forEach((dirName) => {
    const key = `${keyName}${dirName}`;
    const absPath = path.resolve(__dirname, "../src" + dirName);
    resolveAliasesObj[key] = absPath;
  });
  resolveAliasesObj["@"] = path.resolve(__dirname, "../");
  return resolveAliasesObj;
}

export default function alias(keyName = "@"): Plugin {
  return {
    name: "vite-plugin-alias",
    config(config, env) {
      const resolveAliasesObj = getTotalSrcDir(keyName);
      return {
        resolve: {
          alias: resolveAliasesObj,
        },
      };
    },
  };
}
