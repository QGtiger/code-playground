import { setupTypeAcquisition } from "@typescript/ata";
import typescriprt from "typescript";

export function createATA(
  onDownloadFile: (code: string, path: string) => void
) {
  const ata = setupTypeAcquisition({
    projectName: "My ATA Project",
    typescript: typescriprt,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        console.log("自动下载的包", code, path);
        onDownloadFile(code, path);
      },
      // started: () => {
      //   console.log("ATA start");
      // },
      // progress: (downloaded: number, total: number) => {
      //   console.log(`Got ${downloaded} out of ${total}`);
      // },
      // finished: (vfs) => {
      //   console.log("ATA done", vfs);
      // },
    },
  });

  return ata;
}
