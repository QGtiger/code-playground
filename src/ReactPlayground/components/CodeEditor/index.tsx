import { useEffect } from "react";
import { usePlayGroundContext } from "../../PlaygroundContext";
import Editor from "./Editor";
import FileList from "./FileList";
import { useDebounceFn } from "ahooks";

export default function CodeEditor() {
  const { selectedFile, setFiles, files } = usePlayGroundContext();

  const { run: onEditorChange, cancel } = useDebounceFn(
    (value: string) => {
      if (value !== selectedFile.value) {
        selectedFile.value = value!;
        setFiles({ ...files });
      }
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    cancel();
  }, [selectedFile, cancel]);

  return (
    <div className="h-full">
      <FileList />
      <Editor
        file={selectedFile}
        onChange={(v) => {
          onEditorChange(v!);
        }}
        readOnly={selectedFile.readOnly}
      />
    </div>
  );
}
