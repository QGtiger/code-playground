import classNames from "classnames";
import { EditorFile, usePlayGroundContext } from "../../../PlaygroundContext";
import { useRef, useState } from "react";

export default function FileNameItem(props: EditorFile) {
  const { selectedFile, setSelectedFile, removeFile, updateFile } =
    usePlayGroundContext();
  const { id, name, buildIn } = props;
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onEdit = () => {
    if (!buildIn) {
      setIsEdit(true);

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current!.value = name;
      });
    }
  };

  const onBlur = () => {
    setIsEdit(false);
    updateFile(id, {
      name: inputRef.current?.value,
    });
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
        <input
          className=" border-none w-[120px] outline-none"
          ref={inputRef}
          onBlur={onBlur}
        />
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
                if (confirm("确认删除?")) {
                  removeFile(id);
                }
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
