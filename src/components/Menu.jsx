import React, { useContext, useEffect, useState, useRef } from 'react';
import { DataContext } from './ContextApi/CreateContext';
import { Link } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';

export default function Menu() {
  const a = useContext(DataContext);
  const [menu, setMenu] = useState(false);
  const isFirstRender = useRef(true);



  const handleArtist = () => {
    a.setOnClickSinger(a.onClickSong[0].artistId);
    console.log(a.onClickSong[0].artistId)
  }


  useEffect(() => {
    if (a.onClickSong && a.onClickSong.length > 0) {
      if (!a.onClickSong[0].lyrics) {
        a.setLyrics(['None']);
      } else {
        const x = a.onClickSong[0].lyrics.split('\n');
        a.setLyrics(x);
      }
    }
  }, [a.onClickSong]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, [a.onClickSong[0]]);

  return (
    <div className='p-16 w-1/2 border-8 border-black bg-zinc-900 text-white hidden md:block font-sans italic'>
      {(!a.onClickSong.length || menu  ) ? (
        <div className='text-xl'>
          <p className='text-gray-400'>Browse</p>
          <br />
          <ul>
            <Link to='/playlist/all'><li>Top Playlist</li></Link>
            <Link to='/fresh'><li>New Releases</li></Link>
            <li>New Podcasts</li>
            <li>Stories</li>
          </ul>
          <br />
          <p className='text-gray-400'>My Library</p>
          <br />
          <ul>
            <Link to='/dashboard'><li>Recent History</li></Link>
            <Link to='/dashboard'><li>Liked</li></Link>
            <Link to='/dashboard'><li>Followed</li></Link>
          </ul>
          <br />
          <br />
          <p className='text-green-300 text-center p-4 border-solid border-4 border-green-300 size-fit rounded-3xl hover:bg-zinc-700 cursor-pointer'>Create playlist</p>
        </div>
      ) : (
        <div>

          {a.onClickSong && a.onClickSong.length > 0 && a.onClickSong[0].imgUrl ? (
          <div className='flex justify-between'>
            <img className='rounded-full w-1/2 border-4 border-solid border-gray-300' src={a.onClickSong[0].imgUrl} alt='' />
             <CloseButton onClick={() => setMenu (true)} variant="white" />
          </div>
          ) : null}

          <br />
          <br />
          {a.onClickSong && a.onClickSong.length > 0 ? (
            <>
              <p className='text-3xl underline'>{a.onClickSong[0].name}</p>
              <p className='text-gray-300 hover:text-red-800 cursor-pointer size-fit'>From {a.onClickSong[0].albumName}</p>

              <Link to='/artist/page'><p onClick={() => { handleArtist() }} className='text-gray-300 hover:text-red-800 cursor-pointer size-fit'>By {a.onClickSong[0].artistName}</p></Link>
              <p>Song: {a.onClickSong[0].plays} Plays. Language: {a.onClickSong[0].language}</p>
              <br />
              <h4 className='underline'>Song Lyrics</h4>
              <p>
                {a.lyrics.slice(0, 4).map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
                <Link to={`/example/${a.onClickSong[0]._id}`}>
                  <p className='text-gray-500 hover:text-red-700'>See More</p>
                </Link>
                <div className='h-[50px]'></div>
              </p>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
