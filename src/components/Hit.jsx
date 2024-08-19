import React, { useState, useEffect,useContext,useCallback } from 'react';
import Hitsong from './Hitsong';
import Song from './Song';
import { DataContext } from './ContextApi/CreateContext';

export default function Hit() {

    const [filteredMusic, setFilteredMusic] = useState([]);
    

    const a= useContext(DataContext);


    const [page, setPage] = useState(1);





    function checkArrayEmpty(arr) {
      return arr.length === 0;
    }
  
  
    const getFreshData = useCallback(async () => { 
        try {
  
  
          const response = await fetch(`https://backend-music-mern.onrender.com/top`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ page: page }),
          });
  
          if (!response.ok) {
            const errorResult = await response.json();
            console.log(errorResult.error);
            return;
          }
          const result = await response.json();
  
          setFilteredMusic((prevSongs) => [...prevSongs, ...result]);
  
         
        } catch (error) {
          console.error('Error fetching playlist data:', error);
        }
      
    }, [ page]);
  
  
    const handleClick=()=>{
      setPage((prev) => prev + 1)
    }
  
  
  
    useEffect(() => {
    
        getFreshData();
      
    }, [ getFreshData, page]);
  



      return (
        <div>
        {checkArrayEmpty(filteredMusic) ? (
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
            <div className='py-5 ml-5 md:py-10 md:mx-10 hidden md:block '><img src={filteredMusic[0].imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-lg shadow-lg' /></div>

            <div className='pl-4 py-10 md:py-12 w-screen font-sans italic'>
              <p className='text-3xl'>Top Rated Songs</p>
              <p className='p-1 text-slate-400'>Based on all time </p>


              <div className='flex flex-col md:p-5 gap-5 '> 
             {filteredMusic.map((data) => (
            <Hitsong 
            songid={data._id}
            data={data}
            song={filteredMusic}
            userDetails={a.userDetails}
           /*  handleDataFromHitsong={handleDataFromHitsong} */// Ensure the correct prop name
            />
          ))}</div>
          <p onClick={handleClick} className='text-center cursor-pointer' > Load More</p>
            </div>
          </div>
          <div className='h-80'>

</div>
{/* <div className="fixed bottom-0 w-full bg-slate-800 p-3">
  {a.onClickSong.length > 0 ? (
    <Song songData={a.onClickSong} />
  ) : (
    <Song />
  )}
</div> */}


        </div>
      )}
    </div>
      )
}
