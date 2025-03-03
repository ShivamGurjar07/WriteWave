// import React, { useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "./UserContext";
// import { useTheme } from "./ThemeContext";
// import { FaSun, FaMoon } from "react-icons/fa";
// import "../assets/header.css";

// const Header = () => {
//   const { setUserInfo, userInfo } = useContext(UserContext);
//   const { theme, toggleTheme } = useTheme();

//   useEffect(() => {
//     fetch("http://localhost:8080/profile", { credentials: "include" })
//       .then((res) => res.json())
//       .then((userInfo) => {
//         if (!userInfo.error) {
//           setUserInfo(userInfo);
//         }
//       })
//       .catch((err) => console.log("Error fetching profile:", err));
//   }, []);

//   function logout() {
//     fetch("http://localhost:8080/logout", {
//       credentials: "include",
//       method: "POST",
//     })
//       .then(() => {
//         setUserInfo(null);
//       })
//       .catch((err) => console.log("Error logging out:", err));
//   }

//   const username = userInfo?.username;

//   return (
//     <header className="navbar">
//       <Link to="/" className="logo">
//         WriteWave
//       </Link>
//       <Link to="/trending" className="trending-link">
//         Trending Blogs
//       </Link>{" "}
//       <nav>
//         {username ? (
//           <div className="nav-links">
//             <span className="welcome">Hello, {username}</span>
//             <Link to="/create">
//               <button className="create-btn">+ Create Post</button>
//             </Link>
//             <button className="logout-btn" onClick={logout}>
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="nav-links">
//             <Link to="/register" className="auth-link">
//               Register
//             </Link>
//             <Link to="/login" className="auth-link">
//               Login
//             </Link>
//           </div>
//         )}

//         <button className="theme-toggle-btn" onClick={toggleTheme}>
//           {theme === "light" ? <FaMoon /> : <FaSun />}
//         </button>
//       </nav>
//     </header>
//   );
// };

// export default Header;



import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useTheme } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { PiMoonLight } from "react-icons/pi";

import "../assets/header.css";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://writewave-5o94.onrender.com/profile", {
          credentials: "include",
        });
        const data = await res.json();
        if (!data.error) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUser();
  }, [setUserInfo]); 

  const logout = async () => {
    try {
      await fetch("https://writewave-5o94.onrender.com/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const username = userInfo?.username;

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        WriteWave
      </Link>
      <Link to="/trending" className="trending-link">
        Trending Blogs
      </Link>
      <nav className="nav">
        {username ? (
          <div className="nav-links">
            <span className="welcome">Hello, {username}</span>
            <Link to="/create">
              <button className="create-btn">+ Create Post</button>
            </Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/register" className="auth-link">
              Register
            </Link>
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </div>
        )}

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? /*<FaMoon />*/<PiMoonLight /> : <FaSun />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
