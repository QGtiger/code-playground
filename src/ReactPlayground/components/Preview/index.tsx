import { useEffect, useState } from "react";
import { usePlayGroundContext } from "../../PlaygroundContext";
import { compile } from "./compiler";
import Editor from "../CodeEditor/Editor";

export default function Preview() {
  const { selectedFile, files } = usePlayGroundContext();
  const [compiledCode, setCompiledCode] = useState("");

  useEffect(() => {
    setCompiledCode(compile(selectedFile.name, selectedFile.value, files));
  }, [selectedFile, files]);

  return (
    <Editor
      file={{
        name: "dist.js",
        value: compiledCode,
        language: "javascript",
      }}
    ></Editor>
  );
}
