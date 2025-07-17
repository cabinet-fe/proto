import React, { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardContent } from '../components'
import {
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Rocket,
  Globe,
  Brain,
  Target,
  Shield,
  Star,
  Heart,
  Coffee,
  Palette,
  Music,
  Camera,
  Gamepad2,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Filter,
  MoreHorizontal,
  Bell,
  Settings,
  Search,
  Moon,
  Sun,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Workflow
} from 'lucide-react'

// 动态背景颜色主题
const themes = [
  {
    name: 'sunset',
    gradient: 'from-orange-400 via-pink-500 to-purple-600',
    secondary: 'from-orange-100 to-pink-100',
    accent: 'text-orange-600'
  },
  {
    name: 'ocean',
    gradient: 'from-blue-400 via-cyan-500 to-teal-600',
    secondary: 'from-blue-100 to-cyan-100',
    accent: 'text-blue-600'
  },
  {
    name: 'forest',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    secondary: 'from-green-100 to-emerald-100',
    accent: 'text-green-600'
  },
  {
    name: 'cosmic',
    gradient: 'from-purple-400 via-pink-500 to-indigo-600',
    secondary: 'from-purple-100 to-pink-100',
    accent: 'text-purple-600'
  }
]

// 创新的导航菜单数据
const navSections = [
  {
    title: '创意工坊',
    items: [
      {
        id: 'inspiration',
        label: '灵感池',
        icon: Sparkles,
        color: 'text-yellow-500'
      },
      { id: 'palette', label: '调色板', icon: Palette, color: 'text-pink-500' },
      { id: 'music', label: '音律空间', icon: Music, color: 'text-purple-500' }
    ]
  },
  {
    title: '数据宇宙',
    items: [
      {
        id: 'analytics',
        label: '星系分析',
        icon: Brain,
        color: 'text-cyan-500'
      },
      {
        id: 'trends',
        label: '趋势流',
        icon: TrendingUp,
        color: 'text-green-500'
      },
      {
        id: 'insights',
        label: '洞察引擎',
        icon: Target,
        color: 'text-blue-500'
      }
    ]
  },
  {
    title: '社交星球',
    items: [
      {
        id: 'community',
        label: '星际社区',
        icon: Users,
        color: 'text-orange-500'
      },
      {
        id: 'interactions',
        label: '互动场',
        icon: Heart,
        color: 'text-red-500'
      },
      {
        id: 'events',
        label: '时空集会',
        icon: Calendar,
        color: 'text-indigo-500'
      }
    ]
  }
]

// 创新的统计卡片数据
const creativeStats = [
  {
    title: '创意火花',
    value: '2.4k',
    trend: '+23%',
    icon: Sparkles,
    gradient: 'from-yellow-400 to-orange-500',
    description: '本周新增灵感'
  },
  {
    title: '能量值',
    value: '98.2%',
    trend: '+5%',
    icon: Zap,
    gradient: 'from-blue-400 to-purple-500',
    description: '系统活跃度'
  },
  {
    title: '探索者',
    value: '15.6k',
    trend: '+12%',
    icon: Rocket,
    gradient: 'from-green-400 to-cyan-500',
    description: '活跃用户数'
  },
  {
    title: '宇宙连接',
    value: '847',
    trend: '+8%',
    icon: Globe,
    gradient: 'from-pink-400 to-red-500',
    description: '全球节点'
  }
]

