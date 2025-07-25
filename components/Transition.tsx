import React, { useEffect, useState, useRef } from 'react'
import { cn } from '../utils/cn'

export interface TransitionProps {
  children: React.ReactNode
  show: boolean
  appear?: boolean
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
  duration?: number
  className?: string
  style?: React.CSSProperties
  // 新增 animation 支持
  enterAnimation?: string
  leaveAnimation?: string
  animationDuration?: number
  useAnimation?: boolean
  onEnter?: () => void
  onEntered?: () => void
  onLeave?: () => void
  onLeft?: () => void
}

export const Transition: React.FC<TransitionProps> = ({
  children,
  show,
  appear = false,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  duration = 300,
  className = '',
  style = {},
  enterAnimation = '',
  leaveAnimation = '',
  animationDuration = 1000,
  useAnimation = false,
  onEnter,
  onEntered,
  onLeave,
  onLeft
}) => {
  const [shouldRender, setShouldRender] = useState(show || appear)
  const [transitionState, setTransitionState] = useState<
    'entering' | 'entered' | 'leaving' | 'left'
  >('left')
  const elementRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      if (show) {
        setShouldRender(true)
        setTransitionState('entering')
        onEnter?.()

        const timer = setTimeout(
          () => {
            setTransitionState('entered')
            onEntered?.()
          },
          useAnimation ? animationDuration : duration
        )

        return () => clearTimeout(timer)
      }
      return
    }

    if (show) {
      setShouldRender(true)
      setTransitionState('entering')
      onEnter?.()

      const timer = setTimeout(
        () => {
          setTransitionState('entered')
          onEntered?.()
        },
        useAnimation ? animationDuration : duration
      )

      return () => clearTimeout(timer)
    } else {
      setTransitionState('leaving')
      onLeave?.()

      const timer = setTimeout(
        () => {
          setTransitionState('left')
          setShouldRender(false)
          onLeft?.()
        },
        useAnimation ? animationDuration : duration
      )

      return () => clearTimeout(timer)
    }
  }, [
    show,
    duration,
    animationDuration,
    useAnimation,
    onEnter,
    onEntered,
    onLeave,
    onLeft
  ])

  if (!shouldRender) return null

  const getTransitionClasses = () => {
    if (useAnimation) {
      switch (transitionState) {
        case 'entering':
        case 'entered':
          return enterAnimation
        case 'leaving':
          return leaveAnimation
        default:
          return ''
      }
    } else {
      switch (transitionState) {
        case 'entering':
          return cn(enter, enterFrom)
        case 'entered':
          return cn(enter, enterTo)
        case 'leaving':
          return cn(leave, leaveFrom)
        default:
          return cn(leave, leaveTo)
      }
    }
  }

  const getStyles = () => {
    if (useAnimation) {
      return {
        ...style
      }
    } else {
      return {
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...style
      }
    }
  }

  return (
    <div
      ref={elementRef}
      className={cn(className, getTransitionClasses())}
      style={getStyles()}
    >
      {children}
    </div>
  )
}
