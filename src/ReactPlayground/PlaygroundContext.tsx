import { createContext, PropsWithChildren, useContext, useState } from "react";
import { getLanguageByFileName } from "./utils";
import { v4 as uuidV4 } from "uuid";
import { App_uuid, initFiles } from "./files";

export interface EditorFile {
  id: string;
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [x: string]: EditorFile;
}

export interface PlaygroundContextInfer {
  files: Files;
  selectedFile: EditorFile;
  setSelectedFile: (id: string) => void;
  addFile: (fileName: string) => void;
  removeFile: (id: string) => void;
  setFiles: (files: Files) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextInfer>(
  {} as PlaygroundContextInfer
);

export function usePlayGroundContext() {
  return useContext(PlaygroundContext);
}

export function PlaygroundProvider(props: PropsWithChildren) {
  const [selectedFileNameID, setSelectedFileID] = useState(App_uuid);
  const [files, setFiles] = useState<Files>(initFiles);

  const addFile = (name: string) => {
    const _id = uuidV4();
    files[_id] = {
      id: _id,
      name,
      value: "",
      language: getLanguageByFileName(name),
    };
    setFiles({
      ...files,
    });
  };

  const removeFile = (id: string) => {
    delete files[id];
    setFiles({
      ...files,
    });
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
