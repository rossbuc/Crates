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
    try {
      const libData = await window.api.loadLib();
      console.log(Array.isArray(libData));
      // console.log("The lib data, ", libData);
      setLibrary(libData);
    } catch (err) {
      console.error("There was an error in fetching the lib data, ", err);
    }
  };
  return (
    <Conatainer>
      <TopContent>
        <Sidebar>
          <SideBarTop></SideBarTop>
          <SideBarBottom></SideBarBottom>
        </Sidebar>
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
  gap: 0.5vw;
`;

const ControlPanel = styled.div`
  height: 10vh;
`;

const MainDisplay = styled.div`
  width: 80vw;
  background-color: #160033;
  margin-top: 1vh;
  margin-right: 0.5vw;
  border-radius: 2.5vh;
  overflow: scroll;
`;

// PROBABLY GONIG TO WANT TO MAKE THESE JUST NORMAL COMPONENTS AS THEY WILL HAVE CONSISTENT FUNCTIONALITY
const SideBarTop = styled.div`
  margin-top: 1vh;
  margin-bottom: 0.5vh;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  background-color: #160033;
  height: calc(30% - 1vh);
  border-radius: 2.5vh;
`;

const SideBarBottom = styled.div`
  margin-top: 1vh;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  background-color: #160033;
  height: calc(70% - 1vh);
  border-radius: 2.5vh;
`;

export default App;
