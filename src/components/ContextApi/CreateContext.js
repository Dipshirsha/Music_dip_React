import React, { createContext, useState } from 'react';


const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [song, setSong] = useState([]);
  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);
  const [sadSong, setSadSong] = useState([]);
  const [partySong, setPartySong] = useState([]);
  const [romanceSong, setRomanceSong] = useState([]);
  const [onClickSong, setOnClickSong] = useState([]);
  const [onClickSinger, setOnClickSinger] = useState([]);
  const [hindiSong, setHindiSong] = useState([]);
  const [englishSong, setEnglishSong] = useState([]);
  const [bengaliSong, setBengaliSong] = useState([]);
  const [motivationalSong, setMotivationalSong] = useState([]);
  const [rockSong, setRockSong] = useState([]);
  const [filterSong, setFilterSong] = useState([]);
  const [onClickAlbum, setOnClickAlbum] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [lyrics, setLyrics] = useState([]);

  const [onClickPlaylist, setOnClickPlaylist] = useState('');



  const [page, setPage] = useState(1);
  const [artistPage, setArtistPage] = useState(1);
  const [albumPage, setAlbumPage] = useState(1);
  const [loading, setLoading] = useState(true);






  const updateUserDetails = (updatedFields) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedFields,
    }));
  };



  const playlistAdd = async (songid) => {
    if (userDetails && userDetails.playlist.indexOf(songid) === -1) {
      const updatedPlaylist = [...userDetails.playlist, songid];
      updateUserDetails({ playlist: updatedPlaylist });

      try {
        const updateData = { id: userDetails._id, playlist: updatedPlaylist };
        const response = await fetch("https://backend-music-mern.onrender.com/addremoveplaylist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          return;
        }
        alert("Song added to Playlist");
      } catch (e) {
        alert("Some technical issue occurred");
      }
    } else {
      alert("Song already present");
    }
  };

  const playlistRemove = async (data) => {
    if (userDetails) {
      const updatedPlaylist = userDetails.playlist.filter((item) => item !== data);
      updateUserDetails({ playlist: updatedPlaylist });

      try {
        const updateData = { id: userDetails._id, playlist: updatedPlaylist };
        const response = await fetch("https://backend-music-mern.onrender.com/addremoveplaylist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.log(errorResult.error);
          return;

        }

        
        alert("Song removed from Playlist");
      } catch (e) {
        alert('Some technical issue occurred');
      }
    } else {
      console.log('There is some technical issue');
    }
  };

  const likeAdd = async (data, likes) => {
    if (userDetails) {
      if (userDetails.liked.indexOf(data) === -1) {
        const updatedLikes = [...userDetails.liked, data];
        updateUserDetails({ liked: updatedLikes });

        try {
          const updateUserLikeData = { id: userDetails._id, liked: updatedLikes };
          const responseUser = await fetch("https://backend-music-mern.onrender.com/addremoveuserlike", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateUserLikeData),
          });

          if (!responseUser.ok) {
            const errorResult = await responseUser.json();
            console.log(errorResult.error);
            return;
          }

          const updateSongLikeData = { id: data, likes };
          const responseSong = await fetch("https://backend-music-mern.onrender.com/addremovesonglike", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateSongLikeData),
          });

          if (!responseSong.ok) {
            const errorResult = await responseSong.json();
            console.log(errorResult.error);
            return;
          }
         
          setSong(prevSongs => prevSongs.map(song => song._id === data ? { ...song, likes: likes } : song));
         
          alert("Song liked");
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







  const likeRemove = async (data, likes) => {
    if (userDetails) {
      const updatedLikes = userDetails.liked.filter((item) => item !== data);
      updateUserDetails({ liked: updatedLikes });

      try {
        const updateUserLikeData = { id: userDetails._id, liked: updatedLikes };
        const responseUser = await fetch("https://backend-music-mern.onrender.com/addremoveuserlike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUserLikeData),
        });

        if (!responseUser.ok) {
          const errorResult = await responseUser.json();
          console.log(errorResult.error);
          return;
        }

        const updateSongLikeData = { id: data, likes };
        const responseSong = await fetch("https://backend-music-mern.onrender.com/addremovesonglike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateSongLikeData),
        });

        if (!responseSong.ok) {
          const errorResult = await responseSong.json();
          console.log(errorResult.error);
          return;
        }

        setSong(prevSongs => prevSongs.map(song => song._id === data ? { ...song, likes: likes } : song));
        alert("Song like removed");
      } catch (e) {
        alert("Some technical issue occurred");
      }
    } else {
      alert("Log in first");
    }
  };



  const played = async (data, plays) => {
    if(userDetails){
    if (userDetails.playhistory.length<=10) {
    
        const updatedhistory = [...userDetails.playhistory, data];
        updateUserDetails({ playhistory: updatedhistory });

        try {
          const updateUserHistoryData = { id: userDetails._id, playhistory: updatedhistory };
          const responseUser = await fetch("https://backend-music-mern.onrender.com/updatehistory", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateUserHistoryData),
          });

          if (!responseUser.ok) {
            const errorResult = await responseUser.json();
            console.log(errorResult.error);
            return;
          }

          const updateSongPlayData = { id: data, plays };
          const responseSong = await fetch("https://backend-music-mern.onrender.com/updateplays", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateSongPlayData),
          });

          if (!responseSong.ok) {
            const errorResult = await responseSong.json();
            console.log(errorResult.error);
            return;
          }
         
          setSong(prevSongs => prevSongs.map(song => song._id === data ? { ...song, plays: plays } : song));
         
        } catch (e) {
          alert("Some technical issue occurred");
        }
      
    } else {
      // eslint-disable-next-line
    let x= userDetails.playhistory.shift();
    const updatedhistory = [...userDetails.playhistory, data];
    updateUserDetails({ playhistory: updatedhistory });

    try {
      const updateUserHistoryData = { id: userDetails._id, playhistory: updatedhistory };
      const responseUser = await fetch("https://backend-music-mern.onrender.com/updatehistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUserHistoryData),
      });

      if (!responseUser.ok) {
        const errorResult = await responseUser.json();
        console.log(errorResult.error);
        return;
      }

      const updateSongPlayData = { id: data, plays };
      const responseSong = await fetch("https://backend-music-mern.onrender.com/updateplays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateSongPlayData),
      });

      if (!responseSong.ok) {
        const errorResult = await responseSong.json();
        console.log(errorResult.error);
        return;
      }
     
      setSong(prevSongs => prevSongs.map(song => song._id === data ? { ...song, plays: plays } : song));
     
    } catch (e) {
      alert("Some technical issue occurred");
    }
  

    }
  }
  else{
    console.log("sign")
  }
  };


  const addfollowers = async (data, followers) => {
    if (userDetails) {
      if (userDetails.following.indexOf(data) === -1) {
        const updatedFollowing = [...userDetails.following, data];
        updateUserDetails({ following: updatedFollowing });

        try {
          const updateUserFollowingData = { id: userDetails._id, following: updatedFollowing };
          const responseUser = await fetch("https://backend-music-mern.onrender.com/updatefollowing", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateUserFollowingData),
          });

          if (!responseUser.ok) {
            const errorResult = await responseUser.json();
            console.log(errorResult.error);
            return;
          }

          const updateArtistFollowers = { id: data, followers };
          const responseArtist = await fetch("https://backend-music-mern.onrender.com/updatefollowers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateArtistFollowers),
          });

          if (!responseArtist.ok) {
            const errorResult = await responseArtist.json();
            console.log(errorResult.error);
            return;
          }
         
          setSong(prevArtists => prevArtists.map(artist => artist._id === data ? { ...artist, followers: followers } : artist));
         
          alert("Artist followerd");
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

  const removefollowers = async (data, followers) => {
    if (userDetails) {

      const updatedFollowing = userDetails.following.filter((item) => item !== data);



        updateUserDetails({ following: updatedFollowing });

        try {
          const updateUserFollowingData = { id: userDetails._id, following: updatedFollowing };
          const responseUser = await fetch("https://backend-music-mern.onrender.com/updatefollowing", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateUserFollowingData),
          });

          if (!responseUser.ok) {
            const errorResult = await responseUser.json();
            console.log(errorResult.error);
            return;
          }

          const updateArtistFollowers = { id: data, followers };
          const responseArtist = await fetch("https://backend-music-mern.onrender.com/updatefollowers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateArtistFollowers),
          });

          if (!responseArtist.ok) {
            const errorResult = await responseArtist.json();
            console.log(errorResult.error);
            return;
          }
         
          setSong(prevArtists => prevArtists.map(artist => artist._id === data ? { ...artist, followers: followers } : artist));
         
          alert("Artist unfollower");
        } catch (e) {
          alert("Some technical issue occurred");
        }
    
    } else {
      alert("Log in first");
    }
  };










  return (
    <DataContext.Provider value={{
      setUserDetails, userDetails, song, setSong, artist, setArtist,
      setRomanceSong, setPartySong, setSadSong, sadSong, romanceSong, partySong,
      onClickSong, setOnClickSong, playlistAdd, playlistRemove, likeAdd, likeRemove,setOnClickSinger,onClickSinger,album,setAlbum,hindiSong,
      setHindiSong,englishSong,setEnglishSong,bengaliSong,setBengaliSong,played,addfollowers,removefollowers,page,setPage,loading,setLoading,setMotivationalSong
      ,motivationalSong,rockSong,setRockSong,setFilterSong,filterSong,artistPage,setArtistPage,setOnClickAlbum,onClickAlbum,albumPage,setAlbumPage,playlist,setPlaylist,updateUserDetails,
      lyrics,setLyrics,onClickPlaylist,setOnClickPlaylist
    }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
