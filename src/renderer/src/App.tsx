import React from "react";
import DataDisplay from "./components/DataDisplay";
import FileExplorer from "./components/FileExplorer";
import { useEffect, useState } from "react";
import styled from "styled-components";

function App(): JSX.Element {
  const [filePath, setFilePath] = useState<string>("");
  const [library, setLibrary] = useState<JSON | null>(null);

  useEffect(() => {
    loadLib();
  }, []);

  const loadLib = async (): Promise<void> => {
    const libData = await window.api.loadLib();
    console.log(Array.isArray(libData));
    console.log("The lib data, ", libData);
    setLibrary(libData);
  };
  return (
    <Conatainer>
      <FileExplorer />
      <DataDisplay library={library} />
    </Conatainer>
  );
}

const Conatainer = styled.div`
  background: #0a0010;
  width: 100vw;
  height: 100vh;
`;

export default App;
