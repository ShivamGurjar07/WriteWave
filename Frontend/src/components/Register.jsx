import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  async function register(ev) {
    ev.preventDefault();
    if (!username || !password) {
      alert("Username and password are required!");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.status === 200) {
        alert("Registration successful");
        navigate("/login"); 
      } else {
        alert(`Registration failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong, please try again.");
    }
  }
  return (
    <div className="login-signup-page">
      <h2 className="h2" style={{ textAlign: "center" }}>New here?</h2>
      <p style={{ textAlign: "center", color:"white", margin:"40px auto"}}>Enter your personal details and start your journey with us</p>
      <form className="register" onSubmit={register}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="register-btn" type="submit">Register</button>
      </form>
    </div>
  );
}
