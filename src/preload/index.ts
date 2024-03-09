import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
const api = {
  openFile: (): Promise<string | undefined> => {
    return ipcRenderer.invoke("dialog:openFile");
  },
  fileExplorer: (): Promise<string[] | undefined> => {
    console.log("Preloading the contextBridge baby");
    return ipcRenderer.invoke("dialog:fileExplorer");
  },
  loadLib: (): Promise<JSON> => {
    console.log("This is from inside the loadLib preload api");
    return ipcRenderer.invoke("loadLib");
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
