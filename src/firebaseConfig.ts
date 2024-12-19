import { initializeApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

// Defining the type for the firebaseConfig
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY!,
  authDomain: process.env.REACT_APP_AUTHDOMAIN!,
  databaseURL: process.env.REACT_APP_DATABASEURL!,
  projectId: process.env.REACT_APP_PROJECTID!,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET!,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID!,
  appId: process.env.REACT_APP_APPID!,
  measurementId: process.env.REACT_APP_MEASUREMENTID!,
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

export const database: Firestore = getFirestore();
export const db: Database = getDatabase(app); // Initializing the Realtime Database
export const storage: FirebaseStorage = getStorage(app); // Initializing Firebase Storage
