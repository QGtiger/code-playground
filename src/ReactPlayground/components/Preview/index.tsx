import { useEffect, useMemo, useState } from "react";
import { usePlayGroundContext } from "../../PlaygroundContext";
import { compile } from "./compiler";
import iframRaw from "./iframe.html?raw";
import { ImportMapJson_uuid } from "../../files";
import MessageError from "./components/MessageError";
import { useBoolean } from "ahooks";

import "./index.css";

export default function Preview() {
  const { files } = usePlayGroundContext();
  const [compiledCode, setCompiledCode] = useState("");
  const [messgae, setMessage] = useState("");
  const [showMessage, showMessageAction] = useBoolean(false);

  useEffect(() => {
    setCompiledCode(compile(files));
  }, [files]);

  useEffect(() => {
    const handleMessage = (e: {
      data: {
        type: string;
        message: string;
      };
    }) => {
      const { type, message } = e.data;
      if (type === "previewError") {
        setMessage(message);
        showMessageAction.setTrue();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const iframUrl = useMemo(() => {
    const html = iframRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[ImportMapJson_uuid].value}</script>`
      )
      .replace(
        '<script type="module" id="main_entry"></script>',
        `<script type="module" id="main_entry">${compiledCode}</script>`
      );

    return URL.createObjectURL(new Blob([html], { type: "text/html" }));
  }, [compiledCode]);

  return (
    <div className="h-full relative">
      <iframe src={iframUrl} className="w-full h-full"></iframe>
      {showMessage && (
        <MessageError
          className=" absolute bottom-[10px] w-[96%] left-[2%] animate-slide "
          message={messgae}
          onClose={showMessageAction.setFalse}
        />
      )}
    </div>
  );
}
