import React, { useState, useEffect, useCallback, useContext } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import Playlistsong from './Playlistsong';
import Loading from './Loading';

export default function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreSongs, setHasMoreSongs] = useState(true);

  const a = useContext(DataContext);

  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }


  const handlePlaylistRemove=(data)=>{
    const updatedPlaylist = playlist.filter((item) => item !== data);
    setPlaylist(updatedPlaylist)
  }





  const getPlaylistData = useCallback(async () => {
    if (a.userDetails && a.userDetails.playlist) {
      setIsLoading(true);
      try {
        const response = await fetch(`https://backend-music-mern.onrender.com/fetchplaylist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: a.userDetails.playlist, page: page }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          setIsLoading(false);
          return;
        }
        const result = await response.json();

        if (result.length === 0) {
          setHasMoreSongs(false);
        } else {
          setPlaylist((prevSongs) => [...prevSongs, ...result]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
        setIsLoading(false);
      }
    }
  }, [ page]);

  useEffect(() => {
    if (a.userDetails) {
      getPlaylistData();
    }
  }, [ getPlaylistData, page]);

  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col'>
      {a.userDetails == null ? (
        <div className="flex items-center justify-center min-h-screen">
          <div>Log in first</div>
        </div>
      ) : checkArrayEmpty(playlist) ? (
        <div className='text-center'>
          Wait for few seconds....No Sangs been added 
        </div>
      ) : (
        <div>
          <div className='flex'>
            <div className='py-5 ml-5 md:py-10 md:mx-10 hidden md:block '>
              <img src={playlist[0].imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-lg shadow-lg' />
            </div>

            <div className='py-10 md:py-12 w-screen'>
              <p className='text-3xl'>My Music</p>
              <p className='p-1 text-slate-400'>Made by {a.userDetails.name}</p>

              <div className='flex flex-col p-5 gap-5'>
                {playlist.map((data, index) => (
                  <Playlistsong
                    key={data._id} // Ensuring key uses _id for uniqueness
                    songid={data._id}
                    data={data}
                    index={index} // Adding index here
                    song={playlist}
                    userDetails={a.userDetails}
                    handlePlaylistRemove={handlePlaylistRemove}
                  />
                ))}
              </div>

              {isLoading ? (
                <Loading />
              ) : hasMoreSongs ? (
                <p onClick={() => setPage((prev) => prev + 1)} className='text-center cursor-pointer'>
                  Load More
                </p>
              ) : (
                <p className='text-center'>No more songs to load</p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className='h-80'></div>
      {/*       <div className="fixed bottom-0 w-full bg-slate-800 p-3">
        {a.onClickSong.length > 0 ? (
          <Song songData={a.onClickSong} />
        ) : (
          <Song  />
        )}
      </div> */}
    </div>
  );
}
