import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChtUVtdwoL6pGonxBpJvkVlkpBINByeBY",
  authDomain: "manusbolao.firebaseapp.com",
  projectId: "manusbolao",
  storageBucket: "manusbolao.firebasestorage.app",
  messagingSenderId: "880791287778",
  appId: "1:880791287778:web:d784d0f37cd760ffdc6bbb",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
