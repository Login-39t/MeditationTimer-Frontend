import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { meditationService } from '../services/meditationService'
import { authService } from '../services/authService'
import Footer from './Footer'
import BellSelector from './BellSelector'
import './Timer.css'

function Timer() {
  const navigate = useNavigate()
  const [duration, setDuration] = useState(300)
  const [timeLeft, setTimeLeft] = useState(300)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedBell, setSelectedBell] = useState('basu')
  const [sessionSaved, setSessionSaved] = useState(false)
  const intervalRef = useRef(null)

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  const saveSession = async () => {
    try {
      const sessionData = {
        duration: Math.floor(duration / 60), // Convert to minutes
        type: 'mindfulness'
      }
      await meditationService.createSession(sessionData)
      console.log('Session saved successfully!')
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsComplete(true)
            playBellSound(selectedBell)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (isComplete && !sessionSaved) {
      saveSession()
      setSessionSaved(true)
    }
  }, [isComplete, sessionSaved])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const playBellSound = (bellType) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    const frequencies = {
      basu: 440,
      tibetan: 528,
      crystal: 660,
      gong: 220
    }
    
    oscillator.frequency.setValueAtTime(frequencies[bellType] || 440, audioContext.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 2)
  }

  const handleStart = () => {
    playBellSound(selectedBell)
    setIsRunning(true)
    setIsComplete(false)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(duration)
    setIsComplete(false)
    setSessionSaved(false)
  }

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration)
    setTimeLeft(newDuration)
    setIsRunning(false)
    setIsComplete(false)
    setSessionSaved(false)
  }

  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <div className="timer-app">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <main className="timer-container">
        <div className="timer-hero">
          <h1 className="hero-title">Free Online Meditation Timer</h1>
          <p className="hero-subtitle">More time is spent meditating with our Timer than anywhere else.</p>
          <p className="hero-subtitle">Customise your routine and drift away.</p>
        </div>
        
        <div className="timer-card">
          <h1 className="title">Timer</h1>
          
          <BellSelector 
            selectedBell={selectedBell} 
            onBellChange={setSelectedBell} 
          />
          
          <div className={`timer-circle ${isRunning ? 'running' : ''} ${isComplete ? 'complete' : ''}`}>
            <svg className="progress-ring" width="280" height="280">
              <circle
                className="progress-ring-bg"
                cx="140"
                cy="140"
                r="120"
              />
              <circle
                className="progress-ring-fill"
                cx="140"
                cy="140"
                r="120"
                style={{
                  strokeDasharray: `${2 * Math.PI * 120}`,
                  strokeDashoffset: `${2 * Math.PI * 120 * (1 - progress / 100)}`
                }}
              />
            </svg>
            <div className="timer-display">
              <span className="time" aria-live="polite">{formatTime(timeLeft)}</span>
              {isComplete && <span className="complete-text">Complete!</span>}
            </div>
          </div>

          <div className="custom-time-card">
            <label htmlFor="custom-time" className="custom-time-label">
              Custom Time: {Math.floor(duration / 60)} minutes
            </label>
            <input
              type="range"
              id="custom-time"
              className="time-slider"
              min="60"
              max="3600"
              step="60"
              value={duration}
              onChange={(e) => handleDurationChange(Number(e.target.value))}
              disabled={isRunning}
              aria-label="Set custom meditation time"
            />
          </div>

          <div className="controls" role="group" aria-label="Timer controls">
            {!isRunning ? (
              <button 
                className="btn btn-primary" 
                onClick={handleStart}
                disabled={timeLeft === 0}
                aria-label="Start meditation timer"
              >
                Start
              </button>
            ) : (
              <button 
                className="btn btn-secondary" 
                onClick={handlePause}
                aria-label="Pause meditation timer"
              >
                Pause
              </button>
            )}
            <button 
              className="btn btn-reset" 
              onClick={handleReset}
              aria-label="Reset meditation timer"
            >
              Reset
            </button>
          </div>



          <div className="duration-selector" role="group" aria-label="Select meditation duration">
            {[300, 600, 900, 1200].map(dur => (
              <button
                key={dur}
                className={`duration-btn ${duration === dur ? 'active' : ''}`}
                onClick={() => handleDurationChange(dur)}
                disabled={isRunning}
                aria-label={`Set timer to ${dur / 60} minutes`}
                aria-pressed={duration === dur}
              >
                {dur / 60} min
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Timer
