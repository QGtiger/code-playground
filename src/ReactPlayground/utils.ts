import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate";
import { Files } from "./PlaygroundContext";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { v4 as uuidV4 } from "uuid";

export function getLanguageByFileName(name: string) {
  const suffix = name.split(".").pop() || "";
  if (["js", "jsx"].includes(suffix)) return "javascript";
  if (["ts", "tsx"].includes(suffix)) return "typescript";
  if (["json"].includes(suffix)) return "json";
  if (["css"].includes(suffix)) return "css";
  return "javascript";
}

/**
 * 是否用 fllate 进行 压缩
 * @param data
 * @returns
 */
export function compress(data: string) {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
}

export function uncompress(base64: string) {
  const binary = atob(base64);

  const buffer = strToU8(binary, true);
  const unzipped = unzlibSync(buffer);
  return strFromU8(unzipped);
}

/**
 * 从链接中获取 file信息
 * @returns
 */
export function getFilesFormUrlHash() {
  let files: Files | undefined;
  try {
    files = JSON.parse(uncompress(window.location.hash.slice(1)));
  } catch (e) {
    console.error(e);
  }
  return files;
}

export async function downloadFiles(files: Files) {
  const zip = new JSZip();

  Object.values(files).forEach((file) => {
    zip.file(file.name, file.value);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `code_${uuidV4()}.zip`);
}
