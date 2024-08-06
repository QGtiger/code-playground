import Editor, { EditorFile } from "./Editor";
import FileList from "./FileList";

export default function CodeEditor() {
  const file: EditorFile = {
    name: "test.tsx",
    value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
    language: "typescript",
  };

  return (
    <div className="h-full">
      <FileList />
      <Editor
        file={file}
        onChange={(a, b) => {
          console.log(a, b);
        }}
      />
    </div>
  );
}
