import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("username", username);
      onLogin(username);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>📝 Task Tracker</h1>
        <p className="login-subtitle">Welcome! Please enter your name to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Continue →</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
