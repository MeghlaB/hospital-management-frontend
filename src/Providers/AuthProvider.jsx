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
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const axiosPublic = UseAxiosPublic()
  const [user, setUser] = useState(null);
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
      if(currentUser){
        // get token 
        const userInfo = {email: currentUser?.email}
        console.log(userInfo)
        axiosPublic.post('/jwt',userInfo)
        .then(res =>{
          // console.log(res.data)
          if(res.data.token){
            
            localStorage.setItem('access-token',res.data.token)
          
          }
          setIsLoading(false);
        })

      }
      else{
        // get remove token 
        setIsLoading(false);
        localStorage.removeItem('access-token')
      }
      console.log("Cureent_User", currentUser);
      setIsLoading(false);
    });
    return () => Unsubscribe();
    
  }, [axiosPublic]);

  // useEffect(() => {

  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setIsLoading(false)
  //     if (currentUser) {

  //       setUser(currentUser);
  //       // get token and store client
  //       const userInfo = { email: currentUser.email }
  //       axiosPublic.post('/jwt', userInfo)
  //         .then(res => {
  //           // console.log(res.data)
  //           if (res.data.token) {
  //             setIsLoading(false)
  //             localStorage.setItem('access-token', res.data.token)
  //           }
  //         })
  //     }
  //     else {
  //       // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
  //       setIsLoading(false)
  //       localStorage.removeItem('access-token');
  //     }
  //     // console.log('Current User ==>', currentUser);
  //     setIsLoading(false)
  //   });

  //   // Cleanup function for onAuthStateChanged
  //   return () => unsubscribe();
  // }, [axiosPublic]);
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
    <AuthContext.Provider value={authInfo}>
    {isloading ? (
      <div className="fixed inset-0 flex justify-center items-center bg-accent bg-opacity-50">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    ) : (
      children
    )}
  </AuthContext.Provider>
  );
}

export default AuthProvider;
