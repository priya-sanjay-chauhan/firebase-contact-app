// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDpV4gvOeDVc77Lbwg74hgFUYjRH4hMrI",
  authDomain: "vite-contact-d3748.firebaseapp.com",
  projectId: "vite-contact-d3748",
  storageBucket: "vite-contact-d3748.appspot.com",
  messagingSenderId: "772719818987",
  appId: "1:772719818987:web:13ac9526f3194fa6dc26ae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);