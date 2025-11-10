import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Login.css'

function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState([])

  async function getAllData() {
    const result = await fetch('https://69088e0c2d902d0651b0d012.mockapi.io/users')
    const response = await result.json()
    setData(response)
  }

  useEffect(() => {
    getAllData()
  }, [])

  function handleLogin() {
    const userExists = data.find(
      (item) => item.myemail === email && item.mypassword === password
    )

    if (userExists) {
      toast.success('✅ Login successful!')
      setTimeout(() => {
        nav('/products')
      }, 1500)
    } else {
      toast.error('❌ Invalid credentials!')
    }
  }

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="login-card">
        <h1>Welcome Back</h1>
        <h1>Login</h1>


        <div className="login-form">
          <label>Email</label>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <label>Password</label>
          <input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <button onClick={handleLogin} className="login-btn">Login</button>
        </div>

        <p className="signup-text">
          Don't have an account?{' '}
          <span className="signup-link" onClick={() => nav('/signup')}>
            Sign up here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
