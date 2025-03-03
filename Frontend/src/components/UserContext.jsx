
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch("https://writewave-5o94.onrender.com/profile", { 
    // credentials: "include" 
    })
      .then((res) => res.json())
      .then((userData) => {
        setUserInfo(userData);
      })
      .catch(() => setUserInfo(null));
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
