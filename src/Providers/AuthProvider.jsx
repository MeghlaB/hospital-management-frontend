import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase-init/firebase";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  // CreateUser
  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // user-SignIn user
  const signIn = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // user-logout
  const logOut = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  // updatephoto
  const updateUserprofile =(name,photo)=>{
    return updateProfile(auth.currentUser,{
      displayName:name ,photoURL:photo
    })

  }
  // Google_login
  const GoogleLogin =()=>{
    setIsLoading(true)
    return signInWithPopup(auth,provider)
  }

  // onAuthStateChanged
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Cureent_User", currentUser);
      setIsLoading(false);
    });
    return () => {
      return Unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    isloading,
    createUser,
    signIn,
    logOut,
    updateUserprofile ,
    GoogleLogin
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
