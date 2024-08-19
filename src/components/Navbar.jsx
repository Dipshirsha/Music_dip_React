import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from './ContextApi/CreateContext';
import { auth } from "./config/firebase.config";

export default function Navbar() {

  const a = useContext(DataContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    try {
      await auth.signOut();
      a.setUserDetails(null);
      navigate("/");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="flex justify-between items-center text-lg bg-black text-gray-100 p-2 font-sans italic">
      <div className="flex items-center gap-7">
        <Link to="/" className="transition-transform duration-300 hover:rotate-6">
          <img
            className="rounded-md h-1/6 transition-transform duration-300 transform hover:scale-110"
            src="/music.jpg"
            alt="Logo"
            width="70px"
          />
        </Link>
        <div className="hidden md:flex gap-7">
          <Link to="/user/playlist" className="transition-transform duration-300 transform hover:translate-x-1 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md">My Libaries</Link>
          <Link to="/singer" className="transition-transform duration-300 transform hover:translate-x-1 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md">Artists</Link>
          <Link to="/playlist" className="transition-transform duration-300 flex gap-2 transform hover:translate-x-1 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md">
            <i className="bi bi-music-note-beamed"></i><p>My music</p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="transition-transform duration-300 transform hover:scale-110">
          {a.userDetails === null ? (
            <Link to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-badge-fill" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z" />
              </svg>
            </Link>
          ) : (
            <Link to="/dashboard" className="transition-transform duration-300">
              {a.userDetails == null ? (
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-badge-fill" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z" />
                  </svg>
                </div>
              ) : (
                <img
                  className="rounded-full h-1/6 transition-transform duration-300 transform hover:scale-110"
                  src={a.userDetails.photo}
                  alt="Profile"
                  width="40px"
                />
              )}
            </Link>
          )}
        </div>
        <div className="transition-transform duration-300 transform hover:scale-110">
          {a.userDetails === null ? (
            <Link to="/login" className="transition-transform duration-300">Login</Link>
          ) : (
            <button onClick={handleLogout} className="transition-transform duration-300 flex gap-2 transform hover:translate-x-1 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md">Logout</button>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="block md:hidden transition-transform duration-300 transform hover:rotate-90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className=" z-20   absolute top-16 left-0 right-0 bg-black text-gray-100 flex flex-col items-center p-4 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-slate-800 duration-300">
          <Link to="/user/playlist" className="transition-transform duration-300 transform hover:translate-x-1 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md">My Libaries</Link>
          <div className="mb-2 transition-transform duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md" onClick={() => setIsOpen(false)}>Artists</div>
          <Link to="/playlist" className="mb-2 transition-transform duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md" onClick={() => setIsOpen(false)}>Playlist</Link>
         
          <Link to="/playlist/all" className="transition-transform duration-300 transform hover:translate-x-1 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md"> Libaries</Link>
         <div className="mb-2 transition-transform duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:bg-gray-700 hover:text-white p-1 rounded-md">
            {a.userDetails === null ? (
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            ) : (
              <button onClick={() => { setIsOpen(false); handleLogout(); }}>Logout</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
