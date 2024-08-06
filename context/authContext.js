import { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
        setIsAuthenticated(false);
  }, []);

  const login = async (email, password) => {
    try {
    } catch (err) {}
  };

  const logout = async () => {
    try {
    } catch (err) {}
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
