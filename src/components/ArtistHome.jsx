import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './ContextApi/CreateContext';


export default function ArtistHome(props) {
  const a = useContext(DataContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    a.setOnClickSinger(props.data);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handlefolloweradd = () => {
    const updatedfollower = props.data.followers + 1;
    a.addfollowers(props.data._id, updatedfollower);
  }


  const handlefollowerRemove = () => {
    const updatedfollower = props.data.followers - 1;
    a.removefollowers(props.data._id, updatedfollower);
  }

  // Determine whether to render based on fullMode and index
  const shouldRender = props.index <= 5 + props.fullMode || props.index <= 5;
  const isfollowed = a.userDetails?.following?.includes(props.data._id);

  return (
    <div className="inline-block md:p-2 mr-2 cursor-pointer text-center">
      {shouldRender && (
        <div className="relative group">
          <Link to="/artist/page">
            <img
              src={props.data.imgUrl}
              alt=""
              className="w-42 h-36 sm:w-50 sm:h-55 md:w-42 md:h-36 lg:w-56 lg:h-48 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              onClick={handleClick}
            />
          </Link>
          <p className="mt-2 text-sm font-medium">{props.data.name}</p>
          <div className="absolute bottom-2 right-2">
            <i
              className={`${isfollowed ? 'bi bi-check-circle-fill' : 'fas fa-plus-circle'} text-xxl`}
              onClick={isfollowed ? handlefollowerRemove : handlefolloweradd}>
            </i>

          </div>
        </div>
      )}
    </div>
  );
}
