import React, { useContext, useEffect, useState, useCallback } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import HistorySong from './HistorySong';

export default function Like(props) {
  const [likes, setLikes] = useState([]);
  const [page, setPage] = useState(1);

  const a = useContext(DataContext);

const handleLikeRemove=(data)=>{
  const updatedLikes = likes.filter((item) => item !== data);
  setLikes(updatedLikes)
}


  const getLikedData = useCallback(async () => {
    if (a.userDetails && a.userDetails.liked) {
      try {
        const response = await fetch("https://backend-music-mern.onrender.com/fetchliked", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: a.userDetails.liked, page: page }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          return;
        }
        const result = await response.json();
        setLikes((prevSongs) => [...prevSongs, ...result]);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    }
  }, [ page]);

  useEffect(() => {
    if (a.userDetails) {
      getLikedData();
    }
  }, [ getLikedData]);

  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col'>
      {a.userDetails == null ? (
        <div className="flex items-center justify-center min-h-screen">
          <div>Log in first</div>
        </div>
      ) : checkArrayEmpty(likes) ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
      You haven't added any like to any songs
        </div>
      ) : (
        <div>
          <div className='flex '>
            <div className='py-10 md:py-12 w-screen'>
            <div className='ml-5 md:py-10 md:mx-10  '>
                <div className='flex items-center gap-10'>
                  <img src={likes[0].imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-full shadow-lg ' />

                  <div>
                    <p className=' text-3xl font-sans italic underline'>My Likes</p>
                    <p className='p-1 text-slate-400'>Liked by {a.userDetails.name}</p>
                  </div>
                </div>



              </div>
              <div className='flex flex-col md:p-5 gap-5 '>
                {likes.map((data) => (
                  <HistorySong
                    key={data.id}
                    songid={data._id}
                    data={data}
                    song={likes}
                    userDetails={a.userDetails}
                    handleLikeRemove={handleLikeRemove}
                    h='hj'
                  />
                ))}
              </div>
              <div className='text-center hover:text-blue-400 cursor-pointer' onClick={handleClick}>Load More</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
