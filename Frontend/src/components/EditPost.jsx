import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import { useParams, Navigate } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`https://writewave-5o94.onrender.com/post/${id}`)
      .then((res) => res.json())
      .then((postInfo) => {
        if (postInfo) {
          setTitle(postInfo.title);
          setSummary(postInfo.summary);
          setContent(postInfo.content);
        }
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("id", id);
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    if (files?.[0]) {
      data.append("file", files[0]);
    }

    const res = await fetch("https://writewave-5o94.onrender.com/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (res.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div className="editpost">
      <form onSubmit={updatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <button className="update-post-btn" style={{ marginTop: "5px" }}>
          Update Post
        </button>
      </form>
    </div>
  );
}
