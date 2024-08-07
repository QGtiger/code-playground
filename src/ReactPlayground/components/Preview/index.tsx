import { useEffect, useState } from "react";
import { usePlayGroundContext } from "../../PlaygroundContext";
import { compile } from "./compiler";
import Editor from "../CodeEditor/Editor";

export default function Preview() {
  const { selectedFile } = usePlayGroundContext();
  const [compiledCode, setCompiledCode] = useState("");

  useEffect(() => {
    setCompiledCode(compile(selectedFile.name, selectedFile.value));
  }, [selectedFile]);

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
