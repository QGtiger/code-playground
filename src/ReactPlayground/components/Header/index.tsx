import reactLogo from "@/assets/react.svg";
import copy from "copy-to-clipboard";

export default function Header() {
  return (
    <div className="flex gap-2 items-center p-4 border-b justify-between">
      <div className="flex gap-2 items-center">
        <img alt="logo" src={reactLogo} />
        <span>React Playground</span>
      </div>
      <div className="right text-sm">
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <path d="M8.59 13.51l6.83 3.98"></path>
              <path d="M15.41 6.51l-6.82 3.98"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
