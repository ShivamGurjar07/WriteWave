import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import "./assets/pagination.css";
import { motion } from "framer-motion";
import "./assets/Home.css";
import { Link } from "react-router-dom";

export default function IndexPages() {
  const [posts, setPosts] = useState([]);
 const [searchTerm, setSearchTerm] = useState(""); 

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:8080/post")
      .then((res) => res.json())
      .then((posts) => setPosts(posts));
  }, []);



  


  const handleDeletePost = (deletedPostId) => {
    setPosts(posts.filter((post) => post._id !== deletedPostId));
  };
  const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);


  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div>
        <div className="home-container">
          {/* Hero Section */}
          <section className="hero">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to <span>WriteWave</span>
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Express, Share, and Inspire the World 🌍
            </motion.p>
            <Link to="/create">
              <button className="create-btnm">Start Writing 🚀</button>
            </Link>
          </section>

          {/* Why Blogging Section */}
          <section className="why-blogging">
            <h2>✨ Why Start Blogging?</h2>
            <p>
              Blogging isn't just about writing; it's about expressing yourself,
              building a community, and making an impact.
            </p>
            <ul>
              <li>
                📝 <strong>Self-Expression</strong> – Your blog, your voice!
              </li>
              <li>
                🌎 <strong>Connect with People</strong> – Share your ideas with
                the world.
              </li>
              <li>
                📚 <strong>Improve Writing Skills</strong> – The more you write,
                the better you get!
              </li>
              <li>
                🚀 <strong>Build Your Online Presence</strong> – Create your
                digital identity.
              </li>
            </ul>
          </section>

          {/* Featured Categories */}
          <section className="categories">
            <h2>🏆 Featured Categories</h2>
            <div className="category-grid">
              <Link to="/create">
                <button className="category">📖 Personal Stories</button>
              </Link>
              <Link to="/create">
                <button className="category">🎨 Creative Writing</button>
              </Link>
              <Link to="/create">
                <button className="category">🌍 Travel Blogs</button>
              </Link>
              <Link to="/create">
                <button className="category">💻 Tech Insights</button>
              </Link>
              <Link to="/create">
                <button className="category">💡 Motivational Thoughts</button>
              </Link>
              <Link to="/create">
                <button className="category">🍔 Food & Recipes</button>
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <section className="cta">
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              🚀 Join the Blogging Community!
            </motion.h2>
            <p>
              Your story could be the motivation someone needs today. Start
              writing now!
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cta-btn"
            >
              Get Started 📝
            </motion.button>
          </section>
        </div>
      </div>
      <div className="mainPage">
              <section className="search-section">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 Search by title..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); 
                }}
              />
              </section>
        <div className="postsContainer">
          {currentPosts.length > 0 &&
            currentPosts.map((post) => (
              <Post key={post._id} {...post} onDelete={handleDeletePost} />
            ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import Post from "./components/Post";
// import "./assets/pagination.css";
// import { motion } from "framer-motion";
// import "./assets/Home.css";
// import { Link } from "react-router-dom";

// export default function IndexPages() {
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // 🔹 Search State
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 8;

//   useEffect(() => {
//     fetch("http://localhost:8080/post")
//       .then((res) => res.json())
//       .then((posts) => setPosts(posts));
//   }, []);

//   const handleDeletePost = (deletedPostId) => {
//     setPosts(posts.filter((post) => post._id !== deletedPostId));
//   };

//   // 🔹 Filter posts based on search term
//   const filteredPosts = posts.filter((post) =>
//     post.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       <div className="home-container">
//         {/* Hero Section */}
//         <section className="hero">
//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             Welcome to <span>WriteWave</span>
//           </motion.h1>
//           <motion.p
//             className="hero-subtitle"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           >
//             Express, Share, and Inspire the World 🌍
//           </motion.p>
//           <Link to="/create">
//             <button className="create-btnm">Start Writing 🚀</button>
//           </Link>
//         </section>

        
// <hr />
//         <div className="mainPage">
//         <section className="search-section">
//           <input
//             type="text"
//             className="search-input"
//             placeholder="🔍 Search by title..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1); 
//             }}
//           />
//         </section>
//           <div className="postsContainer">
//             {currentPosts.length > 0 ? (
//               currentPosts.map((post) => (
//                 <Post key={post._id} {...post} onDelete={handleDeletePost} />
//               ))
//             ) : (
//               <p className="no-results">No posts found for "{searchTerm}"</p>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button onClick={prevPage} disabled={currentPage === 1}>
//                 Previous
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button onClick={nextPage} disabled={currentPage === totalPages}>
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
