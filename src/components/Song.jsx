import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Song(props) {
  const music_list = props.songData || [];

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalDuration, setTotalDuration] = useState('00:00');
  const [seekPosition, setSeekPosition] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  const curr_track = useRef(new Audio());
  const updateTimer = useRef(null);

  useEffect(() => {
    if (music_list.length > 0) {
      loadTrack(trackIndex);
    }
    return () => {
      clearInterval(updateTimer.current);
      curr_track.current.pause();
      curr_track.current.currentTime = 0;
      curr_track.current.removeEventListener('canplaythrough', playTrack);
      curr_track.current.removeEventListener('ended', nextTrack);
    };
  }, [trackIndex, music_list]);

  useEffect(() => {
    if (music_list.length > 0) {
      setTrackIndex(0);
    }
  }, [music_list]);

  const loadTrack = (index) => {
    clearInterval(updateTimer.current);
    reset();

    curr_track.current.src = music_list[index].audioUrl;
    curr_track.current.load();

    curr_track.current.addEventListener('canplaythrough', playTrack);

    const name=music_list[index].name.split(" ")

    document.querySelector('.track-name').textContent = name[0]+"...";

    updateTimer.current = setInterval(setUpdate, 1000);

    curr_track.current.addEventListener('ended', nextTrack);
  };

  const reset = () => {
    setCurrentTime('00:00');
    setTotalDuration('00:00');
    setSeekPosition(0);
  };

  const randomTrack = () => {
    setIsRandom(!isRandom);
  };

  const playTrack = () => {
    curr_track.current.play().then(() => {
      setIsPlaying(true);
      document.querySelector('.track-art').classList.add('rotate');
      document.getElementById('wave').classList.add('loader');
      document.querySelector('.playpause-track').innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
    }).catch(error => {
      console.error("Error attempting to play track:", error);
    });
  };

  const pauseTrack = () => {
    curr_track.current.pause();
    setIsPlaying(false);
    document.querySelector('.track-art').classList.remove('rotate');
    document.getElementById('wave').classList.remove('loader');
    document.querySelector('.playpause-track').innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
  };

  const nextTrack = () => {
    curr_track.current.removeEventListener('canplaythrough', playTrack);
    if (trackIndex < music_list.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const prevTrack = () => {
    curr_track.current.removeEventListener('canplaythrough', playTrack);
    if (trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    } else {
      setTrackIndex(music_list.length - 1);
    }
  };

  const seekTo = (e) => {
    let seekto = curr_track.current.duration * (e.target.value / 100);
    curr_track.current.currentTime = seekto;
    setSeekPosition(e.target.value);
  };

  const setVolumeHandler = (e) => {
    curr_track.current.volume = e.target.value / 100;
    setVolume(e.target.value / 100);
  };

  const setUpdate = () => {
    if (!isNaN(curr_track.current.duration)) {
      let seekPosition = curr_track.current.currentTime * (100 / curr_track.current.duration);
      setSeekPosition(seekPosition);

      let currentMinutes = Math.floor(curr_track.current.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.current.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.current.duration / 60);
      let durationSeconds = Math.floor(curr_track.current.duration - durationMinutes * 60);

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      setCurrentTime(`${currentMinutes}:${currentSeconds}`);
      setTotalDuration(`${durationMinutes}:${durationSeconds}`);
    }
  };

  return (
    <div>
      <div className="seek bg-zinc-800">
        <input type="range" className="seek_slider w-full cursor-pointer" value={seekPosition} onChange={seekTo} />
      </div>
      <div className="player flex gap-10 justify-center items-center font-sans bg-zinc-800 text-indigo-100 w-screen pb-1 ">
        {music_list.length > 0 ? (
          <>
            <div className='flex justify-center  items-center'>
              <img className='track-art h-24 w-24 border-2 hidden md:block border-white rounded-full' src={music_list[trackIndex].imgUrl} alt="" />
            </div>
            <div className="track-name text-base sm:text-lg"></div>
            <div className="buttons flex gap-3">
              <button className="prev-track bg-none border-none text-inherit cursor-pointer" onClick={prevTrack}><i className="bi bi-chevron-left"></i></button>
              <button className="playpause-track bg-none border-none text-inherit cursor-pointer" onClick={isPlaying ? pauseTrack : playTrack}>
                <i className={`fa fa-${isPlaying ? 'pause' : 'play'}-circle fa-3x`}></i>
              </button>
              <button className="next-track bg-none border-none text-inherit cursor-pointer" onClick={nextTrack}><i className="bi bi-chevron-right"></i></button>
            </div>
            <div className="volume relative">
              <button onClick={() => setShowVolumePopup(!showVolumePopup)}>
                <i className="fa fa-volume-up fa-2x"></i>
              </button>
              {showVolumePopup && (
                <div className="volume-popup absolute bottom-10 right-0  bg-zinc-800 p-1 rounded-md shadow-lg">
                  <input type="range" className="volume_slider w-32 cursor-pointer bg-indigo-700" value={volume * 100} onChange={setVolumeHandler} />
                </div>
              )}
            </div>
            <div id="wave"></div>
            <i className={`fa fa-random ${isRandom ? 'text-red-600' : ''}`} onClick={randomTrack}></i>
            <div className="time-display hidden sm:block">{currentTime}</div>
            <div className="time-display hidden sm:block">{totalDuration}</div>
          </>
        ) : (
          <p>No song data available</p>
        )}
      </div>
    </div>
  );
}