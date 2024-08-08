import { Files } from "./PlaygroundContext";
import { v4 as uuidV4 } from "uuid";
import { getLanguageByFileName } from "./utils";
import App from "./template/App.tsx?raw";
import Main from "./template/main.tsx?raw";
import ImportMapJson from "./template/import-map.json?raw";
import TailWindCompRaw from "./template/TailWindComp?raw";

export const App_uuid = uuidV4();
export const Main_uuid = uuidV4();
export const ImportMapJson_uuid = uuidV4();
export const TailWindComp_uuid = uuidV4();

export const initFiles: Files = {
  [Main_uuid]: {
    id: Main_uuid,
    name: "main.tsx",
    language: getLanguageByFileName("main.tsx"),
    value: Main,
    readOnly: true,
    buildIn: true,
  },
  [App_uuid]: {
    id: App_uuid,
    name: "App.tsx",
    language: getLanguageByFileName("App.tsx"),
    value: App,
    buildIn: true,
  },
  [TailWindComp_uuid]: {
    id: TailWindComp_uuid,
    name: "TailWindComp.tsx",
    value: TailWindCompRaw,
    language: getLanguageByFileName("TailWindComp.tsx"),
  },
  [ImportMapJson_uuid]: {
    id: ImportMapJson_uuid,
    name: "import-map.json",
    language: "json",
    value: ImportMapJson,
    fixedRight: true,
    buildIn: true,
  },
};
