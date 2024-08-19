import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider, DataContext } from './components/ContextApi/CreateContext';
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ArtistCreation from "./components/ArtistCreation";
import { auth } from "./components/config/firebase.config";
import Playlist from "./components/Playlist";
import Hit from "./components/Hit";
import FreshArrival from "./components/FreshArrival";
import ArtistPage from "./components/ArtistPage";
import AlbumCreation from "./components/AlbumCreation";
import Song from "./components/Song";
import Trending from "./components/Trending";
import SingerPage from "./components/SingerPage";
import AlbumPage from "./components/AlbumPage";
import SongPage from "./components/SongPage";
import PlaylistCarousel from "./components/PlaylistCarousel";
import PlaylistInner from "./components/PlaylistInner";
import UserPlaylist from "./components/UserPlaylist";





import './App.css';

const AppContent = () => {
  const { setUserDetails,setSong,setArtist,setAlbum,onClickSong,page,loading,setPage,setLoading,artistPage,albumPage,setAlbumPage } = useContext(DataContext);









  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserDetails(null);
      } else {
        const userId = { fireBaseId: user.uid };
        const response = await fetch("https://backend-music-mern.onrender.com/userget", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userId),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          return;
        }
        const result = await response.json();
       const updatedresult={...result,photo:user.photoURL}
        setUserDetails(updatedresult);
      }
    });
  };



const getSongData=async()=>{
  const response = await fetch(`https://backend-music-mern.onrender.com/song?page=${page}`);
  const result = await response.json();

  

  console.log("result..", result);
  if (!response.ok) {
    console.log(result.error);
  }
  if (response.ok) {
    console.log(response.ok);
    setSong((prevSongs) => [...prevSongs, ...result]);
    setLoading(false);
  }
}



const getArtistData=async()=>{
  const response = await fetch(`https://backend-music-mern.onrender.com/artist?page=${artistPage}`);
  const result = await response.json();
  console.log("result..", result);
  if (!response.ok) {
    console.log(result.error);
  }
  if (response.ok) {
    console.log(response.ok);
    setArtist((prevSongs) => [...prevSongs, ...result]);
  }
}

const getAlbumData=async()=>{
  const response = await fetch(`https://backend-music-mern.onrender.com/album?page=${albumPage}`);
  const result = await response.json();
  console.log("result..", result);
  if (!response.ok) {
    console.log(result.error);
  }
  if (response.ok) {
    console.log(response.ok);
    setAlbum((prevSongs) => [...prevSongs, ...result]);
  }
}







  useEffect(() => {

    getSongData();
    
    // eslint-disable-next-line 

  }, [page]);


  useEffect(() => {
    
    fetchUserData();
   
  }, []);


  useEffect(() => {
    getArtistData();

  }, [artistPage]);


  useEffect(() => {
    getAlbumData();

  }, [albumPage]);




  






  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/artist/creation" element={<ArtistCreation />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/hitsong" element={<Hit />} />
        <Route path="/fresh" element={<FreshArrival />} />
        <Route path="/artist/page" element={<ArtistPage />} />
        <Route path="/album/creation" element={<AlbumCreation />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/singer" element={<SingerPage />} />
        <Route path="/album/page" element={<AlbumPage />} />
        <Route path="/example/:id" element={<SongPage />} />
        <Route path="/playlist/all" element={<PlaylistCarousel />} />
        <Route path="/playlist/:id" element={<PlaylistInner />} />
        <Route path="/user/playlist" element={<UserPlaylist />} />
      </Routes>

  
      
      <div className="fixed bottom-0">
            {onClickSong.length > 0 ? (
              <Song songData={onClickSong} />
            ) : (
              <Song />
            )}
          </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <DataProvider initialData={{ userDetails: null, setUserDetails: () => {} }}>
          <AppContent />
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
