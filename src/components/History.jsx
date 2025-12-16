import { useState } from 'react'
import './History.css'

function History() {
  const [sessions] = useState([
    { date: '2024-01-15', duration: 600, bell: 'Basu', completed: true },
    { date: '2024-01-14', duration: 900, bell: 'Tibetan', completed: true },
    { date: '2024-01-13', duration: 300, bell: 'Crystal', completed: false },
    { date: '2024-01-12', duration: 1200, bell: 'Gong', completed: true },
    { date: '2024-01-11', duration: 600, bell: 'Basu', completed: true }
  ])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} min`
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <h1 className="history-title">Meditation History</h1>
        <p className="history-subtitle">Track your mindfulness journey</p>
      </div>
      
      <div className="history-content">
        {sessions.map((session, index) => (
          <div key={index} className="session-card">
            <div className="session-date">
              {formatDate(session.date)}
            </div>
            <div className="session-details">
              <div className="session-info">
                <span className="session-duration">{formatDuration(session.duration)}</span>
                <span className="session-bell">🔔 {session.bell}</span>
              </div>
              <div className={`session-status ${session.completed ? 'completed' : 'incomplete'}`}>
                {session.completed ? '✅ Completed' : '⏸️ Incomplete'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History