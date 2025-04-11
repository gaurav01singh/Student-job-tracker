import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import './App.css';
import Auth from "./pages/Auth";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/auth" element={<Auth />} />
      
    </Routes>
  );
};

export default App;
