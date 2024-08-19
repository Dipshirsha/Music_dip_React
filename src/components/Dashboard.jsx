import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DB } from "./config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DataContext } from './ContextApi/CreateContext';
import SearchDash from './SearchDash';
import Type from './Type';
import Dashnav from './Dashnav';
import SearchAlbumDash from './SearchAlbumDash';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ArtistCreation from './ArtistCreation'
import AlbumCreation from './AlbumCreation'
import PlaylistAdd from './PlaylistAdd';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


export default function Dashboard() {
  const a = useContext(DataContext);

  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [audio, setAudio] = useState('');
  const [type, setType] = useState([]);
  const [language, setLanguage] = useState('');
  const [isImgUpload, setIsImgUpload] = useState(true);
  const [isAudioUpload, setIsAudioUpload] = useState(true);
  const [artistName, setArtistName] = useState('');
  const [artistId, setArtistId] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleAudioUpload = (e) => {
    console.log(e.target.files[0]);
    const audioRef = ref(DB, `Audio/${v4()}`);
    uploadBytes(audioRef, e.target.files[0]).then(data => {
      console.log(data, "audio");
      getDownloadURL(data.ref).then(val => {
        setAudio(val);
      });
    });
  };

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

  const handleSetArtistId = (data) => {
    setArtistId(data);
  }

  const handleSetArtistName = (data) => {
    setArtistName(data);
  }
  const handleSetAlbumId = (data) => {
    setAlbumId(data);
  }

  const handleSetAlbumName = (data) => {
    setAlbumName(data);
  }
  const handleSetType = (data) => {
    setType(data);
  }


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



    const addSong = {
      name: name, type: type, imgUrl: img, audioUrl: audio, language: language, date: formattedDate, artistId: artistId, artistName: artistName, albumName: albumName,
      albumId: albumId,lyrics:lyrics
    };
    const responseSong = await fetch("https://backend-music-mern.onrender.com/addsong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addSong),
    });

    if (!responseSong.ok) {
      const errorResult = await responseSong.json();
      console.log(errorResult.error);
      return;
    }





    const resultSong = await responseSong.json();



    a.song.push(resultSong);
    a.setSong(a.song);



    alert("data added successfully");




    const updatedSongsForArtist = [...(a.artist.find(ar => ar._id === artistId)?.songs || []), resultSong._id];
    const updateArtist = { id: artistId, songs: updatedSongsForArtist }

    const responseArtist = await fetch("https://backend-music-mern.onrender.com/updateartist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateArtist),
    });

    if (!responseArtist.ok) {
      const errorResult = await responseArtist.json();
      console.log(errorResult.error);
      return;
    }

    /*     const resultArtist = await responseArtist.json(); */

    a.setArtist(prevArtist => prevArtist.map(artistData =>
      artistData._id === artistId ? { ...artistData, songs: updatedSongsForArtist } : artistData
    ));

    const updatedSongsForAlbum = [...(a.album.find(ar => ar._id === albumId)?.songs || []), resultSong._id];
    const updateAlbum = { id: albumId, songs: updatedSongsForAlbum }

    const responseAlbum = await fetch("https://backend-music-mern.onrender.com/updatealbum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateAlbum),
    });

    if (!responseAlbum.ok) {
      const errorResult = await responseAlbum.json();
      console.log(errorResult.error);
      return;
    }

    /*  const resultAlbum = await responseAlbum.json(); */


    a.setAlbum(prevAlbum => prevAlbum.map(albumData =>
      albumData._id === albumId ? { ...albumData, songs: updatedSongsForAlbum } : albumData
    )


    );


    const updatedadded = [...a.userDetails.added, resultSong._id];


    try {
      const updateData = { id: a.userDetails._id, added: updatedadded };
      const responseadd = await fetch("https://backend-music-mern.onrender.com/added", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!responseadd.ok) {
        const errorResult = await responseadd.json();
        console.log(errorResult.error);
        return;
      }
      a.updateUserDetails({ added: updatedadded });
     
    } catch (e) {
      alert("Some technical issue occurred");
    }





  };

  return (
    <div className="bg-stone-900 min-h-screen  md:p-8 text-white">
      {a.userDetails == null ? (
        <p className="text-gray-100">Loading...</p>
      ) : (
        <div className=" mx-auto">

          <Dashnav />

          <div className="bg-stone-800  rounded-lg shadow-md  ">
            <Tabs
              defaultActiveKey="Song"
              id="uncontrolled-tab-example"
              className="mb-3 text-white"
            >
              <Tab eventKey="Song" title="Song">
                <div className="bg-stone-800 p-8 rounded-lg shadow-lg w-full">
                  <h2 className="text-2xl font-bold mb-6 text-center">Add a New Song</h2>
                  <div className="flex flex-col space-y-4">
                    <label className="text-lg font-medium">Song Name</label>
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
                    <label className="text-lg font-medium">Audio</label>
                    <div className="flex items-center mb-4">
                      <button
                        className={`px-4 py-2 rounded-md mr-4 ${isAudioUpload ? 'bg-blue-500' : 'bg-gray-500'}`}
                        onClick={() => setIsAudioUpload(true)}
                      >
                        Upload
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md ${!isAudioUpload ? 'bg-blue-500' : 'bg-gray-500'}`}
                        onClick={() => setIsAudioUpload(false)}
                      >
                        Link
                      </button>
                    </div>
                    {isAudioUpload ? (
                      <input
                        type="file"
                        onChange={handleAudioUpload}
                        className="shadow-md border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                      />
                    ) : (
                      <input
                        type="text"
                        onChange={(e) => setAudio(e.target.value)}
                        placeholder="Enter audio URL"
                        className="shadow-md border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                      />
                    )}
                    <label className="text-lg font-medium">Type</label>

                    <Type handleSetType={handleSetType} />



                    <label className="text-lg font-medium">Language</label>
                    <input
                      onChange={(e) => setLanguage(e.target.value)}
                      className="shadow-md border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    />

                    <label className="text-lg font-medium">Artist</label>
                    <SearchDash artists={a.artist || []} handleSetArtistId={handleSetArtistId} handleSetArtistName={handleSetArtistName} />
                    <label className="text-lg font-medium">Album</label>
                    <SearchAlbumDash artists={a.album || []} handleSetArtistId={handleSetAlbumId} handleSetArtistName={handleSetAlbumName} />
                    <FloatingLabel controlId="floatingTextarea2" label="Lyrics">
                     
                      <Form.Control
                        as="textarea"
                        placeholder="Lyrics"
                        style={{ height: '100px' }}
                        onChange={(e) => setLyrics(e.target.value)}
                      />
                    </FloatingLabel>


                    <button
                      onClick={handleClick}
                      className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Artist" title="Artist">
                <ArtistCreation />
              </Tab>
              <Tab eventKey="Album" title="Album" >
                <AlbumCreation />
              </Tab>
              <Tab eventKey="playlist" title="Playlist" >
                <PlaylistAdd />
              </Tab>

            </Tabs>

          </div>


        </div>
      )}

      <div className='h-80'>

      </div>


    </div>
  );
}
