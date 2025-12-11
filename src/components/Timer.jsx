import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './Timer.css'

function Timer() {
  const navigate = useNavigate()
  const [duration, setDuration] = useState(300)
  const [timeLeft, setTimeLeft] = useState(300)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef(null)

  const handleLogout = () => {
    navigate('/login')
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsComplete(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
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
  }

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration)
    setTimeLeft(newDuration)
    setIsRunning(false)
    setIsComplete(false)
  }

  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <div className="timer-app">
      <Header />
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <main className="timer-container">
        <div className="timer-card">
          <h1 className="title">Meditation Timer</h1>
          
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
      </main>
      <Footer />
    </div>
  )
}

export default Timer
