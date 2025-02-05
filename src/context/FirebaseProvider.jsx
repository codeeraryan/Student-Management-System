import React, { createContext, useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://wallpaperslit-default-rtdb.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "wallpaperslit.firebasestorage.app",
  messagingSenderId: "973032564251",
  appId: "1:973032564251:web:ace21f578b141630ba7abe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);
export {db}

// Create a context
const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Signup function
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setLoading(true);
      return userCredential.user;
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    } 
  };

  // Login function
  const login = async (email, password) => {
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setLoading(true);
      return userCredential.user;
    } catch (error) {
      console.error('Login Error:', error);
      alert( error);
    } 
  };
  const logout = async () => {
      try {
     await signOut(auth); 
      setLoading(false);
    } catch (error) {
      console.error('Login Error:', error);
      alert( error);
    } 
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, login, signup,logout }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook for accessing the Firebase context
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