// 活动数据
const activities = [
  {
    type: 'creation',
    user: '设计师Alice',
    action: '创建了新的色彩方案',
    time: '2分钟前',
    icon: Palette,
    color: 'bg-gradient-to-r from-pink-500 to-purple-500'
  },
  {
    type: 'collaboration',
    user: '音乐家Bob',
    action: '分享了灵感音律',
    time: '5分钟前',
    icon: Music,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    type: 'discovery',
    user: '探索者Carol',
    action: '发现了新的数据星系',
    time: '8分钟前',
    icon: Brain,
    color: 'bg-gradient-to-r from-green-500 to-teal-500'
  },
  {
    type: 'connection',
    user: '连接者David',
    action: '建立了跨维度链接',
    time: '12分钟前',
    icon: Globe,
    color: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
]

// 快速行动按钮
const quickActions = [
  { label: '启动创意', icon: Sparkles, color: 'from-yellow-400 to-orange-500' },
  { label: '数据探索', icon: Brain, color: 'from-blue-400 to-purple-500' },
  { label: '建立连接', icon: Heart, color: 'from-pink-400 to-red-500' },
  { label: '时空跳跃', icon: Rocket, color: 'from-green-400 to-cyan-500' }
]

const CreativeAdmin: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('inspiration')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [timeOfDay, setTimeOfDay] = useState('')

  // 动态主题切换
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme(prev => (prev + 1) % themes.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // 获取时间段问候语
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 6) setTimeOfDay('深夜好')
    else if (hour < 12) setTimeOfDay('早上好')
    else if (hour < 18) setTimeOfDay('下午好')
    else setTimeOfDay('晚上好')
  }, [])

  const theme = themes[currentTheme]

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* 动态背景 */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${theme.gradient} opacity-10 blur-3xl animate-pulse transition-all duration-1000`}
        ></div>
        <div
          className={`absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr ${theme.gradient} opacity-5 blur-3xl animate-pulse transition-all duration-1000`}
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* 左侧创意导航栏 */}
      <aside
        className={`fixed left-0 top-0 h-full transition-all duration-500 z-30 ${
          sidebarExpanded ? 'w-80' : 'w-20'
        } ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-xl border-r border-white/20`}
      >
        {/* 头部Logo区域 */}
        <div className='h-20 flex items-center justify-between px-6 border-b border-white/10'>
          {sidebarExpanded && (
            <div className='flex items-center space-x-3'>
              <div
                className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center transform hover:scale-110 transition-transform`}
              >
                <Sparkles className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1
                  className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  创意星云
                </h1>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Creative Nebula
                </p>
              </div>
            </div>
          )}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className={`${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <ChevronRight
              className={`w-5 h-5 transition-transform ${
                sidebarExpanded ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </div>

        {/* 时间问候 */}
        {sidebarExpanded && (
          <div className='px-6 py-4'>
            <div
              className={`p-4 rounded-2xl bg-gradient-to-r ${theme.secondary} border border-white/20`}
            >
              <div className='flex items-center space-x-2'>
                <Clock className={`w-5 h-5 ${theme.accent}`} />
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {timeOfDay}，创造者！
                </span>
              </div>
              <p
                className={`text-xs mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                今天又是充满无限可能的一天
              </p>
            </div>
          </div>
        )}

        {/* 导航菜单 */}
        <nav className='flex-1 px-4 space-y-6 overflow-y-auto'>
          {navSections.map((section, sectionIndex) => (
            <div key={section.title} className='space-y-2'>
              {sidebarExpanded && (
                <h3
                  className={`text-xs font-semibold uppercase tracking-wider px-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {section.title}
                </h3>
              )}
              {section.items.map(item => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 group ${
                      isActive
                        ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg transform scale-105`
                        : `${
                            isDarkMode
                              ? 'hover:bg-gray-700/50 text-gray-300'
                              : 'hover:bg-gray-100 text-gray-600'
                          } hover:scale-102`
                    }`}
                    title={!sidebarExpanded ? item.label : undefined}
                  >
                    <div
                      className={`p-2 rounded-xl ${
                        isActive ? 'bg-white/20' : 'bg-gray-100'
                      } transition-colors`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? 'text-white' : item.color
                        }`}
                      />
                    </div>
                    {sidebarExpanded && (
                      <span className='font-medium'>{item.label}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* 底部快速操作 */}
        {sidebarExpanded && (
          <div className='p-4 border-t border-white/10'>
            <Button
              className={`w-full bg-gradient-to-r ${theme.gradient} hover:scale-105 transition-transform shadow-lg`}
            >
              <Plus className='w-4 h-4 mr-2' />
              新建创意项目
            </Button>
          </div>
        )}
      </aside>

      {/* 主内容区域 */}
      <main
        className={`transition-all duration-500 ${
          sidebarExpanded ? 'ml-80' : 'ml-20'
        } relative z-10`}
      >
        {/* 顶部工具栏 */}
        <header
          className={`h-20 ${
            isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
          } backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-8`}
        >
          <div className='flex items-center space-x-6'>
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              {navSections
                .flatMap(s => s.items)
                .find(i => i.id === activeSection)?.label || '灵感池'}
            </h2>
            <div className='flex items-center space-x-2'>
              {themes.map((t, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTheme(index)}
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                    t.gradient
                  } ${
                    index === currentTheme
                      ? 'ring-2 ring-white shadow-lg scale-125'
                      : 'hover:scale-110'
                  } transition-all`}
                />
              ))}
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            {/* 搜索框 */}
            <div className='relative'>
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
              <input
                type='text'
                placeholder='搜索宇宙...'
                className={`pl-10 pr-4 py-2 rounded-xl border-0 ${
                  isDarkMode
                    ? 'bg-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                } focus:ring-2 focus:ring-purple-500 transition-all w-64`}
              />
            </div>

            {/* 工具按钮 */}
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? (
                <Sun className='w-5 h-5' />
              ) : (
                <Moon className='w-5 h-5' />
              )}
            </Button>

            <Button variant='ghost' size='sm' className='relative'>
              <Bell className='w-5 h-5' />
              <span className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse'></span>
            </Button>

            <Button variant='ghost' size='sm'>
              <Settings className='w-5 h-5' />
            </Button>

            {/* 用户头像 */}
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.gradient} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg`}
            >
              <span className='text-white font-bold'>A</span>
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <div className='p-8 space-y-8'>
          {/* 创意统计卡片 */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {creativeStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className={`${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
                  } backdrop-blur-xl border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group shadow-xl`}
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between'>
                      <div className='space-y-2'>
                        <p
                          className={`text-sm font-medium ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {stat.title}
                        </p>
                        <div className='flex items-end space-x-2'>
                          <span
                            className={`text-3xl font-bold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {stat.value}
                          </span>
                          <span className='text-green-500 text-sm font-medium flex items-center'>
                            <ArrowUpRight className='w-4 h-4' />
                            {stat.trend}
                          </span>
                        </div>
                        <p
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}
                        >
                          {stat.description}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className='w-6 h-6 text-white' />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 主要内容网格 */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* 活动流 */}
            <Card
              className={`lg:col-span-2 ${
                isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
              } backdrop-blur-xl border-white/20 shadow-xl`}
            >
              <CardHeader className='border-b border-white/10 pb-4'>
                <div className='flex items-center justify-between'>
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    宇宙活动流
                  </h3>
                  <Button variant='ghost' size='sm'>
                    <Filter className='w-4 h-4' />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  {activities.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-4 p-4 rounded-2xl ${
                          isDarkMode
                            ? 'hover:bg-gray-700/50'
                            : 'hover:bg-gray-50'
                        } transition-all duration-300 cursor-pointer group`}
                      >
                        <div
                          className={`p-3 rounded-2xl ${activity.color} shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <Icon className='w-5 h-5 text-white' />
                        </div>
                        <div className='flex-1'>
                          <p
                            className={`font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {activity.user}
                          </p>
                          <p
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {activity.action}
                          </p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          >
                            {activity.time}
                          </p>
                        </div>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='w-4 h-4' />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 快速行动面板 */}
            <Card
              className={`${
                isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
              } backdrop-blur-xl border-white/20 shadow-xl`}
            >
              <CardHeader className='border-b border-white/10 pb-4'>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  量子跳跃
                </h3>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Button
                        key={index}
                        className={`w-full justify-start p-4 h-auto bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 shadow-lg group`}
                      >
                        <Icon className='w-5 h-5 mr-3 group-hover:rotate-12 transition-transform' />
                        <span className='font-medium'>{action.label}</span>
                      </Button>
                    )
                  })}
                </div>

                {/* 能量条 */}
                <div className='mt-6 space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      创意能量
                    </span>
                    <span className={`text-sm ${theme.accent}`}>87%</span>
                  </div>
                  <div
                    className={`h-2 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } rounded-full overflow-hidden`}
                  >
                    <div
                      className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transition-all duration-1000 animate-pulse`}
                      style={{ width: '87%' }}
                    ></div>
                  </div>
                </div>

                {/* 今日目标 */}
                <div className='mt-6'>
                  <h4
                    className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } mb-3`}
                  >
                    今日创意目标
                  </h4>
                  <div className='space-y-2'>
                    {[
                      '完成3个灵感碎片',
                      '连接2个创意节点',
                      '探索新的数据维度'
                    ].map((goal, index) => (
                      <div key={index} className='flex items-center space-x-2'>
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
                        ></div>
                        <span
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {goal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 数据可视化区域 */}
          <Card
            className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
            } backdrop-blur-xl border-white/20 shadow-xl`}
          >
            <CardHeader className='border-b border-white/10 pb-4'>
              <div className='flex items-center justify-between'>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  创意数据星云
                </h3>
                <div className='flex space-x-2'>
                  <Button variant='ghost' size='sm'>
                    <BarChart3 className='w-4 h-4' />
                  </Button>
                  <Button variant='ghost' size='sm'>
                    <PieChart className='w-4 h-4' />
                  </Button>
                  <Button variant='ghost' size='sm'>
                    <Activity className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* 创意分布 */}
                <div className='space-y-4'>
                  <h4
                    className={`font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    创意类型分布
                  </h4>
                  <div className='space-y-3'>
                    {[
                      {
                        label: '视觉设计',
                        value: 35,
                        color: 'from-pink-500 to-rose-500'
                      },
                      {
                        label: '音频创作',
                        value: 28,
                        color: 'from-blue-500 to-cyan-500'
                      },
                      {
                        label: '数据艺术',
                        value: 22,
                        color: 'from-green-500 to-emerald-500'
                      },
                      {
                        label: '互动体验',
                        value: 15,
                        color: 'from-purple-500 to-violet-500'
                      }
                    ].map((item, index) => (
                      <div key={index} className='space-y-1'>
                        <div className='flex justify-between items-center'>
                          <span
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {item.value}%
                          </span>
                        </div>
                        <div
                          className={`h-2 ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                          } rounded-full overflow-hidden`}
                        >
                          <div
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 活跃时间 */}
                <div className='space-y-4'>
                  <h4
                    className={`font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    创意活跃时间
                  </h4>
                  <div className='grid grid-cols-7 gap-1'>
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className='space-y-1'>
                        <div
                          className={`text-xs text-center ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {['一', '二', '三', '四', '五', '六', '日'][i]}
                        </div>
                        <div className='space-y-1'>
                          {Array.from({ length: 24 }, (_, j) => {
                            const intensity = Math.random()
                            return (
                              <div
                                key={j}
                                className={`w-3 h-1 rounded-full ${
                                  intensity > 0.7
                                    ? `bg-gradient-to-r ${theme.gradient}`
                                    : intensity > 0.4
                                    ? `bg-gradient-to-r ${theme.gradient} opacity-60`
                                    : intensity > 0.2
                                    ? `bg-gradient-to-r ${theme.gradient} opacity-30`
                                    : isDarkMode
                                    ? 'bg-gray-700'
                                    : 'bg-gray-200'
                                }`}
                              />
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 趋势指标 */}
                <div className='space-y-4'>
                  <h4
                    className={`font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    创意趋势
                  </h4>
                  <div className='space-y-4'>
                    {[
                      { label: '灵感产出', current: 847, change: 23 },
                      { label: '协作项目', current: 156, change: 12 },
                      { label: '突破次数', current: 34, change: 45 },
                      { label: '影响力', current: 2847, change: 18 }
                    ].map((trend, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between'
                      >
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {trend.label}
                          </p>
                          <p
                            className={`text-lg font-bold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {trend.current.toLocaleString()}
                          </p>
                        </div>
                        <div
                          className={`flex items-center space-x-1 ${
                            trend.change > 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {trend.change > 0 ? (
                            <ArrowUpRight className='w-4 h-4' />
                          ) : (
                            <ArrowDownRight className='w-4 h-4' />
                          )}
                          <span className='text-sm font-medium'>
                            {Math.abs(trend.change)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default CreativeAdmin
