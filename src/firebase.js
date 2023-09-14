import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBl_PuNeSbKTXuwRLK4wS2Y71GcoK822C4",
    authDomain: "chattec-1b650.firebaseapp.com",
    projectId: "chattec-1b650",
    storageBucket: "chattec-1b650.appspot.com",
    messagingSenderId: "437528804788",
    appId: "1:437528804788:web:3873c4007167e33eccc6e1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();