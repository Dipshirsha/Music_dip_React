import React, { useState, useContext, useEffect, useCallback } from 'react';
import Hitsong from './Hitsong';
import { DataContext } from './ContextApi/CreateContext';

export default function ArtistPage() {
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [page, setPage] = useState(1);
  const a = useContext(DataContext);
  const [singer, setSinger] = useState({});

  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }



  const getSongData = useCallback(async () => {
    if (a.onClickSinger) {
      try {
        const responsear = await fetch(`https://backend-music-mern.onrender.com/fetchsinger`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: a.onClickSinger }),
        });
        const singerz = await responsear.json();
        setSinger(singerz)

        const response = await fetch(`https://backend-music-mern.onrender.com/fetchsingersong`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: singerz.songs, page: page }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          return;
        }
        const result = await response.json();
        setFilteredObjects((prevSongs) => [...prevSongs, ...result]);
        console.log(filteredObjects);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    }
  }, [ page]);

  useEffect(() => {

    getSongData();
  }, [a.onClickSinger, getSongData, page]);

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
              <img src={singer.imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-full md:rounded-lg shadow-lg' />
            </div>
            <div className='pl-2 py-10 md:py-12 w-screen font-sans italic'>
              <p className='text-3xl'>Songs of {singer.name}</p>
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
              <p onClick={()=>{  setPage((prev) => prev + 1);}} className='text-center cursor-pointer'>Load more</p>
            </div>
          </div>
          <div className='h-80'></div>
        </div>
      )}
    </div>
  );
}
