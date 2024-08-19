import React,{useContext} from 'react'
import { DataContext } from './ContextApi/CreateContext';
import { Link } from 'react-router-dom';

export default function Singer(props) {

    const a=useContext(DataContext)

    const isfollowed = a.userDetails?.following?.includes(props.data._id);

    const handlefolloweradd = () => {
        const updatedfollower = props.data.followers + 1;
        a.addfollowers(props.data._id, updatedfollower);
      }
    
    
      const handlefollowerRemove = () => {
        const updatedfollower = props.data.followers - 1;
        a.removefollowers(props.data._id, updatedfollower);
      }

      const handleClick = () => {
        a.setOnClickSinger(props.data);
      };




    return (
        <div className='relative group'>
            <div className='text-center text-white'>
               <Link to='/artist/page' onClick={handleClick}><img src={props.data.imgUrl} alt="" className="w-42 h-36 sm:w-50 sm:h-55 md:w-42 md:h-36 lg:w-56 lg:h-48 rounded-full" /></Link> 
                <p>{props.data.name}</p>
                <div className="absolute bottom-2 right-2 cursor-pointer">
            <i
              className={`${isfollowed ? 'bi bi-check-circle-fill' : 'fas fa-plus-circle'} text-xxl`}
              onClick={isfollowed ? handlefollowerRemove : handlefolloweradd}>
            </i>

          </div>
            </div>
        </div>
    )
}
