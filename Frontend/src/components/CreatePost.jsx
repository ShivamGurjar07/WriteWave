import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const res = await fetch("https://writewave-5o94.onrender.com/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (res.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="create-page">
      <form onSubmit={createNewPost}>
        <input
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <button className="create-btn" style={{ marginTop: "20px" }}>
          Create Post
        </button>
      </form>
    </div>
  );
}
