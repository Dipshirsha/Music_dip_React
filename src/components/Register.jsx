import React, { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase.config";
import { DataContext } from "./ContextApi/CreateContext";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const history = useNavigate();


  const a=useContext(DataContext);

  async function submit(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
  
      const addUser = { name:name, email:email,photo:"photo",fireBaseId:user.uid};

      const response = await fetch("https://backend-music-mern.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.log(errorResult.error);
        return;
      }

      const result = await response.json();
      a.setUserDetails(result);

      console.log(result);

      setName("");
      setEmail("");
      setPassword("");

      history("/");
      console.log("User Registered Successfully!!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-500">OR</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}
