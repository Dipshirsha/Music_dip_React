import React, { useState, useEffect, useContext, useCallback } from 'react';
import Hitsong from './Hitsong';
import Song from './Song';
import { DataContext } from './ContextApi/CreateContext';
import Loading from './Loading';

export default function FreshArrival() {
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreSongs, setHasMoreSongs] = useState(true);

  const a = useContext(DataContext);

  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }

  const getFreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://backend-music-mern.onrender.com/fresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: page }),
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
        setFilteredMusic((prevSongs) => [...prevSongs, ...result]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching playlist data:', error);
      setIsLoading(false);
    }
  }, [page]);

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    getFreshData();
  }, [getFreshData, page]);

  return (
    <div>
      {checkArrayEmpty(filteredMusic) ? (
        <Loading />
      ) : (
        <div className='bg-gray-900 text-white'>
          <div className='flex'>
            <div className='py-5 ml-5 md:py-10 md:mx-10 hidden md:block'>
              <img src={filteredMusic[0].imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-lg shadow-lg' />
            </div>

            <div className='pl-4 py-10 md:py-12 w-screen font-sans italic'>
              <p className='text-3xl'> Fresh Arrivals</p>
              <p className='p-1 text-slate-400'>Based on all Recent </p>

              <div className='flex flex-col p-5 gap-5'>
                {filteredMusic.map((data) => (
                  <Hitsong 
                    key={data.id} // Ensuring key uses id for uniqueness
                    songid={data.id}
                    data={data}
                    song={filteredMusic}
                    userDetails={a.userDetails}
                  />
                ))}
              </div>

              {isLoading ? (
                <Loading />
              ) : hasMoreSongs ? (
                <p onClick={handleClick} className='text-center cursor-pointer'>Load more</p>
              ) : (
                <p className='text-center'>No more songs to load</p>
              )}
            </div>
          </div>
          <div className='h-80'></div>
          {/* <div className="fixed bottom-0 w-full bg-slate-800 p-3">
            {a.onClickSong.length > 0 ? (
              <Song songData={a.onClickSong} />
            ) : (
              <Song  />
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}
