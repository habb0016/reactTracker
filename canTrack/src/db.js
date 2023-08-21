import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8RwFWJs58hRGpqoi8UG-gSnZ5yJEJHNY",
  authDomain: "cantrack-ddc08.firebaseapp.com",
  projectId: "cantrack-ddc08",
  storageBucket: "cantrack-ddc08.appspot.com",
  messagingSenderId: "158204584591",
  appId: "1:158204584591:web:dfe49c458936253a7b06fa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;