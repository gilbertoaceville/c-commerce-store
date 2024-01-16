import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bluecube-commerce.firebaseapp.com",
  projectId: "bluecube-commerce",
  storageBucket: "bluecube-commerce.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const fireBaseApp = initializeApp(firebaseConfig);

export default fireBaseApp;
