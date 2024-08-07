import { Files } from "./PlaygroundContext";
import { v4 as uuidV4 } from "uuid";
import { getLanguageByFileName } from "./utils";
import App from "./template/App.tsx?raw";
import Main from "./template/main.tsx?raw";
import AppCss from "./template/App.css?raw";
import ImportMapJson from "./template/import-map.json?raw";

export const App_uuid = uuidV4();
export const Main_uuid = uuidV4();
export const AppCss_uuid = uuidV4();
export const ImportMapJson_uuid = uuidV4();

export const lodash_uuiid = uuidV4();

export const initFiles: Files = {
  [Main_uuid]: {
    id: Main_uuid,
    name: "main.tsx",
    language: getLanguageByFileName("main.tsx"),
    value: Main,
  },
  [App_uuid]: {
    id: App_uuid,
    name: "App.tsx",
    language: getLanguageByFileName("App.tsx"),
    value: App,
  },
  [AppCss_uuid]: {
    id: AppCss_uuid,
    name: "App.css",
    language: getLanguageByFileName("App.css"),
    value: AppCss,
  },
  [ImportMapJson_uuid]: {
    id: ImportMapJson_uuid,
    name: "import-map.json",
    language: "json",
    value: ImportMapJson,
  },
  [lodash_uuiid]: {
    id: lodash_uuiid,
    name: "lodash.ts",
    language: "typescript",
    value: `import lodash from 'lodash'`,
  },
};
