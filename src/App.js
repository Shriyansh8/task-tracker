import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import "./styles/App.css";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <div className="App">
      {username && (
        <div className="top-bar">
          <button onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Sign Out
          </button>
        </div>
      )}

      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <TaskList username={username} />
      )}
    </div>
  );
}

export default App;
