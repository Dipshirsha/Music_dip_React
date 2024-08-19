import React, { useContext } from 'react'
import { DataContext } from './ContextApi/CreateContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

export default function Hitsong(props) {



  const a = useContext(DataContext);


  const handleClick = () => {
    const dataOfperticularSong = {...props.data };
    const newData = [dataOfperticularSong, ...props.song];
    const updatedPlays = props.data.plays + 1;
    a.played(props.data._id, updatedPlays)
    a.setOnClickSong(newData);
    console.log(props.songid);
  };

   
  const handleArtist=()=>{
    a.setOnClickSinger(props.data.artistId);
}




  return (
    <div className='flex items-center gap-2 p-3 border-b border-slate-200 font-sans italic'>
      <span className='text-gray-400'>{props.song.indexOf(props.data) + 1}</span>


      <LazyLoadImage
        alt=""
        effect="blur"
        src={props.data.imgUrl}

        className='w-20 h-20 object-cover rounded-full md:rounded-md  cursor-pointer transform transition duration-300 hover:scale-105 shadow-lg'
        onClick={handleClick} // use normal <img> attributes as props
      />

      <div className='flex flex-col justify-between'>
        <h1 className=''>{props.data.name}</h1>
      </div>
<Link to='/artist/page'>
      <div>
        {props.data.artistName !== undefined ? <div className='hidden mx-5 md:block' onClick={handleArtist}>Singer: {props.data.artistName}</div> : <div className='hidden mx-5 md:block'>Singer: Unknown</div>}
      </div>
</Link>

      <div >
        <i class="bi bi-heart-fill text-pink-800 "></i> {props.data.likes}
      </div>

      <div className='hidden ml-5 md:block'>
        Type: {props.data.type[0]}
      </div>


    </div>
  )
}
