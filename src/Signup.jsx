import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    try {
      const formData = {
        myname: name,
        myemail: email,
        mynumber: number,
        mypassword: password,
      };

      const response = await fetch(
        "https://69088e0c2d902d0651b0d012.mockapi.io/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);

        setName("");
        setEmail("");
        setNumber("");
        setPassword("");
      } else {
        toast.error("Failed to create account!");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" />
      <div className="signup-card">
        <h1>Create Account</h1>
        <div className="input-group">
          <label>Username</label>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />

          <label>Email</label>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <label>Phone Number</label>
          <input
            placeholder="Enter your number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="tel"
          />

          <label>Password</label>
          <input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <button className="signup-btn" onClick={handleSignup}>
            Sign Up
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
