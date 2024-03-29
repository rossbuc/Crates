import React from "react";
import { useState } from "react";

const FileExplorer = (): JSX.Element => {
  const [files, setFiles] = useState<[]>([]);

  //   const fileNodes: JSX.Element[] = files.map((file, index) => {
  //     return <li key={index}>{file}</li>
  //   })

  const handleButtonClick = async (): Promise<T> => {
    const newDir = await window.api.fileExplorer;
    console.log("This is what the api response looks like:", newDir);
    setFiles(newDir);
  };

  // console.log(files)
  return (
    <>
      <button onClick={handleButtonClick}>Select File</button>
      {/* <ul>{fileNodes}</ul> */}
    </>
  );
};

export default FileExplorer;
