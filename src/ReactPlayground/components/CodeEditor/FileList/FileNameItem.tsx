import classNames from "classnames";
import { EditorFile, usePlayGroundContext } from "../../../PlaygroundContext";
import { useState } from "react";

export default function FileNameItem(props: EditorFile) {
  const { selectedFile, setSelectedFile, removeFile } = usePlayGroundContext();
  const { id, name, buildIn } = props;
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    if (!buildIn) {
      setIsEdit(true);
    }
  };

  return (
    <div
      className={classNames(
        " text-[13px] px-[10px] pt-[8px] pb-[6px]  border-b-[3px] border-[transparent] flex gap-2 items-center",
        { " border-b-[skyblue]": selectedFile.id === id }
      )}
      onDoubleClick={onEdit}
    >
      {isEdit ? (
        <input />
      ) : (
        <>
          <span
            className="cursor-pointer"
            onClick={() => {
              setSelectedFile(id);
            }}
          >
            {name}
          </span>
          {!buildIn && (
            <span
              className=" text-gray-400 px-1 cursor-pointer"
              onClick={() => {
                removeFile(id);
              }}
            >
              ×
            </span>
          )}
        </>
      )}
    </div>
  );
}
