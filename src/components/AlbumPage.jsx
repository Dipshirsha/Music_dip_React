import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import Hitsong from './Hitsong';

export default function AlbumPage() {
  const a = useContext(DataContext);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [albumSongPage, setAlbumSongPage] = useState(1);

  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }


  const getSongData = useCallback(async () => {
    if (a.onClickAlbum && a.onClickAlbum.songs) {
      try {
        const response = await fetch(`https://backend-music-mern.onrender.com/fetchalbumsong`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: a.onClickAlbum.songs, page: albumSongPage }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          return;
        }
        const result = await response.json();
        setFilteredObjects((prevSongs) => [...prevSongs, ...result]);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    }
  }, [albumSongPage]);

  useEffect(() => {
    // Scroll to top when new data is fetched
    if (albumSongPage === 1) {
      window.scrollTo(0, 0);
    }
    getSongData();
  }, [getSongData, albumSongPage]);

  return (
    <div>
      {checkArrayEmpty(filteredObjects) ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-8 h-8 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-8 h-8 bg-yellow-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      ) : (
        <div className='bg-gray-900 text-white'>
          <div className='flex '>
            <div className='py-5 ml-5 md:py-10 md:mx-10 hidden md:block '>
              <img src={a.onClickAlbum.imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-full md:rounded-lg shadow-lg' />
            </div>
            <div className='py-10 md:py-12 w-screen font-sans italic'>
              <p className=' pl-2 text-3xl'>Songs of {a.onClickAlbum.name}</p>
              <p className='p-1 text-slate-400'>Based on all time</p>
              <div className='flex flex-col md:p-5 gap-5 '>
                {filteredObjects.map((obj) => (
                  <Hitsong
                    key={obj._id}
                    songid={obj._id}
                    data={obj}
                    song={filteredObjects}
                    userDetails={a.userDetails}
                  />
                ))}
              </div>
              <p onClick={() => { setAlbumSongPage((prev) => prev + 1); }} className='text-center cursor-pointer'>Load more</p>
            </div>
          </div>
          <div className='h-80'></div>
        </div>
      )}
    </div>
  );
}
