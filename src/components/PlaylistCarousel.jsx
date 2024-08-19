
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function PlaylistCarousel() {

  const a = useContext(DataContext)

  const [playlistAll, setPlaylistAll] = useState([]);
  const [page, setPage] = useState(1);


  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);




  const getSongData = async () => {
    const response = await fetch(`https://backend-music-mern.onrender.com/playlistload?page=${page}`);
    const result = await response.json();



    console.log("result..", result);
    if (!response.ok) {
      console.log(result.error);
    }
    if (response.ok) {
      console.log(response.ok);
      setPlaylistAll((prevSongs) => [...prevSongs, ...result]);

    }
  }

  useEffect(() => {

    getSongData();

    // eslint-disable-next-line 

  }, [page]);




  return (
    <div className='bg-stone-900  h-full'>
      <div className='flex flex-wrap justify-center md:justify-normal items-center gap-3 p-3  '>
        {playlistAll.map((data, index) => (

          <div>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={data.imgUrl} />
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>
                  No of Songs {data.songs.length + 1}
                  <p>Song Type: {data.type ? data.type[0] : "Unknown"}</p>
                </Card.Text>

                <Button variant="dark"><Link onClick={() => { a.setOnClickPlaylist(data._id) }} to={`/playlist/${data._id}`}>
                  <p className='text-gray-100 hover:text-red-700'>{data.name}</p>
                </Link></Button>
              </Card.Body>
            </Card>

          </div>





        ))}
      </div>
      <div className='h-[100px]'></div>
    </div>
  )
}
