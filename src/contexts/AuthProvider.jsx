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
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create an account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign up with Gmail
  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Login using email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => {
    setLoading(true); // Start loading
    return signOut(auth)
      .then(() => {
        setUser(null); // Clear the user
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  // Update profile
  const updateuserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axios.post("http://127.0.0.1:8080/jwt", userInfo).then((response) => {
          console.log(response.data.token);
        });
      } else {
        setUser(null); // Clear user when logged out
      }
      setLoading(false); // End loading after state change
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    updateuserProfile,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
