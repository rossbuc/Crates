import { Howl, Howler } from "howler";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import musicIcon from "/Users/rossbuchan/personal_projects/Crates/src/renderer/src/assets/icons8-music-50.png";

const SongTile = ({ song, setPlayingSong }) => {
  return (
    <SongContainer data-testid="song">
      <img
        src={musicIcon}
        alt="Clickable Image"
        onClick={() =>
          setPlayingSong(
            new Howl({
              src: [song.songPath],
              onend: setPlayingSong(undefined),
            }),
          )
        }
        style={{
          height: "1.5rem",
          width: "auto",
        }}
      ></img>
      <h2 className="song-tile--title">{song.songMetaData.title}</h2>
      {/* <h2 className="song-tile--artist">{song.songMetaData.artists[0]}</h2> */}
      <h2 className="song-tile--album">{song.songMetaData.album}</h2>
    </SongContainer>
  );
};

export default SongTile;

const SongContainer = styled.div`
  display: flex;
  color: #ebe9f0a6;
  justify-content: space-between;
  gap: 1rem;
`;
