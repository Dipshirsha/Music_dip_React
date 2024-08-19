import React,{useContext,useCallback,useEffect,useState} from 'react'
import { DataContext } from './ContextApi/CreateContext';
import Folllowingsong from './Folllowingsong';
import Loading from './Loading'

export default function () {


    const [following, setFollowing] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



    const a= useContext(DataContext);


    const handleClick = () => {
      setPage((prev) => prev + 1);
    };


    const getFollowerData = useCallback(async () => {
        if (a.userDetails && a.userDetails.following) {
            try {
setLoading(true)
                const response = await fetch("https://backend-music-mern.onrender.com/fetchfollower", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({id:a.userDetails.following,page:page}),
                  });
          
                  if (!response.ok) {
                    const errorResult = await response.json();
                    console.log(errorResult.error);
                    return;
                  }
                  const result = await response.json();
            
           
                  setFollowing((prevArtist) => [...prevArtist, ...result]);
                  setLoading(false)
             
            } catch (error) {
              console.error('Error fetching following data:', error);
            }
          }
      }, [page]);
    
    
  
  
    
  
    function checkArrayEmpty(arr) {
      return arr.length === 0;
    }


    useEffect(() => {
        if (a.userDetails) {
         
            getFollowerData();
           
        }
      }, [ getFollowerData]); 
    
    
    
const handleFollowingRemove=(data)=>{
  const updatedFollowing= following.filter((item) => item !== data);
  setFollowing(updatedFollowing)
}










  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col'>
    {a.userDetails == null ? (
      <div className="flex items-center justify-center min-h-screen">
        <div>Log in first</div>
      </div>
    ) : checkArrayEmpty(following) ? (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
      No Singer has been followed by you
      </div>
    ) : (


      <div >

        <div className='flex '>
          
          <div className='py-10 md:py-12 w-screen'>
          <div className='ml-5 md:py-10 md:mx-10  '>
                <div className='flex items-center gap-10'>
                  <img src={following[0].imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-full shadow-lg ' />

                  <div>
                    <p className=' text-3xl font-sans italic underline'>My Followings</p>
                    <p className='p-1 text-slate-400'>Followed by {a.userDetails.name}</p>
                  </div>
                </div>



              </div>
            <div className='flex flex-col pt-5 md:p-5 gap-5 '> 
           {following.map((data) => (
          <Folllowingsong 
            key={data._id}
           
            data={data}
           
            userDetails={a.userDetails}
            handleFollowingRemove={handleFollowingRemove}
/*               handleDataFromPlaylistsong={handleDataFromPlaylistsong}
            handlePlaylistRemove={handlePlaylistRemove} // Ensure the correct prop name */
          />
        ))}</div>
          </div>

         
        </div>
        {
          loading&&  <Loading/>
        }
      
        <div className='text-center hover:text-blue-400 cursor-pointer' onClick={handleClick}>Load More</div>



      </div>
    )}

{/*       <div className="fixed bottom-0 w-full bg-slate-800 p-3">
      {a.onClickSong.length > 0 ? (
        <Song songData={a.onClickSong} />
      ) : (
        <Song  />
      )}
    </div> */}
  </div>
);
}
