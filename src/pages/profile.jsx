import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", email: "" });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

    if (currentUser) setUser(currentUser);
    setUploadedFiles(allFiles);
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[user.username]) {
      users[user.username].email = user.email;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Profile updated successfully!");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[user.username]) {
      users[user.username].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      delete users[user.username];
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("currentUser");
      alert("Account deleted.");
      navigate("/register");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
      fontFamily: "Poppins, sans-serif",
      overflow: "auto",
      padding: "40px 10px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
      padding: "30px 40px",
      width: "90%",
      maxWidth: "800px",
      color: "#333",
    },
    section: { marginBottom: "30px" },
    title: { textAlign: "center", fontSize: "28px", marginBottom: "20px", fontWeight: "bold" },
    input: { width: "100%", padding: "12px", margin: "10px 0", borderRadius: "10px", border: "none", outline: "none", fontSize: "16px" },
    button: { background: "#00C9FF", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", marginRight: "10px", transition: "all 0.3s ease" },
    deleteBtn: { background: "#FF4B2B", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", marginTop: "10px", transition: "all 0.3s ease" },
    fileSection: { marginTop: "30px", background: "rgba(255,255,255,0.6)", borderRadius: "10px", padding: "15px" },
    fileList: { maxHeight: "150px", overflowY: "auto", background: "#fff", borderRadius: "8px", padding: "10px", marginTop: "10px", fontSize: "15px" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Profile Information</h2>

        {/* Profile Info */}
        <div style={styles.section}>
          <label>Username</label>
          <input type="text" value={user.username} style={styles.input} disabled />
          <label>Email</label>
          <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} style={styles.input} />
          <button style={styles.button} onClick={handleUpdateProfile}>Update Profile</button>
        </div>

        {/* Change Password */}
        <div style={styles.section}>
          <h3>🔐 Change Password</h3>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} />
          <button style={styles.button} onClick={handleChangePassword}>Change Password</button>
        </div>

        {/* Files Uploaded */}
        <div style={styles.fileSection}>
          <h3>📂 Files Uploaded</h3>
          {uploadedFiles.length > 0 ? (
            <div style={styles.fileList}>
              {uploadedFiles.map((file, index) => <p key={index}>• {file}</p>)}
            </div>
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>

        {/* Delete and Logout */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button style={styles.deleteBtn} onClick={handleDeleteAccount}>🗑️ Delete Account</button>
          <button style={{ ...styles.button, background: "#333", marginLeft: "10px" }} onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
