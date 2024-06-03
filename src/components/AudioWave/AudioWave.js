import { useState } from 'react'
import './AudioWave.css'

export default ({
  isPlaying
}) => {
  const COUNT = 10
  const MID = COUNT / 2
  const [hrScales, setHrScales] = useState(Array.from({length: COUNT}).map((item, index) => {
    let scale = Math.random();
    const distanceFromMiddle = Math.abs(index - MID);
    if (distanceFromMiddle < MID / 2) {
      scale = scale < 0.3 ? scale + 0.3 : scale;
    }
    scale *= (1 - distanceFromMiddle / MID) * 6;
    return {
      scale,
      animationDelay: Math.random() > 0.5 ? "180ms" : "100ms"
    }
  }))

  return (
    <div class="audio-wave">
      {
        hrScales.map(item => {
          return (
            <hr className={isPlaying ? 'animate' : ''} style={{ '--scale': item.scale, 'animationDelay': item.animationDelay }} />
          )
        })
      }
    </div>
  )
}