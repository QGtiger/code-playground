import { usePlayGroundContext } from "../../PlaygroundContext";
import Editor from "./Editor";
import FileList from "./FileList";
import { debounce } from "lodash-es";

export default function CodeEditor() {
  const { selectedFile, setFiles, files } = usePlayGroundContext();

  const onEditorChange = debounce((value: string) => {
    selectedFile.value = value!;
    setFiles({ ...files });
  }, 500);

  return (
    <div className="h-full">
      <FileList />
      <Editor
        file={selectedFile}
        onChange={(v) => {
          onEditorChange(v!);
        }}
      />
    </div>
  );
}
