import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/Auth.css";

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("https://student-job-tracker-backend.up.railway.app/api/auth/login", form);
        login(res.data.token);
        navigate("/");
      } else {
        await axios.post("https://student-job-tracker-backend.up.railway.app/api/auth/register", form);
        alert("Signup successful. You can login now.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(isLogin ? "Login failed" : "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}>
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
