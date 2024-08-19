import React,{useContext} from 'react'
import { DataContext } from './ContextApi/CreateContext';
import { Link } from 'react-router-dom';



export default function Folllowingsong(props) {


    const a = useContext(DataContext);


    const handleClick=()=>{
        a.setOnClickSinger(props.data);
    }

    const handleFollowerRemove=()=>{
        const updatedfollower = props.data.followers - 1;
        a.removefollowers(props.data._id, updatedfollower);
        props.handleFollowingRemove(props.data)
    }



return(
<div className='flex items-center gap-2 p-3 border-b border-slate-200 font-sans italic'>
          <Link to="/artist/page">
          <img
            src={props.data.imgUrl}
            alt={props.data.name}
            className='w-20 h-20 object-cover rounded-full md:rounded-md  cursor-pointer transform transition duration-300 hover:scale-105 shadow-lg'
            onClick={handleClick}
          />
          
          
          </Link>

         
            <div className='flex flex-col justify-between'>
              <h1 className=''>{props.data.name}</h1>
             
            </div>
    

           
            <div className='cursor-pointer'>
            <i class="bi bi-heart-fill text-pink-800 " onClick={handleFollowerRemove}></i> {props.data.followers}
            </div>
    
     
    
         
        </div>
      );
}
