import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword,  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./config/firebase.config";

export default function Login() {

  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  
  async function submit(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      history("/");

    } catch (error) {
      console.log(error.message);
    
    }
  }

  const SignUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
// eslint-disable-next-line 
      const user = result.user;
      user.



      history("/");
    } catch (error) {
      console.log(error.message);
     
    }
  };



  return (
<div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={submit} className="space-y-4">
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
            Login
          </button>
        </form>
        <button
          onClick={SignUpWithGoogle}
          className="w-full mt-4 flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=893&height=600&name=image8-2.jpg"
            alt="Google icon"
            className="w-6 h-6 mr-2"
          />
          <span>Continue with Google</span>
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-500">OR</p>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register Page
          </Link>
        </div>
      </div>
    </div>
  )
}
