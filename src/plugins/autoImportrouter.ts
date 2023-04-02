import fs from "fs";

// 返回一个包含指定目录下所有文件名的数组对象
let fileNameArr = fs.readdirSync("./src/components/children");
// console.log( fileNameArr );

let fileNamePath = fileNameArr.map((f) =>
  // .split()，把字符串分割为字符串数组
  // console.log( {name:f.split('.')[0]} )

  // 拼接组件所在的路径
  // console.log( {importPath:`/src/components/children${f}`} )

  // 返回拼接结果
  ({
    name: f.split(".")[0],
    importPath: `/src/components/children/${f}`,
  })
);
// console.log(fileNamePath)

// import 引入的语句
let importsObj = fileNamePath.map((f) => {
  // console.log( f )
  return `import ${f.name} from '${f.importPath}'`;
});
// console.log( importsObj )

// 拼接每个组件的路由对象
let routesObj = fileNamePath.map((f) => {
  return `
        {
            path: '/${f.name}',
            name: '${f.name}',
            component: ${f.name}
        }
    `;
});
// console.log( routesObj )

export default function () {
  const virtualModuleId = "virtual:my-module";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "vite-plugin-route",
    resolveId(id, imp) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        // .join，把数组中的元素，转为字符串
        // console.log( importsObj.join('\n') )
        // console.log( routesObj )

        return `
                    ${importsObj.join("\n")}
                    
                    export const routersArr = [${routesObj}]
                `;
      }
    },
  };
}
