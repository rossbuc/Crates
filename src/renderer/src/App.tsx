import React from "react";
import DataDisplay from "./components/DataDisplay";
import FileExplorer from "./components/FileExplorer";
import { useEffect, useState } from "react";

function App(): JSX.Element {
  const [filePath, setFilePath] = useState<string>("");
  const [library, setLibrary] = useState<JSON | null>(null);

  useEffect(() => {
    loadLib();
  }, []);

  const handleOnClick = async (): Promise<void> => {
    const newFilePath: string = await window.api.openFile();
    setFilePath(newFilePath);
  };

  const loadLib = async (): Promise<void> => {
    const libData = await window.api.loadLib();
    console.log(Array.isArray(libData));
    console.log("The lib data, ", libData);
    setLibrary(libData);
  };
  return (
    <>
      <button onClick={handleOnClick}>Upload a file</button>
      <h1>
        the file path is <strong>{filePath}</strong>
      </h1>
      <FileExplorer />

      <h1>JSON Data</h1>
      <DataDisplay library={library} />
    </>
  );
}

export default App;
