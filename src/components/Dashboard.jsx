import { useState, useEffect } from 'react'
import { meditationService } from '../services/meditationService'
import { authService } from '../services/authService'
import './Dashboard.css'

function Dashboard() {
  const [sessions, setSessions] = useState([])
  const [stats, setStats] = useState({ totalSessions: 0, totalMinutes: 0 })
  const [loading, setLoading] = useState(true)
  const user = authService.getCurrentUser()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [sessionsData, statsData] = await Promise.all([
        meditationService.getUserSessions(),
        meditationService.getSessionStats()
      ])
      setSessions(sessionsData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Your meditation journey</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Sessions</h3>
          <p className="stat-number">{stats.totalSessions}</p>
        </div>
        <div className="stat-card">
          <h3>Total Minutes</h3>
          <p className="stat-number">{stats.totalMinutes}</p>
        </div>
        <div className="stat-card">
          <h3>Average Session</h3>
          <p className="stat-number">
            {stats.totalSessions > 0 ? Math.round(stats.totalMinutes / stats.totalSessions) : 0} min
          </p>
        </div>
      </div>

      <div className="sessions-section">
        <h2>Recent Sessions</h2>
        {sessions.length === 0 ? (
          <p className="no-sessions">No meditation sessions yet. Start your first session!</p>
        ) : (
          <div className="sessions-list">
            {sessions.slice(0, 10).map((session) => (
              <div key={session._id} className="session-item">
                <div className="session-info">
                  <span className="session-duration">{session.duration} minutes</span>
                  <span className="session-type">{session.type}</span>
                </div>
                <span className="session-date">{formatDate(session.completedAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard