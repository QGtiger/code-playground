import { useMemo } from "react";
import { usePlayGroundContext } from "../../../PlaygroundContext";
import classNames from "classnames";

export default function FileList() {
  const { files, setSelectedFile, selectedFile, addFile, removeFile } =
    usePlayGroundContext();

  const keys = useMemo(() => {
    return Object.keys(files);
  }, [files]);

  return (
    <div className="flex items-center gap-1 whitespace-nowrap overflow-y-hidden overflow-x-auto scroll-bar-hidden">
      <div className="flex">
        {keys.map((k) => {
          const _name = files[k].name;
          return (
            <div
              key={k}
              className={classNames(
                " text-[13px] px-[10px] pt-[8px] pb-[6px]  border-b-[3px] border-[transparent] flex gap-2 items-center",
                { " border-b-[skyblue]": selectedFile.id === k }
              )}
            >
              <span
                className="cursor-pointer"
                onClick={() => {
                  setSelectedFile(k);
                }}
              >
                {_name}
              </span>
              {!files[k].buildIn && (
                <span
                  className=" text-gray-400 px-1 cursor-pointer"
                  onClick={() => {
                    removeFile(k);
                  }}
                >
                  ×
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div
        className="add text-green-600 cursor-pointer border-b-[2px] border-[transparent]"
        onClick={addFile}
      >
        +
      </div>
    </div>
  );
}
