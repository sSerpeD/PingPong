import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import auth from "../firebaseConfig.js"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user)=>{
          if(user){
            setIsAuthenticated(true);
            setuser(user);
          }else{
            setIsAuthenticated(false);
            setuser(null);
          }
        });
        return unsub;
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {success: true};
    } catch (err) {
      let msg = e.message;
      if(msg.includes('(auth/invalid-emial)')) msg="Invalid email"
      return {success: false, msg: e.message, error: e};
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

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
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
