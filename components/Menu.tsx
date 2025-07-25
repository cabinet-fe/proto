import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Folder,
  File,
  Home,
  Settings,
  User,
  Database,
  Shield,
  Bell
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'

export interface MenuItem {
  id: string
  label: string
  icon?: React.ComponentType<any>
  children?: MenuItem[]
  href?: string
  badge?: string | number
}

export interface MenuProps {
  items: MenuItem[]
  className?: string
  level?: number
}

export interface MenuItemProps {
  item: MenuItem
  level?: number
  onItemClick?: (item: MenuItem) => void
}

const MenuItemComponent: React.FC<MenuItemProps> = ({
  item,
  level = 0,
  onItemClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const Icon = item.icon

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    } else {
      onItemClick?.(item)
    }
  }

  const indentLevel = level * 16

  return (
    <div className='select-none'>
      <div
        className={cn(
          'flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'group relative',
          hasChildren ? 'font-medium' : 'font-normal'
        )}
        style={{ paddingLeft: `${12 + indentLevel}px` }}
        onClick={handleClick}
      >
        <div className='flex items-center space-x-3 flex-1'>
          <div className='flex items-center space-x-2'>
            {hasChildren && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className='text-gray-500'
              >
                <ChevronRight size={16} />
              </motion.div>
            )}
            {!hasChildren && level > 0 && (
              <div className='w-4 h-4 flex items-center justify-center'>
                <div className='w-1 h-1 bg-gray-400 rounded-full' />
              </div>
            )}
            {Icon && (
              <Icon
                size={18}
                className={cn(
                  'text-gray-600 dark:text-gray-400',
                  hasChildren && 'text-blue-600 dark:text-blue-400'
                )}
              />
            )}
          </div>
          <span
            className={cn(
              'text-gray-900 dark:text-gray-100 truncate',
              hasChildren && 'text-gray-900 dark:text-white font-semibold'
            )}
          >
            {item.label}
          </span>
        </div>

        {item.badge && (
          <span className='ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full'>
            {item.badge}
          </span>
        )}
      </div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98]
            }}
            className='overflow-hidden'
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className='py-1'
            >
              {item.children?.map(child => (
                <MenuItemComponent
                  key={child.id}
                  item={child}
                  level={level + 1}
                  onItemClick={onItemClick}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Menu: React.FC<MenuProps> = ({ items, className, level = 0 }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    console.log('Selected item:', item)
  }

  return (
    <div className={cn('space-y-1', className)}>
      {items.map(item => (
        <MenuItemComponent
          key={item.id}
          item={item}
          level={level}
          onItemClick={handleItemClick}
        />
      ))}

      {selectedItem && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800'
        >
          <div className='text-sm text-blue-800 dark:text-blue-200'>
            已选择: <span className='font-semibold'>{selectedItem.label}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// 预设的菜单数据示例
export const sampleMenuData: MenuItem[] = [
  {
    id: '1',
    label: '仪表板',
    icon: Home,
    badge: 'New'
  },
  {
    id: '2',
    label: '用户管理',
    icon: User,
    children: [
      {
        id: '2-1',
        label: '用户列表',
        icon: User,
        badge: 156
      },
      {
        id: '2-2',
        label: '用户权限',
        icon: Shield,
        children: [
          {
            id: '2-2-1',
            label: '角色管理',
            icon: Shield
          },
          {
            id: '2-2-2',
            label: '权限分配',
            icon: Shield,
            children: [
              {
                id: '2-2-2-1',
                label: '系统权限',
                icon: Settings
              },
              {
                id: '2-2-2-2',
                label: '数据权限',
                icon: Database
              },
              {
                id: '2-2-2-3',
                label: '功能权限',
                icon: Settings,
                children: [
                  {
                    id: '2-2-2-3-1',
                    label: '读取权限',
                    icon: File
                  },
                  {
                    id: '2-2-2-3-2',
                    label: '写入权限',
                    icon: File
                  },
                  {
                    id: '2-2-2-3-3',
                    label: '删除权限',
                    icon: File
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '2-3',
        label: '用户组',
        icon: User
      }
    ]
  },
  {
    id: '3',
    label: '内容管理',
    icon: Folder,
    children: [
      {
        id: '3-1',
        label: '文章管理',
        icon: File,
        children: [
          {
            id: '3-1-1',
            label: '发布文章',
            icon: File
          },
          {
            id: '3-1-2',
            label: '草稿箱',
            icon: File,
            badge: 8
          },
          {
            id: '3-1-3',
            label: '已发布',
            icon: File,
            badge: 42
          }
        ]
      },
      {
        id: '3-2',
        label: '媒体库',
        icon: Folder,
        children: [
          {
            id: '3-2-1',
            label: '图片',
            icon: File
          },
          {
            id: '3-2-2',
            label: '视频',
            icon: File
          },
          {
            id: '3-2-3',
            label: '文档',
            icon: File
          }
        ]
      }
    ]
  },
  {
    id: '4',
    label: '系统设置',
    icon: Settings,
    children: [
      {
        id: '4-1',
        label: '基础设置',
        icon: Settings
      },
      {
        id: '4-2',
        label: '通知设置',
        icon: Bell,
        children: [
          {
            id: '4-2-1',
            label: '邮件通知',
            icon: Bell
          },
          {
            id: '4-2-2',
            label: '短信通知',
            icon: Bell
          },
          {
            id: '4-2-3',
            label: '推送通知',
            icon: Bell
          }
        ]
      }
    ]
  },
  {
    id: '5',
    label: '数据统计',
    icon: Database,
    badge: '实时'
  }
]
