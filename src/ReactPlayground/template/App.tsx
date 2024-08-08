import { useState } from "react";
import TailWindComp from "./TailWindComp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="text-3xl font-bold underline">Hello World</h1>
        <div className="card mt-2">
          <div
            onClick={() => setCount((count) => count + 1)}
            className="pointer-events-auto inline-block rounded-md px-4 py-2 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
          >
            count is {count}
          </div>
        </div>
      </div>
      <TailWindComp />
    </>
  );
}

export default App;
