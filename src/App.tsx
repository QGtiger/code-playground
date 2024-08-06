import { transform } from "@babel/standalone";
import { useRef, useState } from "react";
import ReactPlayground from "./ReactPlayground";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const transformCode = () => {
    if (!textareaRef.current) return;

    const res = transform(textareaRef.current.value, {
      presets: ["react", "typescript"],
      filename: "test.tsx",
    });

    console.log(res);
  };

  return <ReactPlayground />;
}

export default App;
