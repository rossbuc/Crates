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
      <TopContent>
        <Sidebar></Sidebar>
        <MainDisplay>
          <DataDisplay library={library} />
        </MainDisplay>
      </TopContent>
      <ControlPanel></ControlPanel>
    </Conatainer>
  );
}

const Conatainer = styled.div`
  background: #0a0010;
  width: 100vw;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 20vw;
  height: 100%;
  flex-direction: column;
`;

const TopContent = styled.div`
  display: flex;
  height: 90vh;
`;

const ControlPanel = styled.div`
  height: 10vh;
`;

const MainDisplay = styled.div`
  width: 80vw;
`;

export default App;
