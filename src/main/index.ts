import { app, shell, BrowserWindow, ipcMain, dialog, Menu } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { stat, readdir, promises as fsPromises } from "fs";
import { ICommonTagsResult, IPicture } from "music-metadata";
import mm from "music-metadata";
import mainMenu from "./helpers/applicationMenu";

interface ISongData {
  songPath: string;
  songMetaData: ICommonTagsResult;
}

const handleFileOpen = async (): Promise<string | undefined> => {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
};

export const handleFileExplorer = async (): Promise<string[] | undefined> => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: [
      "openDirectory",
      "openFile",
      "multiSelections",
      "treatPackageAsDirectory",
    ],
  });

  if (!canceled) {
    console.log(filePaths);

    console.log("The timer has started at ");
    await parseInput(filePaths);
    console.log("The timer has finished at ");
    return filePaths;
  }
};

const parseInput = async (libInput: string[]): Promise<void> => {
  for (const filePath of libInput) {
    try {
      const stats = await fsPromises.stat(filePath);

      if (stats.isDirectory()) {
        await parseDir(filePath);
      } else {
        await parseFile(filePath);
      }
    } catch (error) {
      console.error(
        `Error processing file/directory ${filePath}:`,
        error.message,
      );
    }
  }
};

const parseDir = async (dirPath: string): Promise<void> => {
  try {
    const dirContents = await fsPromises.readdir(dirPath);

    for (const file of dirContents) {
      const filePath = join(dirPath, file);
      const fileStats = await fsPromises.stat(filePath);

      if (fileStats.isDirectory()) {
        await parseDir(filePath);
      } else {
        await parseFile(filePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }
};

const parseFile = async (filePath: string): Promise<void> => {
  console.log(`Now parsing this file ${filePath}`);

  try {
    const existingDataBuffer = await fsPromises.readFile(
      "/Users/rossbuchan/personal_projects/Crates/data.json",
      "utf8",
    );

    let existingData: ISongData[] = [];

    if (existingDataBuffer.length > 0) {
      existingData = JSON.parse(existingDataBuffer);
    }

    const metadata = await mm.parseFile(filePath);
    delete metadata.common.picture;

    const formattedData: ISongData = {
      songPath: filePath,
      songMetaData: metadata.common,
    };

    existingData.push(formattedData);

    await fsPromises.writeFile(
      "/Users/rossbuchan/personal_projects/Crates/data.json",
      JSON.stringify(existingData),
      { flag: "w" },
    );

    console.log(`The file at path ${filePath} was written successfully`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
  }
};

const loadLibrary = async (): Promise<JSON> => {
  const libData = await fsPromises.readFile(
    "/Users/rossbuchan/personal_projects/Crates/data.json",
    "utf8",
  );
  console.log(typeof libData);
  console.log("Lib data in he main prcess after the callback", libData);
  return JSON.parse(libData);
};

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  mainWindow.webContents.openDevTools();

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.handle("dialog:fileExplorer", handleFileExplorer);
  // ipcMain.handle("loadLib", loadLibrary)
  ipcMain.handle("loadLib", loadLibrary);

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
