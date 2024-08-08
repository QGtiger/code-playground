import reactLogo from "@/assets/react.svg";
import copy from "copy-to-clipboard";
import { downloadFiles } from "../../utils";
import { usePlayGroundContext } from "../../PlaygroundContext";

export default function Header() {
  const { files } = usePlayGroundContext();

  return (
    <div className="flex gap-2 items-center p-4 border-b justify-between">
      <div className="flex gap-2 items-center">
        <img alt="logo" src={reactLogo} />
        <span>React Playground</span>
      </div>
      <div className="right text-sm flex gap-2 items-center">
        <div
          className="copy-icon p-1 cursor-pointer"
          onClick={() => {
            copy(window.location.href);
            alert("链接复制成功");
          }}
        >
          <svg width="1.4em" height="1.4em" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <path d="M8.59 13.51l6.83 3.98"></path>
              <path d="M15.41 6.51l-6.82 3.98"></path>
            </g>
          </svg>
        </div>
        <div
          className=" p-1 cursor-pointer"
          onClick={() => {
            downloadFiles(files);
          }}
        >
          <svg
            width="1.7em"
            height="1.7em"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <g>
              <rect x="4" y="18" width="16" height="2" rx="1" ry="1"></rect>
              <rect
                x="3"
                y="17"
                width="4"
                height="2"
                rx="1"
                ry="1"
                transform="rotate(-90 5 18)"
              ></rect>
              <rect
                x="17"
                y="17"
                width="4"
                height="2"
                rx="1"
                ry="1"
                transform="rotate(-90 19 18)"
              ></rect>
              <path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39a1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z"></path>
              <path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
