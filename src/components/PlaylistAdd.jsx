import React, { useState, useContext } from 'react';
import { DB } from "./config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DataContext } from './ContextApi/CreateContext';
import Search from './Search'
import CloseButton from 'react-bootstrap/CloseButton';
import Type from './Type';


export default function PlaylistAdd() {
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [isImgUpload, setIsImgUpload] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const a = useContext(DataContext);
    const [songsAll, setSongsAll] = useState([]);
    const [songs, setSongs] = useState([]);
    const [type, setType] = useState([]);
    const [language, setLanguage] = useState();


    const handleImageUpload = (e) => {
        setIsUploading(true);  // Set uploading state to true
        console.log(e.target.files[0]);
        const imgs = ref(DB, `Imgs/${v4()}`);
        uploadBytes(imgs, e.target.files[0]).then(data => {
            console.log(data, "imgs");
            getDownloadURL(data.ref).then(val => {
                setImg(val);
                setIsUploading(false);  // Set uploading state to false
            });
        });
    };

    function formatDateToMMDDYYYY(date) {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    const handleSearch = (data) => {
        songsAll.push(data)
        setSongsAll(songsAll)
        songs.push(data._id)
        setSongs(songs)
    }
    const handlePop = (data) => {
        const updatedsongsAll = songsAll.filter((item) => item !== data);
        setSongsAll(updatedsongsAll)
        const updatedSongs = songs.filter((item) => item !== data._id);
        setSongs(updatedSongs)
    }

    const handleSetType = (data) => {
        setType(data);
    }



    const handleClick = async () => {
        if (!img) {
            alert("Image is still uploading. Please wait.");
            return;
        }

        const date = new Date();
        const formattedDate = formatDateToMMDDYYYY(date);
        console.log(formattedDate); // "01/26/2024"

        try {
            const addPlaylist= { name: name, imgUrl: img, date: formattedDate,language:language,type:type,songs:songs };
            const response = await fetch("https://backend-music-mern.onrender.com/playlistcreate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addPlaylist),
            });

            if (!response.ok) {
                const errorResult = await response.json();
                console.log(errorResult.error);
                return;
            }
            const result = await response.json();
            console.log(result._id);

            a.playlist.push(result);
            a.setPlaylist(a.playlist);



            alert("Data added successfully");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Some technical issue occurred");
        }
    };





    return (
        <div className="bg-stone-900 min-h-screen p-4 md:p-8 text-white flex justify-center items-center">
            <div className="bg-stone-800 p-8 rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Create a New Playlist Profile</h2>
                <div className="flex flex-col space-y-4">
                    <label className="text-lg font-medium">Playlist Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className="shadow-md border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    />
                    <label className="text-lg font-medium">Image</label>
                    <div className="flex items-center mb-4">
                        <button
                            className={`px-4 py-2 rounded-md mr-4 ${isImgUpload ? 'bg-blue-500' : 'bg-gray-500'}`}
                            onClick={() => setIsImgUpload(true)}
                        >
                            Upload
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${!isImgUpload ? 'bg-blue-500' : 'bg-gray-500'}`}
                            onClick={() => setIsImgUpload(false)}
                        >
                            Link
                        </button>
                    </div>
                    {isImgUpload ? (
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="shadow-md border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                    ) : (
                        <input
                            type="text"
                            onChange={(e) => setImg(e.target.value)}
                            placeholder="Enter image URL"
                            className="shadow-md border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                    )}

                    <Type handleSetType={handleSetType} />



                    <label className="text-lg font-medium">Language</label>
                    <input
                        onChange={(e) => setLanguage(e.target.value)}
                        className="shadow-md border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    />


                    <Search playlist="playlist"
                        handleSearch={handleSearch} />

                    {songsAll.map((data, index) => (
                        <div key={index} className="flex gap-2">
                            <p>{data.name}<CloseButton onClick={() => handlePop(data)} variant="white" /></p>
                        </div>
                    ))}

                    <button
                        onClick={handleClick}
                        disabled={isUploading || !name || !img}
                        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                    >
                        {isUploading ? 'Uploading...' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    )
}
