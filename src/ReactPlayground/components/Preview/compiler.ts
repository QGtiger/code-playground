import { transform } from "@babel/standalone";
import { EditorFile, Files } from "../../PlaygroundContext";
import { PluginObj } from "@babel/core";
import { Main_uuid } from "../../files";

// 默认导入 import React from 'react'
const beforeTransformCode = (filename: string, code: string) => {
  let _code = code;
  const regexReact = /import\s+React/g;
  if (
    (filename.endsWith(".jsx") || filename.endsWith(".tsx")) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`;
  }
  return _code;
};

export const babelTransform = (
  filename: string,
  code: string,
  files: Files
) => {
  let result = "";
  // console.log("开始编译:", filename, code, files);
  const _code = beforeTransformCode(filename, code);
  try {
    result = transform(_code, {
      presets: ["react", "typescript"],
      filename,
      plugins: [customBabelResolver(files)],
      retainLines: true, // 保留原有行列号
    }).code!;
  } catch (e) {
    console.error("编译出错", e);
  }
  return result;
};

/**
 * 获取 模块 文件信息
 * @param files
 * @param modulePath
 * @returns
 */
function getModuleFile(files: Files, modulePath: string) {
  let fileName = modulePath.split("./").pop() || "";
  const fileList = Object.values(files);
  if (!fileName.includes(".")) {
    const realModuleFile = fileList
      .filter((f) => {
        return (
          f.name.endsWith(".ts") ||
          f.name.endsWith(".tsx") ||
          f.name.endsWith(".js") ||
          f.name.endsWith(".jsx")
        );
      })
      .find((it) => {
        return it.name.split(".").includes(fileName);
      });
    if (realModuleFile) {
      fileName = realModuleFile.name;
    }
  }

  const fileInfo = fileList.find((file) => file.name === fileName);
  return fileInfo;
}

function json2Js(file: EditorFile) {
  const code = `export default ${file.value}`;
  return URL.createObjectURL(
    new Blob([code], { type: "application/javascript" })
  );
}

function css2Js(file: EditorFile) {
  const code = `
  (() => {
    const stylesheet = document.createElement('style');
    stylesheet.setAttribute('id', 'style_${file.name}_${file.id}');
    document.head.appendChild(stylesheet);

    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
  })()
  `;
  return URL.createObjectURL(
    new Blob([code], { type: "application/javascript" })
  );
}

/**
 * 自定义 babel Resolver 用作代码解析
 * @param files
 * @returns
 */
function customBabelResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        // 相对路径
        if (modulePath.startsWith(".")) {
          const fileInfo = getModuleFile(files, modulePath);
          if (!fileInfo) return;
          const fileName = fileInfo.name;
          if (fileName.endsWith(".css")) {
            path.node.source.value = css2Js(fileInfo);
          } else if (fileName.endsWith(".json")) {
            path.node.source.value = json2Js(fileInfo);
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(fileInfo.name, fileInfo.value, files)], {
                type: "application/javascript",
              })
            );
          }
        }
      },
    },
  };
}

export const compile = (files: Files) => {
  const entryFile = files[Main_uuid];
  return babelTransform(entryFile.name, entryFile.value, files);
};
