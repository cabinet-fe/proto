import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../utils/cn'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  position?: 'left' | 'right' | 'top' | 'bottom'
  variant?: 'slide' | 'scale' | 'rotate' | 'blur' | 'glass' | 'neon' | 'cosmic'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showOverlay?: boolean
  closeOnOverlayClick?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

const positionClasses = {
  left: 'left-0 top-0 h-full',
  right: 'right-0 top-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full'
}

const getVariants = (position: string, variant: string) => {
  const variants: any = {
    slide: {
      hidden: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
      },
      visible: { x: 0, y: 0 },
      exit: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
      }
    },
    scale: {
      hidden: { scale: 0, opacity: 0, rotate: -10 },
      visible: { scale: 1, opacity: 1, rotate: 0 },
      exit: { scale: 0, opacity: 0, rotate: 10 }
    },
    rotate: {
      hidden: {
        rotateY: position === 'left' ? -90 : position === 'right' ? 90 : 0,
        rotateX: position === 'top' ? -90 : position === 'bottom' ? 90 : 0,
        opacity: 0
      },
      visible: { rotateY: 0, rotateX: 0, opacity: 1 },
      exit: {
        rotateY: position === 'left' ? -90 : position === 'right' ? 90 : 0,
        rotateX: position === 'top' ? -90 : position === 'bottom' ? 90 : 0,
        opacity: 0
      }
    },
    blur: {
      hidden: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
        filter: 'blur(20px)',
        opacity: 0
      },
      visible: { x: 0, y: 0, filter: 'blur(0px)', opacity: 1 },
      exit: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
        filter: 'blur(20px)',
        opacity: 0
      }
    },
    glass: {
      hidden: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
        opacity: 0,
        scale: 0.8
      },
      visible: { x: 0, y: 0, opacity: 1, scale: 1 },
      exit: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
        opacity: 0,
        scale: 0.8
      }
    },
    neon: {
      hidden: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
        opacity: 0,
        boxShadow: '0 0 0px #00ff88'
      },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        boxShadow: '0 0 30px #00ff88, inset 0 0 30px rgba(0, 255, 136, 0.1)'
      },
      exit: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
        opacity: 0,
        boxShadow: '0 0 0px #00ff88'
      }
    },
    cosmic: {
      hidden: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
        opacity: 0,
        rotateZ: -180
      },
      visible: { x: 0, y: 0, opacity: 1, rotateZ: 0 },
      exit: {
        x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
        y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
        opacity: 0,
        rotateZ: 180
      }
    }
  }

  return variants[variant] || variants.slide
}

const getDrawerStyles = (variant: string) => {
  const styles = {
    slide: 'bg-white dark:bg-gray-900 shadow-2xl',
    scale: 'bg-white dark:bg-gray-900 shadow-2xl',
    rotate: 'bg-white dark:bg-gray-900 shadow-2xl',
    blur: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl',
    glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl',
    neon: 'bg-black border-2 border-green-400 shadow-2xl',
    cosmic: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 shadow-2xl'
  }

  return styles[variant as keyof typeof styles] || styles.slide
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  variant = 'slide',
  size = 'md',
  showOverlay = true,
  closeOnOverlayClick = true,
  className
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  const variants = getVariants(position, variant)
  const drawerStyles = getDrawerStyles(variant)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "absolute inset-0",
                variant === 'glass' ? 'bg-black/20 backdrop-blur-sm' :
                variant === 'neon' ? 'bg-black/70' :
                variant === 'cosmic' ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/30 backdrop-blur-sm' :
                'bg-black/50'
              )}
              onClick={closeOnOverlayClick ? onClose : undefined}
            />
          )}

          {/* Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{
              type: variant === 'cosmic' ? 'spring' : 'tween',
              damping: variant === 'cosmic' ? 20 : undefined,
              stiffness: variant === 'cosmic' ? 300 : undefined,
              duration: variant === 'cosmic' ? undefined : 0.4,
              ease: variant === 'scale' ? [0.25, 0.1, 0.25, 1] : 'easeInOut'
            }}
            className={cn(
              'relative z-10 flex flex-col',
              positionClasses[position],
              sizeClasses[size],
              drawerStyles,
              position === 'left' || position === 'right' ? 'w-full' : 'h-auto min-h-[200px]',
              className
            )}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  variant === 'neon' ? 'text-green-400 hover:bg-green-400/20 border border-green-400' :
                  variant === 'cosmic' ? 'text-white hover:bg-white/20' :
                  variant === 'glass' ? 'text-white/80 hover:bg-white/20' :
                  'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800'
                )}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 pt-0">
              {children}
            </div>

            {/* Special Effects */}
            {variant === 'neon' && (
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 border-2 border-green-400/30 pointer-events-none"
              />
            )}

            {variant === 'cosmic' && (
              <>
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse" />
                  <div className="absolute top-20 right-16 w-1 h-1 bg-blue-300 rounded-full animate-ping" />
                  <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse" />
                  <div className="absolute bottom-20 right-10 w-1 h-1 bg-white rounded-full animate-ping" />
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}