import { useEffect, useMemo, useState } from "react";
import { usePlayGroundContext } from "../../PlaygroundContext";
import { compile } from "./compiler";
import iframRaw from "./iframe.html?raw";
import { ImportMapJson_uuid } from "../../files";

export default function Preview() {
  const { files } = usePlayGroundContext();
  const [compiledCode, setCompiledCode] = useState("");

  useEffect(() => {
    setCompiledCode(compile(files));
  }, [files]);

  // console.log("=====编译code======", compiledCode);

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
    <div className="h-full">
      <iframe src={iframUrl} className="w-full h-full"></iframe>
    </div>
  );
}
