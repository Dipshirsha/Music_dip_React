import React,{useContext} from 'react'
import { DataContext } from './ContextApi/CreateContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Playlistsong(props) {


    
  const a= useContext(DataContext);





  const handleClick = () => {
    const dataOfperticularSong = { name: props.data.name, imgUrl: props.data.imgUrl, audioUrl: props.data.audioUrl };
    const newData = [dataOfperticularSong, ...props.song];
    const updatedPlays = props.data.plays + 1;
    a.played(props.songid,updatedPlays)
    a.setOnClickSong(newData);
  
  };

  const handlePlaylist = () => {
    a.playlistRemove(props.songid);
props.handlePlaylistRemove(props.data)
    
  };










    return (
        <div className='flex items-center gap-2 p-4 border-b border-slate-200 font-sans italic'>
          <span className='text-gray-400'>{props.index + 1}</span>


               <LazyLoadImage
              alt=""
              effect="blur"
              src={props.data.imgUrl}
           
              className='w-20 h-20 object-cover rounded-full md:rounded-md  cursor-pointer transform transition duration-300 hover:scale-105 shadow-lg'
              onClick={handleClick} // use normal <img> attributes as props
            />
         
            <div className='flex flex-col justify-between'>
              <h1 className=''>{props.data.name}</h1>
              <div className='cursor-pointer text-red-500' onClick={handlePlaylist}>
                <i className="bi bi-dash-square text-2xl"></i>
              </div>
            </div>
    
           <div>
           {props.data.artistName!==undefined?<div className='hidden mx-5 md:block'>Singer: {props.data.artistName}</div>: <div  className='hidden mx-5 md:block'>Singer: Unknown</div>}
           </div>
           
           
            <div >
            <i class="bi bi-heart-fill text-pink-800 "></i> {props.data.likes}
            </div>
    
            <div className='hidden ml-5 md:block'>
           Type: {props.data.type[0]}
            </div>
    
         
        </div>
      );
}
