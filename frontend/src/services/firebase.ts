import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0ysIb4QKvKtaF1RoR8qvRl-EgoSqlNAo",
  authDomain: "picure-base.firebaseapp.com",
  projectId: "picure-base",
  storageBucket: "picure-base.appspot.com",
  messagingSenderId: "513875428965",
  appId: "1:513875428965:web:b1749e49a013dfb224288c",
  measurementId: "G-S0P6YB35KQ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
