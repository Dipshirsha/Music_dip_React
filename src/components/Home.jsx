import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import './Home.css';
import Homesong from './Homesong';
import Search from './Search';
import Carouselbox from './Carouselbox';
import ArtistHome from './ArtistHome';
import HomeLangSong from './HomeLangSong';
import Filter from './Filter';
import { FaFilter } from 'react-icons/fa';
import AlbumHome from './AlbumHome';
import Menu from './Menu';

export default function Home() {
  const [fullModeStates, setFullModeStates] = useState({});
  const [homePage, setHomePage] = useState(0);
  const [filters, setFilters] = useState({ type: '', language: '' });
  const [showFilter, setShowFilter] = useState(false); // State to control filter visibility
  

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setHomePage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);

    const response = await fetch(`https://backend-music-mern.onrender.com/filter-songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: filters.type, language: filters.language }),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      console.log(errorResult.error);
      return;
    }
    const result = await response.json();
    a.setFilterSong(result);
  };

  const a = useContext(DataContext);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  useEffect(() => {
    if (a.song && a.song.length > 0) {
      const filteredRomanceSongs = a.song.filter(song => song.type.some(type => type.toLowerCase() === 'romance'));
      a.setRomanceSong(filteredRomanceSongs);

      const filteredSadSongs = a.song.filter(song => song.type.some(type => type.toLowerCase() === 'sad'));
      a.setSadSong(filteredSadSongs);

      const filteredPartySongs = a.song.filter(song => song.type.some(type => type.toLowerCase() === 'party'));
      a.setPartySong(filteredPartySongs);

      const filteredEnglishSongs = a.song.filter(song => song.language.toLowerCase() === 'english');
      a.setEnglishSong(filteredEnglishSongs);

      const filteredHindiSongs = a.song.filter(song => song.language.toLowerCase() === 'hindi');
      a.setHindiSong(filteredHindiSongs);

      const filteredBengaliSongs = a.song.filter(song => song.language.toLowerCase() === 'bengali');
      a.setBengaliSong(filteredBengaliSongs);

      const filteredMotivationalSongs = a.song.filter(song => song.type.some(type => type.toLowerCase() === 'motivational'));
      a.setMotivationalSong(filteredMotivationalSongs);

      const filteredRockSongs = a.song.filter(song => song.type.some(type => type.toLowerCase() === 'rock'));
      a.setRockSong(filteredRockSongs);
    }
  }, [a.song]);

  const checkArrayEmpty = arr => arr.length === 0;

  const toggleFullMode = (type, lang) => {
    const key = `${type}-${lang}`;
    setFullModeStates(prevState => ({
      ...prevState,
      [key]: (prevState[key] || 0) + 2
    }));
  };

  const isFullMode = (type, lang) => fullModeStates[`${type}-${lang}`] || 0;

  return (
    <div className="home-wrapper">
      {checkArrayEmpty(a.song) ? (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-8 h-8 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-8 h-8 bg-yellow-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      ) : (
        <div >
          <div className='flex'>
            <Menu   />
            <div className="home-container bg-stone-900">
            
              <br />
              <Search song={a.song} />
              <br />
              <Carouselbox />
              <br />
              <div className="flex justify-end mr-4">
                <button onClick={() => setShowFilter(!showFilter)}>
                  <FaFilter className="text-2xl text-gray-700" />
                </button>
              </div>
              {showFilter && <Filter onFilterChange={handleFilterChange} />}
              {!checkArrayEmpty(a.filterSong) && (
                <div>
                  <h1 className='text-2xl pl-4'>User filtered Song</h1>
                  <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode(filters.type.toLowerCase(), ''); a.setPage((prev) => prev + 1); }}>More</p>
                  <div className="songs-container">
                    {a.filterSong.map((data, index) => (
                      <Homesong
                        key={data.id}
                        songid={data._id}
                        data={data}
                        song={a.song}
                        type={filters.type.toLowerCase()}
                        fullMode={isFullMode(filters.type.toLowerCase(), '')}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h1 className='text-2xl pl-4'>Sad Song</h1>
                <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('sad', ''); a.setPage((prev) => prev + 1); }}>More</p>
                <div className="songs-container">
                  {a.sadSong.map((data, index) => (
                    <Homesong
                      key={data.id}
                      songid={data._id}
                      data={data}
                      song={a.song}
                      type="sad"
                      fullMode={isFullMode('sad', '')}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h1 className='text-2xl pl-4'>Romantic Songs</h1>
                <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('romance', ''); a.setPage((prev) => prev + 1); }}>More</p>
                <div className="songs-container">
                  {a.romanceSong.map((data, index) => (
                    <Homesong
                      key={data.id}
                      songid={data._id}
                      data={data}
                      song={a.song}
                      type="romance"
                      fullMode={isFullMode('romance', '')}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h1 className='text-2xl pl-4'>Singers</h1>
                <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('artist', ''); a.setArtistPage((prev) => prev + 1); }}>More</p>
                <div className="songs-container">
                  {a.artist.map((data, index) => (
                    <ArtistHome
                      key={index}
                      data={data}
                      index={index}
                      fullMode={isFullMode('artist', '')}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h1 className='text-2xl pl-4'>Album</h1>
                <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('album', ''); a.setAlbumPage((prev) => prev + 1); }}>More</p>
                <div className="songs-container">
                  {a.album.map((data, index) => (
                    <AlbumHome
                      key={index}
                      data={data}
                      index={index}
                      fullMode={isFullMode('album', '')}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h1 className='text-2xl pl-4'>Party Song</h1>
                <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('party', ''); a.setPage((prev) => prev + 1); }}>More</p>
                <div className="songs-container">
                  {a.partySong.map((data, index) => (
                    <Homesong
                      key={data.id}
                      songid={data._id}
                      data={data}
                      song={a.song}
                      type="party"
                      fullMode={isFullMode('party', '')}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              {homePage >= 1 && (
                <div>
                  <h1 className='text-2xl pl-4'>Hindi Song</h1>
                  <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('', 'hindi'); a.setPage((prev) => prev + 1); }}>More</p>
                  <div className="songs-container">
                    {a.hindiSong.map((data, index) => (
                      <HomeLangSong
                        key={data.id}
                        songid={data._id}
                        data={data}
                        song={a.song}
                        lang="hindi"
                        fullMode={isFullMode('', 'hindi')}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              {homePage >= 2 && (
                <div>
                  <h1 className='text-2xl pl-4'>English Song</h1>
                  <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('', 'english'); a.setPage((prev) => prev + 1); }}>More</p>
                  <div className="songs-container">
                    {a.englishSong.map((data, index) => (
                      <HomeLangSong
                        key={data.id}
                        songid={data._id}
                        data={data}
                        song={a.song}
                        lang="english"
                        fullMode={isFullMode('', 'english')}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              {homePage >= 2 && (
                <div>
                  <h1 className='text-2xl pl-4'>Bengali Song</h1>
                  <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('', 'bengali'); a.setPage((prev) => prev + 1); }}>More</p>
                  <div className="songs-container">
                    
                    {a.bengaliSong.map((data, index) => (
                      <HomeLangSong
                        key={data.id}
                        songid={data._id}
                        data={data}
                        song={a.song}
                        lang="bengali"
                        fullMode={isFullMode('', 'bengali')}
                        index={index}
                      />
                    ))}
                    
                  </div>
                </div>
              )}
              {(homePage && checkArrayEmpty(a.rockSong)) >= 3 && (
                <div>
                  <h1 className='text-2xl pl-4'>Rock Song</h1>
                  <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('rock', ''); a.setPage((prev) => prev + 1); }}>More</p>
                  <div className="songs-container">
                    {a.rockSong.map((data, index) => (
                      <Homesong
                        key={data.id}
                        songid={data._id}
                        data={data}
                        song={a.song}
                        type="rock"
                        fullMode={isFullMode('rock', '')}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              {(homePage && checkArrayEmpty(a.motivationalSong)) >= 3 && (
                <div>
                  <h1 className='text-2xl pl-4'>Motivational Song</h1>
                  <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => { toggleFullMode('motivational', ''); a.setPage((prev) => prev + 1); }}>More</p>
                  <div className="songs-container">
                    {a.motivationalSong.map((data, index) => (
                      <Homesong
                        key={data.id}
                        songid={data._id}
                        data={data}
                        song={a.song}
                        type="motivational"
                        fullMode={isFullMode('motivational', '')}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="load-more-container">
                <p className="text-red-400 cursor-pointer" onClick={() => { a.setPage((prev) => prev + 1); setHomePage((prev) => prev + 1) }}>Load More</p>
                <div className='h-[100px]'></div>
              </div>

            </div>
          </div>


         
        </div>
      )}
    </div>
  );
}
