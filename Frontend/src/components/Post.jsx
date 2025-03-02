

import React, { useContext } from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { FaFaceGrin } from "react-icons/fa6";
import { UserContext } from "./UserContext";

export default function Post({ _id, title, summary, cover, createdAt, author, onDelete }) {
  const { userInfo } = useContext(UserContext);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/post/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        onDelete(_id); 
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="post">
      <div className="image1">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:8080/" + cover} alt=" " />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h3 className="post-title">{title}</h3>
        </Link>
        <p className="info">
          <div className="emoji-auth">
            <FaFaceGrin />
            <span className="author">{author.username}</span>
          </div>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>

        {userInfo?.username === author?.username && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
