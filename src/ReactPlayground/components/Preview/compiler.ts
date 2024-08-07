import { transform } from "@babel/standalone";
import { Files } from "../../PlaygroundContext";
import { PluginObj } from "@babel/core";

export const babelTransform = (
  filename: string,
  code: string,
  files?: Files
) => {
  let result = "";
  try {
    result = transform(code, {
      presets: ["react", "typescript"],
      filename,
      plugins: [],
      retainLines: true, // 保留原有行列号
    }).code!;
  } catch (e) {
    console.error("编译出错", e);
  }
  return result;
};

function getModuleFile(files: Files, modulePath: string) {}

function customBabelResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        // 相对路径
        if (modulePath.startsWith(".")) {
        }
      },
    },
  };
}

export const compile = (fileName: string, code: string) => {
  return babelTransform(fileName, code);
};
