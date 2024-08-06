// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtOdhQZD-cOF9XDpGYShYK9ij3eeXMHZ4",
  authDomain: "pingpong-d3d8c.firebaseapp.com",
  projectId: "pingpong-d3d8c",
  storageBucket: "pingpong-d3d8c.appspot.com",
  messagingSenderId: "834539480648",
  appId: "1:834539480648:web:4ad8b87d74896d22539a7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);
export const userRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');