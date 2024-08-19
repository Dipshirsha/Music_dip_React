import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

export default function Search(props) {
  const [name, setName] = useState("");
  const [song, setSong] = useState([]);
  const [artist, setArtist] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const a = useContext(DataContext);


  useEffect(() => {
    const fetchSongs = async () => {
      if (name) {
        setLoading(true);
        try {
          const response = await fetch("https://backend-music-mern.onrender.com/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
          });

          if (!response.ok) {
            const errorResult = await response.json();
            console.error('Error fetching songs:', errorResult.error);
            return;
          }

          const result = await response.json();
          if (Array.isArray(result)) {
            const songs = result.filter(item => item.artistId);
            const artists = result.filter(item => item.age);
            setSong(songs);
            setArtist(artists);
            console.log('Fetched songs:', songs);
            console.log('Fetched artists:', artists);
          } else {
            console.error('Unexpected response format:', result);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSong([]);
        setArtist([]);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSongs();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [name]);

  useEffect(() => {
    const timeoutIds = [];
    const updatedItems = song.map((data, index) => {
      const shouldShow = getBool(data.name, name);
      if (shouldShow) {
        timeoutIds.push(setTimeout(() => {
          setVisibleItems(prevVisibleItems => [...prevVisibleItems, index]);
        }, 100 * index));
      }
      return shouldShow;
    });
    return () => {
      timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
      setVisibleItems([]);
    };
  }, [name, song]);

  function getBool(dataName, name) {
    if (!dataName || !name) {
      return false;
    }
    dataName = dataName.toLowerCase();
    name = name.toLowerCase();
    const pos = dataName.search(name);
    return pos >= 0 && name !== "";
  }

  const handleChange = (e) => {
    setName(e.target.value);
  };

  function handleClear() {
    setName("");
  }

  const handleClick = (data) => {
    const dataOfperticularSong = { ...data };
    a.setOnClickSong([dataOfperticularSong, ...song]);
    const updatedPlays = data.plays + 1;
    a.played(data._id, updatedPlays);
    if (props.playlist) {
      props.handleSearch(data);
    }
  };


  return (
    <div>
    <form action="" className='flex justify-center items-center gap-2 text-black'>
      <input
        className='w-96 md:h-10 text-xl text-center shadow-md rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        type="text"
        onChange={handleChange}
        placeholder="Search here"
        value={name}
      />
      <i className="bi bi-search text-white cursor-pointer md:text-3xl hover:text-red-700" onClick={() => handleClear()} ></i>
    </form>

    {loading && <div className="text-center my-4"><Spinner animation="border" variant="primary" /></div>}

    <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
      <div className="w-full md:w-1/2">
      {song.length!=0 && <h2 className="text-xl text-white text-center mb-4">Songs</h2>} 
        {song.map((data, index) => (
          <div key={index} className={`my-3 flex flex-row gap-4 justify-center items-center cursor-pointer transition-opacity duration-100 ${visibleItems.includes(index) ? 'opacity-100' : 'opacity-0'}`}>
            <img src={data.imgUrl} height='60px' width='50px' alt='' className='rounded-full' onClick={() => handleClick(data)} />
            <h1 className='text-sm md:text-lg text-gray-100' onClick={() => handleClick(data)}>{data.name}</h1>
            <p className='text-gray-500'> .Song</p>
            <Link to={`/example/${data._id}`}><i className="bi bi-box-arrow-right"></i></Link>
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/2">

        {artist.length!=0 &&<h2 className="text-xl text-white text-center mb-4">Artists</h2> }
        
        {artist.map((data, index) => (
          
          <Link key={index} to='/artist/page'>
            <div onClick={() => { a.setOnClickSinger(data._id) }} className={`my-3 flex flex-row gap-4 justify-center items-center cursor-pointer transition-opacity duration-100 ${visibleItems.includes(index) ? 'opacity-100' : 'opacity-0'}`}>
              <img src={data.imgUrl} height='60px' width='50px' alt='' className='rounded-full' />
              <h1 className='text-sm md:text-lg text-gray-100'>{data.name}</h1>
              <p className='text-gray-500'> .Artist</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
  );
}
