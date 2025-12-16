import { useState, useRef } from 'react'
import './BellSelector.css'

function BellSelector({ selectedBell, onBellChange }) {
  const bells = [
    { id: 'basu', name: 'Basu', frequency: 440 },
    { id: 'tibetan', name: 'Tibetan', frequency: 528 },
    { id: 'crystal', name: 'Crystal', frequency: 660 },
    { id: 'gong', name: 'Gong', frequency: 220 }
  ]

  const currentIndex = bells.findIndex(bell => bell.id === selectedBell)
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)

  const handleMouseDown = (e) => {
    setStartX(e.clientX)
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const diff = e.clientX - startX
    setTranslateX(diff)
  }

  const playBellSound = (bellId) => {
    const bell = bells.find(b => b.id === bellId)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(bell.frequency, audioContext.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 2)
  }

  const handleMouseUp = (e) => {
    if (!isDragging) return
    const diff = e.clientX - startX
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex > 0) {
        const newBellId = bells[currentIndex - 1].id
        onBellChange(newBellId)
        playBellSound(newBellId)
      } else if (diff < 0 && currentIndex < bells.length - 1) {
        const newBellId = bells[currentIndex + 1].id
        onBellChange(newBellId)
        playBellSound(newBellId)
      }
    }
    
    setIsDragging(false)
    setTranslateX(0)
  }

  return (
    <div className="bell-selector">
      <p className="bell-label">Starting bell</p>
      
      <div 
        className="bell-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="bell-slider" 
          style={{ 
            transform: `translateX(${-currentIndex * 216 + translateX}px)`,
            transitionDuration: isDragging ? '0ms' : '300ms'
          }}
        >
          {bells.map((bell, index) => (
            <div 
              key={bell.id} 
              className="bell-slide"
              onClick={() => playBellSound(bell.id)}
            >
              <div className="bell-bowl"></div>
              <p className="bell-name">{bell.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BellSelector