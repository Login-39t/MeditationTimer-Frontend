import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>
        Meditex
      </div>
      
      <div className="navbar-menu">
        <button className="nav-link" onClick={() => navigate('/timer')}>
          Meditation Timer
        </button>
        <button className="nav-link" onClick={() => navigate('/about')}>
          About Us
        </button>
        {isLoggedIn && (
          <button className="nav-link" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        )}
      </div>
      
      <div className="navbar-actions">
        {isLoggedIn ? (
          <>
            <span className="user-name">Welcome, {user?.name}</span>
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="nav-btn login-btn" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="nav-btn get-started-btn" onClick={() => navigate('/register')}>
              Get started
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar