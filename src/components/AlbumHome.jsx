import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { DataContext } from './ContextApi/CreateContext';



export default function AlbumHome(props) {

    const a=useContext(DataContext)

    const handleClick = () => {
        a.setOnClickAlbum(props.data);
      };
    
    const shouldRender = props.index <= 5 + props.fullMode || props.index <= 5;
   
  
    return (
      <div className="inline-block md:p-2 mr-2 cursor-pointer text-center">
        {shouldRender && (
          <div className="relative group">
            <Link to="/album/page">
              <img
                src={props.data.imgUrl}
                alt=""
                className="w-42 h-36 sm:w-50 sm:h-55 md:w-42 md:h-36 lg:w-56 lg:h-48 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                onClick={handleClick}
              />
            </Link>
            <p className="mt-2 text-sm font-medium">{props.data.name}</p>
            <div className="absolute bottom-2 right-2">
             
  
            </div>
          </div>
        )}
      </div>
    );
}
