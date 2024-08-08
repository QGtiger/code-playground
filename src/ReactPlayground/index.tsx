import { Allotment } from "allotment";

import "allotment/dist/style.css";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import { PlaygroundProvider } from "./PlaygroundContext";

export default function ReactPlayground() {
  return (
    <div className="h-[100vh] flex flex-col">
      <PlaygroundProvider>
        <Header />
        <Allotment defaultSizes={[100]}>
          <Allotment.Pane minSize={500}>
            <CodeEditor />
          </Allotment.Pane>
          <Allotment.Pane>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </PlaygroundProvider>
    </div>
  );
}
