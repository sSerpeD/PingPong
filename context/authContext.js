import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig.js"
import {doc, getDoc, setDoc} from 'firebase/firestore'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => { 
        const unsub = onAuthStateChanged(auth, (user)=>{
          if(user){
            setIsAuthenticated(true);
            setUser(user);
            updateUserdata(user.uid);
          }else{
            setIsAuthenticated(false);
            setUser(null);
          }
        });
        return unsub;
  }, []);

  const updateUserdata = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      let data = docSnap.data();
      setUser({...user, username: data.username, imageUrl: data.imageUrl, userUd: data.userId})
    }
  }

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {success: true};
    } catch (err) {
      let msg = err.message;
      if(msg.includes('(auth/invalid-email)')) msg="อีเมลไม่ถูกต้อง"
      if(msg.includes('(auth/invalid-credential)')) msg="รหัสไม่ถูกต้อง"
      return {success: false, msg};
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return {success: true}
    } catch (err) {
      return {success: false, msg: e.message, error: e};
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      // setUser(response?.user);
      // setIsAuthenticated(true);

      await setDoc(doc(db, "users", response?.user?.uid),{
        username,
        profileUrl,
        userId: response?.user?.uid
      });
      return {success: true, data: response?.user};
    } catch (err) {
      let msg = err.message;
      if(msg.includes('(auth/invalid-email)')) msg='โปรดใส่อีเมลให้ถูกต้อง'
      if(msg.includes('(auth/email-already-in-use)')) msg='อีเมลนี้ถูกใช้ไปแล้ว!'
      return {success: false, msg};
    }
  };

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = ()=>{
  const value = useContext(AuthContext);

  if(!value){
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
}
