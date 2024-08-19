import React, { useContext, useEffect, useState, useCallback } from 'react'
import { DataContext } from './ContextApi/CreateContext'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import History from './History';
import Like from './Like';
import Following from './Following';
import Homesong from './Homesong'



export default function Dashnav(props) {


    const a = useContext(DataContext);

    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);



    const getPlaylistData = useCallback(async () => {
        if (a.userDetails && a.userDetails.added) {

            try {
                const response = await fetch(`https://backend-music-mern.onrender.com/fetchadded`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: a.userDetails.added, page: page }),
                });

                if (!response.ok) {
                    const errorResult = await response.json();
                    console.log(errorResult.error);

                    return;
                }
                const result = await response.json();


                setSongs((prev) => [...prev, ...result]);

                console.log(result)


            } catch (error) {
                console.error('Error fetching playlist data:', error);

            }
        }
    }, [page]);

    useEffect(() => {
        if (a.userDetails) {
            getPlaylistData();
        }
    }, [getPlaylistData, page]);



    return (
        <div className="bg-stone-800 p-4 rounded-lg shadow-md mb-4 ">


            <div className='pb-14 '>

                <div className='py-5 ml-5 md:py-10 md:mx-10 gap-2 md:gap-10 items-center flex'>
                    <img src={a.userDetails.photo} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-lg shadow-lg  md:p-4' />
                    <div className='md:text-5xl italic font-sans underline'>{a.userDetails.name}</div>


                </div>
                <div>Email: {a.userDetails.email}</div>

                <p className="text-gray-400 mt-2">Disclaimer: It's your dashboard where you can upload songs. Use the link below to create an artist profile...</p>

                <div>
                    <br />
                    <h1 className='text-2xl pl-4'>You Added</h1>
                    <p className="float-right mr-4 text-red-400 cursor-pointer" onClick={() => {
                        setPage((prev) => prev + 1); 
                    }}>More</p>
                    <div className="songs-container">
                        {songs.map((data, index) => (
                            <Homesong
                                key={data.id}
                                songid={data._id}
                                data={data}
                                song={a.song}
                                type="freshness"
                                fullMode={page}
                                index={index}
                            />
                        ))}
                    </div>
                </div>


            </div>


            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 text-white"
            >

                <Tab eventKey="History" title="History">
                    <History />
                </Tab>
                <Tab eventKey="Likes" title="Likes" >
                    <Like />
                </Tab>
                <Tab eventKey="Following" title="Following" >
                    <Following />
                </Tab>
            </Tabs>

        </div>

    )
}
