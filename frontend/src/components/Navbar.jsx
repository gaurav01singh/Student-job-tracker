import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav style={{
      padding: "10px 20px",
      background: "#f5f5f5",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2>Student Job Tracker</h2>
      {user && (
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
