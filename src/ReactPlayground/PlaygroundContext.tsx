import { createContext, PropsWithChildren, useContext, useState } from "react";
import { getLanguageByFileName } from "./utils";
import { v4 as uuidV4 } from "uuid";
import { App_uuid, initFiles } from "./files";

export interface EditorFile {
  id: string;
  name: string;
  value: string;
  language: string;

  hidden?: boolean;
  fixedRight?: boolean;
  readOnly?: boolean;
  buildIn?: boolean;
}

export interface Files {
  [x: string]: EditorFile;
}

export interface PlaygroundContextInfer {
  files: Files;
  selectedFile: EditorFile;
  setSelectedFile: (id: string) => void;
  addFile: () => void;
  removeFile: (id: string) => void;
  setFiles: (files: Files) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextInfer>(
  {} as PlaygroundContextInfer
);

export function usePlayGroundContext() {
  return useContext(PlaygroundContext);
}

function TemplateCode(CompName: string) {
  return `export default function ${CompName}() {
  return '${CompName}'
}`;
}

export function PlaygroundProvider(props: PropsWithChildren) {
  const [selectedFileNameID, setSelectedFileID] = useState(App_uuid);
  const [files, setFiles] = useState<Files>(initFiles);

  const addFile = () => {
    const _id = uuidV4();
    let index = 0;
    let name = `Comp${index || ""}`;
    while (Object.values(files).find((it) => it.name === `${name}.tsx`)) {
      ++index;
      name = `Comp${index || ""}`;
    }

    const fileName = `${name}.tsx`;
    files[_id] = {
      id: _id,
      name: fileName,
      value: TemplateCode(name),
      language: getLanguageByFileName(fileName),
    };
    setFiles({
      ...files,
    });
    setSelectedFileID(_id);
  };

  const removeFile = (id: string) => {
    delete files[id];
    setFiles({
      ...files,
    });

    setSelectedFileID(App_uuid);
  };

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFile: files[selectedFileNameID],
        setSelectedFile: setSelectedFileID,
        addFile,
        removeFile,
        setFiles,
      }}
    >
      {props.children}
    </PlaygroundContext.Provider>
  );
}
