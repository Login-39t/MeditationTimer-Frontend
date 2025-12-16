import './AboutUs.css'

function AboutUs() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-title">About Meditex</h1>
        <p className="about-subtitle">Your journey to mindfulness starts here</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <div className="meditation-icon">🧘‍♀️</div>
          <h2>Mindful Meditation</h2>
          <p>Experience the power of meditation with our carefully crafted timer and ambient sounds designed to enhance your practice.</p>
        </div>
        
        <div className="about-section">
          <div className="meditation-icon">🔔</div>
          <h2>Sacred Bells</h2>
          <p>Choose from authentic bell sounds including Tibetan singing bowls, crystal bells, and traditional gongs to guide your sessions.</p>
        </div>
        
        <div className="about-section">
          <div className="meditation-icon">📊</div>
          <h2>Track Progress</h2>
          <p>Monitor your meditation journey with detailed history tracking and insights into your mindfulness practice.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs