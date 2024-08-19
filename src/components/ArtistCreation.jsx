import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DB } from "./config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DataContext } from './ContextApi/CreateContext';

export default function ArtistCreation() {
  const a = useContext(DataContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [img, setImg] = useState('');
  const [isImgUpload, setIsImgUpload] = useState(true);

  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    const imgRef = ref(DB, `Imgs/${v4()}`);
    uploadBytes(imgRef, e.target.files[0]).then(data => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then(val => {
        setImg(val);
      });
    });
  };

  function formatDateToMMDDYYYY(date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const handleClick = async () => {

    const date = new Date();
    const formattedDate = formatDateToMMDDYYYY(date);
    console.log(formattedDate); // "01/26/2024"




    const newArtist = {
      name: name,
      age: age,
      imgUrl: img,
      date:formattedDate,
    };

    const responseArtist = await fetch("https://backend-music-mern.onrender.com/addartist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArtist),
    });

    if (!responseArtist.ok) {
      const errorResult = await responseArtist.json();
      console.log(errorResult.error);
      return;
    }

    const resultArtist = await responseArtist.json();

    a.artist.push(resultArtist);
    a.setArtist(a.artist);

    alert("Artist added successfully");
    // Redirect to dashboard or another appropriate page
  };

  return (
    <div className="bg-stone-900 min-h-screen p-4 md:p-8 text-white">
      {a.userDetails == null ? (
        <p className="text-gray-100">Loading...</p>
      ) : (
        <div className=" mx-auto">


          <div className="bg-stone-800 p-8 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Add a New Artist</h2>
            <div className="flex flex-col space-y-4">
              <label className="text-lg font-medium">Artist Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="shadow-md border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
              <label className="text-lg font-medium">Age</label>
              <input   type='number'
                onChange={(e) => setAge(e.target.value)}
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
              <button
                onClick={handleClick}
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add Artist
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link to='/song/creation' className="text-blue-300 hover:underline">Song profile creation</Link>
          </div>
          <div className="mt-6 text-center">
            <Link to='/album/creation' className="text-blue-300 hover:underline">Album profile creation</Link>
          </div>
        </div>
      )}
    </div>
  );
}
