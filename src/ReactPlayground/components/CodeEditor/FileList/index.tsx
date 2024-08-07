import { useMemo } from "react";
import { usePlayGroundContext } from "../../../PlaygroundContext";
import FileNameItem from "./FileNameItem";

export default function FileList() {
  const { files, addFile } = usePlayGroundContext();

  const keys = useMemo(() => {
    return Object.keys(files);
  }, [files]);

  return (
    <div className="flex items-center gap-1 whitespace-nowrap overflow-y-hidden overflow-x-auto scroll-bar-hidden">
      <div className="flex">
        {keys.map((k) => {
          return <FileNameItem {...files[k]} />;
        })}
      </div>
      <div
        className="add text-[skyblue] cursor-pointer border-b-[2px] border-[transparent]"
        onClick={addFile}
      >
        +
      </div>
    </div>
  );
}
