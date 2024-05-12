// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArwQIcjOqZ8CMGGSg638BmVt0jcBJa3WE",
  authDomain: "tofu-829a4.firebaseapp.com",
  databaseURL: "https://tofu-829a4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tofu-829a4",
  storageBucket: "tofu-829a4.appspot.com",
  messagingSenderId: "418178838978",
  appId: "1:418178838978:web:4c42fc2eaab6370025a65b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};