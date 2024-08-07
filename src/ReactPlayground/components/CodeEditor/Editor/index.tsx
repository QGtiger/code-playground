import MonacoEditor, { EditorProps, OnMount } from "@monaco-editor/react";
import { createATA } from "./ata";
import { EditorFile } from "../../../PlaygroundContext";

export default function Editor({
  file,
  onChange,
}: {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
}) {
  const handleMount: OnMount = (editor, monaco) => {
    const compilerOptions =
      monaco.languages.typescript.javascriptDefaults.getCompilerOptions();
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...compilerOptions,
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true, // 默认加上 default
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };

  console.log("==========file change ===========", file);

  return (
    <MonacoEditor
      height="100%"
      language={file.language}
      path={file.name}
      options={{
        fontSize: 12,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        tabSize: 2,
        lineNumbersMinChars: 3,
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
      }}
      onMount={handleMount}
      value={file.value}
      onChange={onChange}
    />
  );
}
