// import { createContext, useState } from "react";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [userInfo, setUserInfo] = useState({});
//   return (
//     <UserContext.Provider value={{ userInfo, setUserInfo }}>
//       {children}
//     </UserContext.Provider>
//   );
// }


import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/profile", { credentials: "include" })
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
