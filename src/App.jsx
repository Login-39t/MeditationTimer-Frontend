import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Timer from './components/Timer'
import AboutUs from './components/AboutUs'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/timer" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
