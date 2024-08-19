import React, { useState, useEffect, useCallback, useContext } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import HistorySong from './HistorySong';

import 'react-lazy-load-image-component/src/effects/blur.css';

export default function History() {

  const [history, setHistory] = useState([]);


  const [page, setPage] = useState(1);



  const a = useContext(DataContext);




  const getHistoryData = useCallback(async () => {
    if (a.userDetails && a.userDetails.playhistory) {
      try {

        const response = await fetch("https://backend-music-mern.onrender.com/fetchhistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: a.userDetails.playhistory, page: page }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          return;
        }
        const result = await response.json();
        setHistory((prevSongs) => [...prevSongs, ...result]);

      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    }
  }, [page]);
  






  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }


  useEffect(() => {
    if (a.userDetails) {
      getHistoryData();
    }
  }, [getHistoryData]);



  const handleClick = () => {
    setPage((prev) => prev + 1);
  };






  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col'>
      {a.userDetails == null ? (
        <div className="flex items-center justify-center min-h-screen">
          <div>Log in first</div>
        </div>
      ) : checkArrayEmpty(history) ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
        No History is there
        </div>
      ) : (


        <div >

          <div className='flex '>

            <div className='py-10 md:py-12 w-screen'>
              <div className='ml-5 md:py-10 md:mx-10  '>
                <div className='flex items-center gap-10'>
                  <img src={history[0].imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-full shadow-lg ' />

                  <div>
                    <p className=' text-3xl font-sans italic underline'>My History</p>
                    <p className='p-1 text-slate-400'>Seen by {a.userDetails.name}</p>
                  </div>
                </div>



              </div>


              <div className='flex flex-col md:p-5 gap-5 pt-2 '>
                {history.map((data) => (
                  <HistorySong
                    key={data.id}
                    songid={data._id}
                    data={data}
                    song={history}
                    userDetails={a.userDetails}
                  /*               handleDataFromPlaylistsong={handleDataFromPlaylistsong}
                              handlePlaylistRemove={handlePlaylistRemove} // Ensure the correct prop name */
                  />
                ))}</div>
              <div className=' text-center transition-transform duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md cursor-pointer' onClick={handleClick}>Load More</div>
            </div>

          </div>



        </div>
      )}

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
