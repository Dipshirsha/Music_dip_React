import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Hitsong from './Hitsong';
import { DataContext } from './ContextApi/CreateContext';

export default function PlaylistInner() {
    const [filteredObjects, setFilteredObjects] = useState([]);
    const [page, setPage] = useState(1);
    const a = useContext(DataContext);
    const [playlist, setPlaylist] = useState({});

    function checkArrayEmpty(arr) {
        return arr.length === 0;
    }

    const { id } = useParams();

    const forkAdd = async (data, fork) => {
        if (a.userDetails) {
            if (a.userDetails.forked.indexOf(data) === -1) {
                const updatedForkes = [...a.userDetails.forked, data];
                a.updateUserDetails({ forked: updatedForkes });

                try {
                    const updateUserforkData = { id: a.userDetails._id, forked: updatedForkes };
                    const responseUser = await fetch("https://backend-music-mern.onrender.com/addremoveuserfork", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updateUserforkData),
                    });

                    if (!responseUser.ok) {
                        const errorResult = await responseUser.json();
                        console.log(errorResult.error);
                        return;
                    }

                    const updateSongForkData = { id: data, forked: fork };
                    const responseSong = await fetch("https://backend-music-mern.onrender.com/addremovesongfork", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updateSongForkData),
                    });

                    if (!responseSong.ok) {
                        const errorResult = await responseSong.json();
                        console.log(errorResult.error);
                        return;
                    }
                    const resultz = await responseSong.json();
                    setPlaylist(resultz);

                    alert("Playlist forked");
                } catch (e) {
                    alert("Some technical issue occurred");
                }
            } else {
                alert("Song already liked");
            }
        } else {
            alert("Log in first");
        }
    };

    const forkRemove = async (data, fork) => {
        if (a.userDetails) {
            const updatedForkes = a.userDetails.forked.filter((item) => item !== data);
            a.updateUserDetails({ forked: updatedForkes });

            try {
                const updateUserforkData = { id: a.userDetails._id, forked: updatedForkes };
                const responseUser = await fetch("https://backend-music-mern.onrender.com/addremoveuserfork", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateUserforkData),
                });

                if (!responseUser.ok) {
                    const errorResult = await responseUser.json();
                    console.log(errorResult.error);
                    return;
                }

                const updateSongForkData = { id: data, forked: fork };
                const responseSong = await fetch("https://backend-music-mern.onrender.com/addremovesongfork", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateSongForkData),
                });

                if (!responseSong.ok) {
                    const errorResult = await responseSong.json();
                    console.log(errorResult.error);
                    return;
                }
                const resultz = await responseSong.json();
                setPlaylist(resultz);

                alert("Playlist unforked");
            } catch (e) {
                alert("Some technical issue occurred");
            }
        } else {
            alert("Log in first");
        }
    };

    const handleClick = () => {
        if (isForked) {
            const updateForks = playlist.forked - 1;
            forkRemove(playlist._id, updateForks);
        } else {
            const updateForks = playlist.forked + 1;
            forkAdd(playlist._id, updateForks);
        }
    };

    const getSongData = useCallback(async () => {
        try {
            const responsear = await fetch(`https://backend-music-mern.onrender.com/fetchplaylistid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });
            const playlistz = await responsear.json();
            setPlaylist(playlistz);
            console.log(playlistz);

            const response = await fetch(`https://backend-music-mern.onrender.com/fetchplaylistsong`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: playlistz.songs, page: page }),
            });

            if (!response.ok) {
                const errorResult = await response.json();
                console.log(errorResult.error);
                return;
            }
            const result = await response.json();
            setFilteredObjects((prevSongs) => [...prevSongs, ...result]);
            console.log(filteredObjects);
        } catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    }, [page, id]);

    useEffect(() => {
        getSongData();
    }, [a.onClickPlaylist, getSongData, page]);

    const isForked = a.userDetails?.forked?.includes(playlist._id);

    return (
        <div>
            {checkArrayEmpty(filteredObjects) ? (
                <div className="flex items-center justify-center min-h-screen bg-black text-white">
                    <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-8 h-8 bg-red-600 rounded-full animate-bounce"></div>
                        <div className="w-8 h-8 bg-yellow-600 rounded-full animate-bounce"></div>
                    </div>
                </div>
            ) : (
                <div className='bg-gray-900 text-white'>
                    <div className='flex'>
                        <div className='py-5 ml-5 md:py-10 md:mx-10 hidden md:block'>
                            <img src={playlist.imgUrl} alt="" className='w-20 h-20 md:w-40 md:h-40 rounded-full md:rounded-lg shadow-lg' />
                        </div>
                        <div className='pl-2 py-10 md:py-12 w-screen font-sans italic'>
                            <p className='text-3xl'>Songs of {playlist.name}</p>
                            <p className='p-1 text-slate-400'>Based on all time</p>
                            <li
                                onClick={handleClick}
                                className="px-4 py-2 text-sm text-gray-100 cursor-pointer hover:bg-gray-800 size-fit flex items-center"
                            >
                                <i className={`bi ${isForked ? 'bi-bookmark-plus-fill' : 'bi-plus-square'} mr-2`}></i>
                                {isForked ? 'In Playlist' : 'Add to Playlist'}
                            </li>
                            <div className='flex flex-col md:p-5 gap-5'>
                                {filteredObjects.map((obj) => (
                                    <Hitsong
                                        key={obj._id}
                                        songid={obj._id}
                                        data={obj}
                                        song={filteredObjects}
                                        userDetails={a.userDetails}
                                    />
                                ))}
                            </div>
                            <p onClick={() => setPage((prev) => prev + 1)} className='text-center cursor-pointer'>Load more</p>
                        </div>
                    </div>
                    <div className='h-80'></div>
                </div>
            )}
        </div>
    );
}
