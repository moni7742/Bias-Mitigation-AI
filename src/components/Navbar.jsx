import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // optional, for styling

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/register">Register</Link>

        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;
