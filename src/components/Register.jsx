import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './Register.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authService.register({ name, email, password })
      navigate('/timer')
      window.location.reload()
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || 'Something went wrong'))
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Join the Meditation Timer</p>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="register-btn">Create Account</button>
        </form>
        
        <p className="login-text">
          Already have an account? <a href="#" onClick={() => navigate('/login')} className="login-link">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register