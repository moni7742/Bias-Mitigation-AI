import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080"; // FastAPI backend

function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({ age: "", income: "", credit_score: "" });
  const [prediction, setPrediction] = useState(null);
  const [showSwagger, setShowSwagger] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Upload CSV dataset
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/upload-data`, formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Upload failed");
    }
  };

  // Train model
  const handleTrain = async () => {
    try {
      const res = await axios.post(`${API_URL}/train-model`);
      setMessage(`Model trained successfully! Accuracy: ${res.data.accuracy}`);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Training failed");
    }
  };

  // Make prediction
  const handlePredict = async () => {
    const { age, income, credit_score } = inputs;
    if (!age || !income || !credit_score) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/predict`, null, {
        params: {
          age: parseInt(age),
          income: parseFloat(income),
          credit_score: parseFloat(credit_score),
        },
      });
      setPrediction(res.data.prediction);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Prediction failed");
    }
  };

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/login");
  };

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    width: "100vw",
    padding: "40px",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(180deg, #00C9FF, #92FE9D)",
    color: "#fff",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  };

  const sectionStyle = {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(255,255,255,0.15)",
    padding: "25px 20px",
    borderRadius: "15px",
    backdropFilter: "blur(8px)",
    marginBottom: "30px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "80%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "12px 25px",
    margin: "10px 5px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "#fff",
    color: "#00C9FF",
    transition: "all 0.3s",
  };

  const titleStyle = {
    fontSize: "clamp(24px, 5vw, 36px)",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const profileStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#fff",
    color: "#00C9FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "18px",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "70px",
    right: "20px",
    background: "#fff",
    color: "#00C9FF",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    overflow: "hidden",
    zIndex: 1000,
    minWidth: "160px",
  };

  const dropdownItemStyle = {
    padding: "12px 20px",
    cursor: "pointer",
    borderBottom: "1px solid #f1f1f1",
  };

  return (
    <div style={containerStyle}>
      {/* Profile Icon */}
      <div
        style={profileStyle}
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
      >
        U
      </div>

      {/* Profile Dropdown */}
      {showProfileDropdown && (
        <div style={dropdownStyle}>
          <div
            style={dropdownItemStyle}
            onClick={() => {
              navigate("/profile");
              setShowProfileDropdown(false);
            }}
          >
            Profile Info
          </div>
          <div
            style={dropdownItemStyle}
            onClick={() => {
              navigate("/settings");
              setShowProfileDropdown(false);
            }}
          >
            Settings
          </div>
          <div
            style={{ ...dropdownItemStyle, borderBottom: "none" }}
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}

      <h2 style={titleStyle}>Bias Mitigation AI Dashboard</h2>

      {/* Upload Dataset */}
      <div style={sectionStyle}>
        <h3>1. Upload Dataset</h3>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          style={inputStyle}
        />
        <button
          style={buttonStyle}
          onClick={handleUpload}
          onMouseEnter={(e) => (e.target.style.background = "#00C9FF") && (e.target.style.color = "#fff")}
          onMouseLeave={(e) => (e.target.style.background = "#fff") && (e.target.style.color = "#00C9FF")}
        >
          Upload
        </button>
      </div>

      {/* Train Model */}
      <div style={sectionStyle}>
        <h3>2. Train Model</h3>
        <button
          style={buttonStyle}
          onClick={handleTrain}
          onMouseEnter={(e) => (e.target.style.background = "#00C9FF") && (e.target.style.color = "#fff")}
          onMouseLeave={(e) => (e.target.style.background = "#fff") && (e.target.style.color = "#00C9FF")}
        >
          Train Model
        </button>
      </div>

      {/* Make Prediction */}
      <div style={sectionStyle}>
        <h3>3. Make Prediction</h3>
        <input
          type="number"
          placeholder="Age"
          value={inputs.age}
          onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Income"
          value={inputs.income}
          onChange={(e) => setInputs({ ...inputs, income: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Credit Score"
          value={inputs.credit_score}
          onChange={(e) => setInputs({ ...inputs, credit_score: e.target.value })}
          style={inputStyle}
        />
        <button
          style={buttonStyle}
          onClick={handlePredict}
          onMouseEnter={(e) => (e.target.style.background = "#00C9FF") && (e.target.style.color = "#fff")}
          onMouseLeave={(e) => (e.target.style.background = "#fff") && (e.target.style.color = "#00C9FF")}
        >
          Predict
        </button>
        {prediction !== null && <p>Prediction: <strong>{prediction}</strong></p>}
      </div>

      {/* Status Message */}
      {message && <div style={{ color: "green", marginBottom: "20px" }}>{message}</div>}

      {/* Swagger UI */}
      <div style={sectionStyle}>
        <h3>API Documentation</h3>
        <button
          style={buttonStyle}
          onClick={() => setShowSwagger(!showSwagger)}
          onMouseEnter={(e) => (e.target.style.background = "#00C9FF") && (e.target.style.color = "#fff")}
          onMouseLeave={(e) => (e.target.style.background = "#fff") && (e.target.style.color = "#00C9FF")}
        >
          {showSwagger ? "Hide Swagger UI" : "Show Swagger UI"}
        </button>
        {showSwagger && (
          <iframe
            src={`${API_URL}/docs`}
            width="100%"
            height="500px"
            title="Swagger UI"
            style={{ border: "1px solid #ccc", marginTop: "10px", borderRadius: "10px" }}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
