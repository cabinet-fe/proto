import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '../utils/cn'

export interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  children?: MenuItem[]
  onClick?: () => void
  disabled?: boolean
}

export interface MenuProps {
  items: MenuItem[]
  className?: string
  defaultExpandedIds?: string[]
}

export interface MenuItemComponentProps {
  item: MenuItem
  level: number
  expandedIds: Set<string>
  onToggle: (id: string) => void
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  level,
  expandedIds,
  onToggle
}) => {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedIds.has(item.id)
  const paddingLeft = level * 16 + 16

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id)
    } else if (item.onClick && !item.disabled) {
      item.onClick()
    }
  }

  return (
    <div className='select-none'>
      <motion.div
        className={cn(
          'flex items-center justify-between py-2 px-4 cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800',
          item.disabled &&
            'opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent',
          'group'
        )}
        style={{ paddingLeft }}
        onClick={handleClick}
        whileHover={!item.disabled ? { x: 2 } : {}}
        whileTap={!item.disabled ? { scale: 0.98 } : {}}
      >
        <div className='flex items-center gap-3'>
          {item.icon && (
            <span className='text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors'>
              {item.icon}
            </span>
          )}
          <span
            className={cn(
              'text-gray-800 dark:text-gray-200 font-medium',
              item.disabled && 'text-gray-400 dark:text-gray-600'
            )}
          >
            {item.label}
          </span>
        </div>

        {hasChildren && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='text-gray-500 dark:text-gray-400'
          >
            <ChevronRight size={16} />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              opacity: { duration: 0.2 }
            }}
            className='overflow-hidden'
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {item.children!.map(child => (
                <MenuItemComponent
                  key={child.id}
                  item={child}
                  level={level + 1}
                  expandedIds={expandedIds}
                  onToggle={onToggle}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Menu: React.FC<MenuProps> = ({
  items,
  className,
  defaultExpandedIds = []
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpandedIds)
  )

  const handleToggle = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden',
        className
      )}
    >
      {items.map(item => (
        <MenuItemComponent
          key={item.id}
          item={item}
          level={0}
          expandedIds={expandedIds}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}
