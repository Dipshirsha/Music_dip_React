import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDWQc3SGo4b_2EzLaO9o72crjLOz3lDTE",
  authDomain: "mern-21050.firebaseapp.com",
  projectId: "mern-21050",
  storageBucket: "mern-21050.appspot.com",
  messagingSenderId: "113891904195",
  appId: "1:113891904195:web:2695182dcd6c78605f3076"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB = getStorage(app)

 const auth=getAuth();

export {DB,auth};