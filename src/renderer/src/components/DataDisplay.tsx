import { Howl, Howler } from "howler";
import React from "react";
import { useEffect, useState } from "react";
import SongTile from "./SongTile";
import musicIcon from "/Users/rossbuchan/personal_projects/Crates/src/renderer/src/assets/icons8-music-50.png";

const DataDisplay = ({ library }): JSX.Element => {
  const [playingSong, setPlayingSong] = useState<undefined | Howl>(undefined);
  useEffect(() => {
    playingSong ? playingSong.play() : console.log("playing song is undefined");
  }, [playingSong]);

  const handlePause = (): void => {
    playingSong ? playingSong.pause() : console.log("there is no song playing");
  };

  console.log(playingSong);
  console.log("The array is an array true/false, ", Array.isArray(library));

  const songNodes = library
    ? library.map((song, index) => (
        <SongTile key={index} song={song} setPlayingSong={setPlayingSong} />
      ))
    : "loading";

  // console.log(songNodes);
  return (
    <>
      <button onClick={handlePause}>Pause</button>
      {songNodes}
    </>
  );
};

// const handleSongPlay: void = (song) => {
//   // play the song
//   song.play()
// }

export default DataDisplay;
