import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
      alert("Username already exists. Try another.");
      return;
    }

    users[username] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));

    alert("🎉 Registration successful! You can now log in.");
    navigate("/login");
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
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
      color: "#4A00E0",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.background = "#4A00E0";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#fff";
              e.target.style.color = "#4A00E0";
            }}
          >
            Register
          </button>
        </form>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
