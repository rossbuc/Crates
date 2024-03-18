import { app, Menu } from "electron";
import { handleFileExplorer } from "..";

const isMac: boolean = process.platform === "darwin";

const template = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }],
        },
      ]
    : []),
  {
    label: "File",
    submenu: [
      {
        label: "Open File",
        click: async () => {
          handleFileExplorer();
        },
      },
    ],
  },
  {
    label: "Edit",
    submenu: [{ role: "undo" }, { role: "redo" }],
  },
  {
    label: "View",
    submenu: [{ role: "reload" }],
  },
];

const mainMenu = Menu.buildFromTemplate(template);

export default mainMenu;
