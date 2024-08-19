import React, { useContext, useEffect, useState, useCallback } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function UserPlaylist() {
  const [fork, setFork] = useState([]);
  const [page, setPage] = useState(1);
  const a = useContext(DataContext);

  const getLikedData = useCallback(async () => {
    if (a.userDetails && a.userDetails.forked) {
      try {
        const response = await fetch("https://backend-music-mern.onrender.com/fetchfork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: a.userDetails.forked, page: page }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          return;
        }
        const result = await response.json();
        setFork((prevSongs) => [...prevSongs, ...result]);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    }
  }, [page, a.userDetails]);

  useEffect(() => {
    if (a.userDetails) {
      getLikedData();
    }
  }, [page, a.userDetails]);

  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='bg-stone-900 min-h-screen flex flex-col'>
      {a.userDetails == null ? (
        <div className="flex items-center justify-center min-h-screen">
          <div>Log in first</div>
        </div>
      ) : checkArrayEmpty(fork) ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
          You haven't added any forked to any playlist
        </div>
      ) : (
        <div>
          <div className='flex'>
            <div className='py-10 md:py-12 w-screen'>
              <div className='ml-5 md:py-10 md:mx-10'>
                <div className='flex items-center gap-10'>
                  <img src={fork[0].imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-full shadow-lg' />
                  <div>
                    <p className='text-3xl font-sans italic underline text-white'>My Forked Playlist</p>
                    <p className='p-1 text-slate-400'>Liked by {a.userDetails.name}</p>
                    <i class="bi bi-box-arrow-right" className='text-white'></i>
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap justify-center md:justify-normal items-center gap-3 p-3'>
                {fork.map((data, index) => (
                  <div key={index}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={data.imgUrl} />
                      <Card.Body variant='danger'>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>
                          No of Songs {data.songs.length + 1}
                          <p>Song Type: {data.type[0].toUpperCase()}</p>
                        </Card.Text>
                        <Button variant="dark">
                          <Link onClick={() => { a.setOnClickPlaylist(data._id) }} to={`/playlist/${data._id}`}>
                            <p className='text-gray-100 hover:text-red-700'>{data.name}</p>
                          </Link>
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
              <div className='text-center hover:text-blue-400 cursor-pointer' onClick={handleClick}>Load More</div>
              <div onClick={()=>{setPage((prev)=>prev+1)}}>Load  More</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
