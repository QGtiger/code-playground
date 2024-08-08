import classNames from "classnames";
import React from "react";

interface MyComponentProps {
  message: string;
  className?: string;
  onClose?: () => void;
}

const MessageError: React.FC<MyComponentProps> = ({
  message,
  className,
  onClose,
}) => {
  return (
    <div
      className={classNames(
        "border-2 border-red-600 bg-red-100 p-4 rounded-lg flex items-center text-sm",
        className
      )}
    >
      <div className="flex-grow text-red-600">{message}</div>
      <button className="ml-4 text-red-600" onClick={onClose}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageError;
