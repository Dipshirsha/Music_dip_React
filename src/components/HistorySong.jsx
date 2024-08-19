import React,{useContext} from 'react'
import { DataContext } from './ContextApi/CreateContext';
import { Link } from 'react-router-dom';
export default function HistorySong(props) {



    
    const a= useContext(DataContext);



    const handleClick = () => {
      const dataOfperticularSong = { name: props.data.name, imgUrl: props.data.imgUrl, audioUrl: props.data.audioUrl };
      const newData = [dataOfperticularSong, ...props.song];
      const updatedPlays = props.data.plays + 1;
      a.played(props.songid,updatedPlays)
      a.setOnClickSong(newData);
    
    };
  

  

    const handlelikeRemove = () => {
      const updatedLikes = props.data.likes - 1;
      if (props.h){

      props.handleLikeRemove(props.data)
    }
      a.likeRemove(props.data._id, updatedLikes);
      
    };
  
  
  
    const handleArtist=()=>{
      a.setOnClickSinger(props.data.artistId);
  }
  
  
  


    return (
        <div className='flex items-center gap-2  border-b border-slate-200 font-sans italic p-3'>
          
          <img
            src={props.data.imgUrl}
            alt={props.data.name}
            className='w-20 h-20 object-cover rounded-md  cursor-pointer transform transition duration-300 hover:scale-105 shadow-lg'
            onClick={handleClick}
          />
         
            <div className='flex flex-col justify-between'>
              <h1 className=''>{props.data.name}</h1>

            </div>
    
           <Link to='/artist/page'><div>
           {props.data.artistName!==undefined?<div className='hidden mx-5 md:block' onClick={handleArtist}>Singer: {props.data.artistName}</div>: <div  className='hidden mx-5 md:block'>Singer: Unknown</div>}
           </div>
           </Link>
           
            <div className='cursor-pointer'>
            <i class="bi bi-heart-fill text-pink-800 " onClick={handlelikeRemove}></i> {props.data.likes}
            </div>
            
    
            <div className='hidden ml-5 md:block'>
           Type: {props.data.type[0]}
            </div>
    
         
        </div>
      );
}
