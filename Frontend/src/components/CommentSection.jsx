import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";



export default function CommentSection({ postId }) {
  const { userInfo } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetch(`https://writewave-5o94.onrender.com/comments/${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [postId]);
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const res = await fetch(`https://writewave-5o94.onrender.com/comments/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: newComment }),
    });

    if (res.ok) {
      const newAddedComment = await res.json();
      setComments([...comments, newAddedComment]);
      setNewComment("");
    }
  };

  const handleReply = async (parentCommentId) => {
    if (!replyContent.trim()) return;

    const res = await fetch(`https://writewave-5o94.onrender.com/comments/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: replyContent, parentComment: parentCommentId }),
    });

    if (res.ok) {
      const newReply = await res.json();
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === parentCommentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
      setReplyingTo(null);
      setReplyContent("");
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editingComment.content.trim()) return;

    const res = await fetch(`https://writewave-5o94.onrender.com/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: editingComment.content }),
    });

    if (res.ok) {
      setComments(comments.map((c) => (c._id === commentId ? { ...c, content: editingComment.content } : c)));
      setEditingComment(null);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const res = await fetch(`https://writewave-5o94.onrender.com/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setComments(comments.filter((c) => c._id !== commentId));
    }
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <div className="com" key={comment._id} style={{ marginLeft: depth * 20 }}>
        <div className="comment">
          <p>
            <strong>@{comment.author.username}:</strong> &nbsp;
            {editingComment && editingComment._id === comment._id ? (
              <>
                <input
                  type="text"
                  value={editingComment.content}
                  onChange={(e) =>
                    setEditingComment({ ...editingComment, content: e.target.value })
                  }
                />
                <button className="edrc-btn" onClick={() => handleEditComment(comment._id)}>Save</button>
                <button className="edrc-btn" onClick={() => setEditingComment(null)}>Cancel</button>
              </>
            ) : (
              <>
                {comment.content} &nbsp;
                <br />
                {userInfo.id === comment.author._id && (
                  <>
                    <button  className="edrc-btn" onClick={() => setEditingComment(comment)}><FaRegEdit /></button>
                    <button className="edrc-btn" onClick={() => handleDeleteComment(comment._id)}><AiFillDelete/></button>
                  </>
                )}
                <button className="edrc-btn" onClick={() => setReplyingTo(comment._id)}><BsFillReplyFill/></button>
              </>
            )}
          </p>
        </div>

        {replyingTo === comment._id && (
          <div className="reply-box">
            <textarea type="text" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="Write a reply..." />
            <div>
                <button className="edrc-btn" onClick={() => handleReply(comment._id)}>Reply</button>
                <button className="edrc-btn" onClick={() => setReplyingTo(null)}>Cancel</button>
            </div>
           
          </div>
        )}

        {comment.replies && renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {userInfo?.id && (
        <div className="add-comment">
          <textarea  type="text-area" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." />
          <br />
          <button className="comment-post-btn" onClick={handleAddComment}>Post</button>
        </div>
      )}
      {renderComments(comments)}
    </div>
  );
}
