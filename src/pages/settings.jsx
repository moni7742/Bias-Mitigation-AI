import React, { useState } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [apiKey, setApiKey] = useState("sk-xxxxxx12345");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const newKey = "sk-" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: darkMode
      ? "linear-gradient(135deg, #2C3E50, #4CA1AF)"
      : "linear-gradient(135deg, #89F7FE, #66A6FF)",
    fontFamily: "Poppins, sans-serif",
    transition: "background 0.4s ease-in-out",
  };

  const cardStyle = {
    background: darkMode ? "#1e1e1e" : "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    padding: "40px 50px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
    color: darkMode ? "#f1f1f1" : "#000",
    width: "90%",
    maxWidth: "500px",
    textAlign: "center",
    transition: "all 0.4s ease",
  };

  const buttonStyle = {
    background: darkMode ? "#66A6FF" : "#fff",
    color: darkMode ? "#fff" : "#0077FF",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  };

  const toggleStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0",
  };

  const switchInput = {
    width: "50px",
    height: "25px",
    position: "relative",
    appearance: "none",
    background: darkMode ? "#555" : "#ccc",
    outline: "none",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  const switchBefore = {
    content: '""',
    position: "absolute",
    top: "2px",
    left: darkMode ? "25px" : "2px",
    width: "21px",
    height: "21px",
    background: "#fff",
    borderRadius: "50%",
    transition: "left 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>⚙️ Settings</h2>

        {/* Light/Dark Mode Toggle */}
        <div style={toggleStyle}>
          <span>Dark Mode</span>
          <label style={{ position: "relative" }}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              style={switchInput}
            />
            <span
              style={{
                ...switchBefore,
                left: darkMode ? "25px" : "2px",
                position: "absolute",
              }}
            ></span>
          </label>
        </div>

        {/* Notifications Toggle */}
        <div style={toggleStyle}>
          <span>Enable Notifications</span>
          <label style={{ position: "relative" }}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              style={switchInput}
            />
            <span
              style={{
                ...switchBefore,
                left: notifications ? "25px" : "2px",
                position: "absolute",
              }}
            ></span>
          </label>
        </div>

        {/* API Key Management */}
        <div style={{ marginTop: "30px" }}>
          <h3>🔑 API Key Management</h3>
          <p
            style={{
              background: darkMode ? "#333" : "#f9f9f9",
              padding: "10px",
              borderRadius: "8px",
              overflowWrap: "anywhere",
              marginTop: "10px",
            }}
          >
            {apiKey}
          </p>
          <button style={buttonStyle} onClick={handleCopy}>
            {copied ? "✅ Copied!" : "📋 Copy Key"}
          </button>
          <button
            style={{ ...buttonStyle, background: "#00C9A7", color: "#fff", marginLeft: "10px" }}
            onClick={handleGenerateKey}
          >
            🔄 Generate New Key
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
