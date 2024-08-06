import reactLogo from "@/assets/react.svg";

export default function Header() {
  return (
    <div className="flex gap-2 items-center p-4 border-b">
      <img alt="logo" src={reactLogo} />
      <span>React Playground</span>
    </div>
  );
}
