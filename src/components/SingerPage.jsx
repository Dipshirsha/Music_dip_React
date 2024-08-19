import React, { useContext, useEffect } from 'react'
import { DataContext } from './ContextApi/CreateContext'
import Singer from './Singer';




export default function SingerPage() {


  const a = useContext(DataContext);


  
  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {

        a.setArtistPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);


  return (
    <div className='bg-slate-900 h-screen '>
      <div className='flex flex-wrap items-center gap-3 p-3  '>
        {a.artist.map((data, index) => (



           <Singer 
           data={data}/>

        ))}
      </div>
    </div>
  )
}
