'use client'

import React, { useEffect, useState } from 'react'

interface SpeedometerProps {
  score: number
  min?: number
  max?: number
}

const getRiskLabel = (score: number, min: number, max: number) => {
  const percentage = ((score - min) / (max - min)) * 100
  if (percentage < 20) return 'Very High Risk'
  if (percentage < 40) return 'High Risk'
  if (percentage < 60) return 'Medium Risk'
  if (percentage < 80) return 'Low Risk'
  return 'Very Low Risk'
}

export function Speedometer({ score, min = 300, max = 850 }: SpeedometerProps) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const percentage = ((score - min) / (max - min)) * 100
    const degree = (percentage / 100) * 180 // map to 0-180°
    setRotation(degree - 90)
  }, [score, min, max])

  const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    gaugeContainer: {
      position: 'relative',
      width: '280px',
      height: '150px',
      overflow: 'hidden',
      margin: '0 auto',
    },
    gauge: {
      width: '280px',
      height: '280px',
      borderRadius: '50%',
      background: `conic-gradient(
        #e53935 0deg 36deg,
        #ff9800 36deg 72deg,
        #ffc107 72deg 108deg,
        #8bc34a 108deg 144deg,
        #2ecc71 144deg 180deg
      )`,
      transform: 'rotate(-90deg)',
    },
    gaugeCover: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      width: '200px',
      height: '200px',
      background: '#0a0a0a',
      borderRadius: '50%',
      border: '2px solid rgba(255, 255, 255, 0.1)',
    },
    needle: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      width: '3px',
      height: '120px',
      background: '#60a5fa',
      transformOrigin: 'bottom',
      transition: 'transform 0.5s ease-in-out',
      borderRadius: '2px',
    },
    centerCircle: {
      position: 'absolute',
      bottom: '-6px',
      left: 'calc(50% - 8px)',
      width: '16px',
      height: '16px',
      background: '#60a5fa',
      borderRadius: '50%',
      boxShadow: '0 0 8px rgba(96, 165, 250, 0.5)',
    },
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.gaugeContainer}>
        <div style={styles.gauge} />
        <div style={styles.gaugeCover} />

        <div
          style={{
            ...styles.needle,
            transform: `rotate(${rotation}deg)`,
          }}
        />
        <div style={styles.centerCircle} />
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-white/70">Trust Score Status</p>
        <p className="mt-1 text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {getRiskLabel(score, min, max)}
        </p>
      </div>
    </div>
  )
}
