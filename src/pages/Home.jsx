import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const styles = {
    container: {
      height: "100vh",              // ensures it exactly matches the window height
      width: "100vw",               // ensures full width, no white margins
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg, #00C9FF, #92FE9D)",
      color: "#fff",
      fontFamily: "Poppins, sans-serif",
      textAlign: "center",
      overflow: "hidden",           // prevents small scrollbars
      margin: 0,                    // removes default body margin
      padding: "20px",
      boxSizing: "border-box",
    },
    title: {
      fontSize: "clamp(32px, 6vw, 56px)",
      fontWeight: "bold",
      marginBottom: "1rem",
      letterSpacing: "1px",
    },
    subtitle: {
      fontSize: "clamp(16px, 3vw, 22px)",
      color: "#f1f1f1",
      marginBottom: "2.5rem",
      maxWidth: "800px",
      lineHeight: "1.6",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "1.5rem",
    },
    button: {
      background: "#fff",
      color: "#00C9FF",
      border: "none",
      padding: "clamp(12px, 2vw, 16px) clamp(24px, 5vw, 32px)",
      borderRadius: "12px",
      fontSize: "clamp(14px, 2vw, 18px)",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Bias Mitigation in AI</h1>
      <p style={styles.subtitle}>
        Harnessing Generative AI for Fair and Ethical Decision-Making
      </p>

      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.background = "#00C9FF";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#fff";
            e.target.style.color = "#00C9FF";
          }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
