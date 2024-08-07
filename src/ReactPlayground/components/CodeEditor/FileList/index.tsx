import { useMemo } from "react";
import { usePlayGroundContext } from "../../../PlaygroundContext";
import classNames from "classnames";

export default function FileList() {
  const { files, setSelectedFile, selectedFile } = usePlayGroundContext();

  const keys = useMemo(() => {
    return Object.keys(files);
  }, [files]);

  return (
    <div className="flex">
      {keys.map((k) => {
        const _name = files[k].name;
        return (
          <div
            key={k}
            onClick={() => {
              setSelectedFile(k);
            }}
            className={classNames(
              " text-[13px] px-[10px] pt-[8px] pb-[6px] cursor-pointer border-b-[3px] border-[transparent]",
              { " border-b-[skyblue]": selectedFile.id === k }
            )}
          >
            {_name}
          </div>
        );
      })}
    </div>
  );
}
