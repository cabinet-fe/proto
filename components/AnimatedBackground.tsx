import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  variant?: 'particles' | 'waves' | 'geometric' | 'cosmic'
  className?: string
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'particles',
  className = ''
}) => {
  const renderParticles = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-1 h-1 bg-purple-400/30 rounded-full'
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  )

  const renderWaves = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute inset-0'
          style={{
            background: `radial-gradient(circle at ${50 + i * 20}% ${
              50 + i * 15
            }%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )

  const renderGeometric = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute border border-cyan-400/20'
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )

  const renderCosmic = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Stars */}
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className='absolute w-0.5 h-0.5 bg-white rounded-full'
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: Math.random() * 3 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Floating shapes */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className='absolute rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm'
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )

  const backgrounds = {
    particles: renderParticles,
    waves: renderWaves,
    geometric: renderGeometric,
    cosmic: renderCosmic
  }

  return backgrounds[variant]()
}

export default AnimatedBackground
