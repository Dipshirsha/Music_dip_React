import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function SongPage() {
  const a = useContext(DataContext);
  const { id } = useParams();

  const [song, setSong] = useState({});

  const handleArtist = () => {
    a.setOnClickSinger(song.artistId);
  }

  const handlePlaylistAdd = async () => {
    a.playlistAdd(song._id);
  };

  const handleLikeAdd = () => {
    const updatedLikes = song.likes + 1;
    a.likeAdd(song._id, updatedLikes);
  };

  const handleLikeRemove = () => {
    const updatedLikes = song.likes - 1;
    a.likeRemove(song._id, updatedLikes);
  };

  const handlePlaylistRemove = () => {
    a.playlistRemove(song._id);
  };

  const isLiked = a.userDetails?.liked?.includes(song._id);
  const isInPlaylist = a.userDetails?.playlist?.includes(song._id);

  const getSongData = async () => {
    const response = await fetch("https://backend-music-mern.onrender.com/fetchsingle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      console.log(errorResult.error);
      return;
    }
    const result = await response.json();
    setSong(result);
    console.log(result.lyrics);
  }

  useEffect(() => {
    getSongData();
  }, [a.OnClickSong]);

  return (
    <div className='p-16 pb-44 w-screen border-8 h-full border-black bg-zinc-900 text-white font-sans italic'>
      <div>
        <div className='flex md:justify-start flex-wrap md:gap-20'>
          <img className='rounded-full md:w-1/6 w-56 border-4 border-solid border-gray-300' src={song.imgUrl} alt='' />

          <div>
            <p className='md:text-5xl text-3xl underline pt-10'>{song.name}</p>
            <br />
            <Link to='/artist/page'>
              <p onClick={handleArtist} className='text-gray-300 hover:text-red-800 cursor-pointer size-fit'>
                By {song.artistName}
              </p>
            </Link>
            <p className='text-gray-300 hover:text-red-800 cursor-pointer size-fit'>
              From {song.albumName}
            </p>
            <p>Song: {song.plays} Plays. Language: {song.language}</p>
            <div className='m-2 text-center flex items-center gap-3 md:gap-7'>
              <p className='text-green-500 text-2xl p-2 border-solid border-green-500 border-4 cursor-pointer rounded-2xl hover:bg-stone-700' onClick={() => a.setOnClickSong([song])}>
                <i className="bi bi-play-fill"></i> Play
              </p>
              <li
                onClick={isInPlaylist ? handlePlaylistRemove : handlePlaylistAdd}
                className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-gray-700 rounded-3xl flex items-center"
              >
                <i className={`bi ${isInPlaylist ? 'bi-bookmark-plus-fill' : 'bi-plus-square'} mr-2`}></i>
                {isInPlaylist ? 'In Playlist' : 'Add to Playlist'}
              </li>
              <li onClick={isLiked ? handleLikeRemove : handleLikeAdd} className="px-4 py-2 text-sm text-white cursor-pointer rounded-3xl hover:bg-gray-700 flex items-center">
                <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} mr-2`}></i>
                {isLiked ? 'Liked' : 'Like'}
              </li>
            </div>
            <br />
            <a href={song.audioUrl} className='p-2 bg-stone-600 rounded-xl hover:border-solid hover:border-green-600 hover:border-4 hover:text-white' download="audio.mp4">Download</a>
          </div>
        </div>
        <br />
        <h4 className='underline text-xl'>Song Lyrics</h4>
        <br />
        <Tabs defaultActiveKey="Lyrics" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="Details" title="Details">
            {song.type && <p>Type: {song.type[0]}</p>}
            Like- {song.likes}
          </Tab>
          <Tab eventKey="Lyrics" title="Lyrics">
            <p>
              {song.lyrics ? song.lyrics.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              )) : "Lyrics not available"}
            </p>
          </Tab>
        </Tabs>
        <div className='h-[100px]'></div>
      </div>
    </div>
  );
}
