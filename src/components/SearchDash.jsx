import React, { useState, useEffect } from 'react';

export default function SearchDash(props) {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [visibleItems, setVisibleItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSearchResults(name);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name]);

  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`https://backend-music-mern.onrender.com/searchdashartist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        console.error('Failed to fetch search results');
        return;
      }
      const results = await response.json();
      setSearchResults(results);

      // Reset visible items
      setVisibleItems([]);

      // Set visible items with fade-in effect
      const timeoutIds = [];
      results.forEach((_, index) => {
        timeoutIds.push(setTimeout(() => {
          setVisibleItems(prevVisibleItems => [...prevVisibleItems, index]);
        }, 100 * index));
      });

      return () => {
        timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
      };
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleClick = (data) => {
    props.handleSetArtistId(data._id);
    setArtist(data.name);
    props.handleSetArtistName(data.name);
  };

  return (
    <div>
      <form action="" className='flex justify-center items-center gap-2 text-black'>
        <input
          className='w-96 text-center shadow-md shadow-gray-100 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          type="text"
          onChange={(e) => { setName(e.target.value) }}
          placeholder="Search here"
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </form>

      {searchResults.map((data, index) => (
        <div key={index}>
          <div
            className={`my-3 flex flex-row gap-2 justify-center items-center cursor-pointer transition-opacity duration-500 ${visibleItems.includes(index) ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => handleClick(data)}
          >
            <img src={data.imgUrl} height='60px' width='60px' alt='' className='rounded-full' />
            <h1 className='text-lg text-white'>{data.name}</h1>
          </div>
        </div>
      ))}
      {artist}
    </div>
  );
}
