import React, { useState, useContext } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DataContext } from './ContextApi/CreateContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

export default function Homesong(props) {




  const a = useContext(DataContext);


  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    // Filter out songs where the type equals props.type
    const filteredSongs = props.song.filter(song => song.type.some(type => type.toLowerCase() === props.type.toLowerCase()));

    // Create a new song object with the necessary data
    const dataOfperticularSong = { ...props.data };

    // Add the new song to the beginning of the filtered list
    const newData = [dataOfperticularSong, ...filteredSongs];
    const updatedPlays = props.data.plays + 1;
    a.played(props.songid, updatedPlays)

    a.setOnClickSong(newData);
    console.log(props.songid);
  };

  const handlePlaylistAdd = async () => {
    a.playlistAdd(props.songid)
    setDropdownOpen(false);
  };






  const handleLikeAdd = () => {
    const updatedLikes = props.data.likes + 1;
    a.likeAdd(props.songid, updatedLikes)
    setDropdownOpen(false);
  };

  const handlelikeRemove = () => {
    const updatedLikes = props.data.likes - 1;

    a.likeRemove(props.songid, updatedLikes);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handlePlaylistremove = () => {
    a.playlistRemove(props.songid);
  };

  const isLiked = a.userDetails?.liked?.includes(props.songid);
  const isInPlaylist = a.userDetails?.playlist?.includes(props.songid);

  // Determine whether to render based on fullMode and index
  const shouldRender = props.index <= 5 + props.fullMode || props.index <= 7;

  return (
    <div className="inline-block  md:p-2 mr-2 cursor-pointer">
      {shouldRender && (
       (
          <div className="relative group">

            <LazyLoadImage
              alt=""
              effect="blur"
              src={props.data.imgUrl}
              className="w-42 h-36 sm:w-50 sm:h-55 md:w-42 md:h-36 lg:w-56 lg:h-48 rounded-md" // use normal <img> attributes as props
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="bi bi-play-circle text-white text-4xl" onClick={handleClick}></i>
            </div>
            <div className="flex gap-2 justify-center items-center sm:flex-col sm:gap-1">
              <h1 className="text-sm sm:text-md">{props.data.name}</h1>
              <div className="relative">
                <i className="bi bi-three-dots text-xl cursor-pointer" onClick={toggleDropdown}></i>
                {isDropdownOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li
                        onClick={isInPlaylist ? handlePlaylistremove : handlePlaylistAdd}
                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center"
                      >
                        <i className={`bi ${isInPlaylist ? 'bi-bookmark-plus-fill' : 'bi-plus-square'} mr-2`}></i>
                        {isInPlaylist ? 'In Playlist' : 'Add to Playlist'}
                      </li>
                      <li onClick={isLiked ? handlelikeRemove : handleLikeAdd} className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center">
                        <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} mr-2`}></i>
                        {isLiked ? 'Liked' : 'Like'}
                      </li>
                      <Link to={`/example/${props.data._id}`}><li className='px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center'>
                        Open Song Page
                      </li></Link>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}