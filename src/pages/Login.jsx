import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Add default user credentials once when component loads
  useEffect(() => {
    const defaultUsers = {
      admin: { password: "1234" },
    };

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users.admin) {
      localStorage.setItem("users", JSON.stringify({ ...users, ...defaultUsers }));
    }
  }, []);

  // ✅ Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username] && users[username].password === password) {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  // ✅ Styles
  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #00C9FF, #92FE9D)",
      fontFamily: "Poppins, sans-serif",
      overflow: "hidden",
      margin: 0,
    },
    card: {
      background: "rgba(255, 255, 255, 0.15)",
      padding: "50px 40px",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
      width: "90%",
      maxWidth: "400px",
      textAlign: "center",
      color: "#fff",
    },
    title: {
      fontSize: "clamp(24px, 5vw, 36px)",
      fontWeight: "bold",
      marginBottom: "25px",
    },
    input: {
      width: "100%",
      padding: "14px",
      margin: "12px 0",
      borderRadius: "10px",
      border: "none",
      outline: "none",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "10px",
      background: "#fff",
      color: "#00C9FF",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
    },
    linkText: {
      marginTop: "20px",
      color: "#fff",
      fontSize: "15px",
    },
    link: {
      color: "#fff",
      textDecoration: "underline",
      fontWeight: "600",
    },
    hint: {
      marginTop: "15px",
      color: "#e0e0e0",
      fontSize: "14px",
      fontStyle: "italic",
    },
  };

  // ✅ UI
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.background = "#00C9FF";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#fff";
              e.target.style.color = "#00C9FF";
            }}
          >
            Login
          </button>
        </form>

        <p style={styles.linkText}>
          New user?{" "}
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
