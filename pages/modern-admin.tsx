import React, { useState } from 'react'
import { Button, Card, CardHeader, CardContent } from '../components'
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  ShoppingCart,
  Bell,
  Search,
  Menu,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Home,
  Package,
  MessageSquare,
  Calendar,
  TrendingUp,
  Activity,
  DollarSign,
  Download,
  Eye,
  MoreVertical,
  Filter,
  RefreshCw,
  Plus
} from 'lucide-react'

// 侧边栏导航数据
const navigationSections = [
  {
    title: '核心功能',
    items: [
      { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard, badge: null },
      { id: 'analytics', label: '数据分析', icon: BarChart3, badge: null },
      { id: 'users', label: '用户管理', icon: Users, badge: '128' }
    ]
  },
  {
    title: '业务管理',
    items: [
      { id: 'orders', label: '订单管理', icon: ShoppingCart, badge: '23' },
      { id: 'products', label: '商品管理', icon: Package, badge: null },
      { id: 'messages', label: '消息中心', icon: MessageSquare, badge: '5' }
    ]
  },
  {
    title: '系统设置',
    items: [
      { id: 'calendar', label: '日程安排', icon: Calendar, badge: null },
      { id: 'reports', label: '报表中心', icon: FileText, badge: null },
      { id: 'settings', label: '系统设置', icon: Settings, badge: null }
    ]
  }
]

// 统计数据
const dashboardStats = [
  {
    title: '总收入',
    value: '¥234,567',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'emerald'
  },
  {
    title: '活跃用户',
    value: '12,847',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'blue'
  },
  {
    title: '订单量',
    value: '1,429',
    change: '+23.1%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'violet'
  },
  {
    title: '转化率',
    value: '3.24%',
    change: '-2.4%',
    trend: 'down',
    icon: TrendingUp,
    color: 'orange'
  }
]

// 最近活动数据
const recentActivities = [
  {
    id: 1,
    user: '张明',
    action: '完成了订单支付',
    time: '2分钟前',
    type: 'payment',
    avatar: 'ZM'
  },
  {
    id: 2,
    user: '李华',
    action: '更新了商品信息',
    time: '15分钟前',
    type: 'update',
    avatar: 'LH'
  },
  {
    id: 3,
    user: '王芳',
    action: '发起了退款申请',
    time: '1小时前',
    type: 'refund',
    avatar: 'WF'
  },
  {
    id: 4,
    user: '陈涛',
    action: '注册成为新用户',
    time: '2小时前',
    type: 'register',
    avatar: 'CT'
  }
]

// 快速操作数据
const quickActions = [
  { label: '新建订单', icon: Plus, color: 'blue' },
  { label: '添加商品', icon: Package, color: 'green' },
  { label: '发送通知', icon: Bell, color: 'yellow' },
  { label: '生成报告', icon: FileText, color: 'purple' }
]

const ModernAdmin: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard')

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const getStatColor = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-emerald-600',
      blue: 'from-blue-500 to-blue-600',
      violet: 'from-violet-500 to-violet-600',
      orange: 'from-orange-500 to-orange-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getActivityTypeColor = (type: string) => {
    const colors = {
      payment: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      refund: 'bg-red-100 text-red-800',
      register: 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || colors.payment
  }

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* 侧边栏 */}
      <aside
        className={`left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-16' : 'w-72'
        } border-r border-gray-100`}
      >
        {/* Logo区域 */}
        <div className='h-16 flex items-center justify-between px-4 border-b border-gray-100'>
          {!sidebarCollapsed && (
            <div className='flex items-center space-x-3'>
              <div className='w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
                <Home className='w-5 h-5 text-white' />
              </div>
              <div>
                <h1 className='text-xl font-bold text-gray-900'>AdminPro</h1>
                <p className='text-xs text-gray-500'>管理系统</p>
              </div>
            </div>
          )}
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleSidebar}
            className='hover:bg-gray-100 p-2'
          >
            {sidebarCollapsed ? (
              <ChevronRight className='w-4 h-4' />
            ) : (
              <ChevronLeft className='w-4 h-4' />
            )}
          </Button>
        </div>

        {/* 导航菜单 */}
        <nav className='flex-1 p-4 space-y-6 overflow-y-auto'>
          {navigationSections.map(section => (
            <div key={section.title} className='space-y-2'>
              {!sidebarCollapsed && (
                <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider px-2'>
                  {section.title}
                </h3>
              )}
              <div className='space-y-1'>
                {section.items.map(item => {
                  const Icon = item.icon
                  const isActive = activeMenuItem === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenuItem(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <div className='flex items-center space-x-3'>
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? 'text-white' : 'text-gray-500'
                          }`}
                        />
                        {!sidebarCollapsed && (
                          <span className='font-medium'>{item.label}</span>
                        )}
                      </div>
                      {!sidebarCollapsed && item.badge && (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* 底部用户信息 */}
        {!sidebarCollapsed && (
          <div className='p-4 border-t border-gray-100'>
            <div className='flex items-center space-x-3 mb-3 p-3 rounded-xl bg-gray-50'>
              <div className='w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center'>
                <User className='w-5 h-5 text-white' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-semibold text-gray-900 truncate'>
                  系统管理员
                </p>
                <p className='text-xs text-gray-500 truncate'>
                  admin@company.com
                </p>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50'
            >
              <LogOut className='w-4 h-4 mr-2' />
              退出登录
            </Button>
          </div>
        )}
      </aside>

      {/* 主内容区域 */}
      <main className={`transition-all duration-300`}>
        {/* 顶部导航栏 */}
        <header className='h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm'>
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='sm' className='md:hidden'>
              <Menu className='w-5 h-5' />
            </Button>
            <div>
              <h1 className='text-xl font-semibold text-gray-800'>
                {navigationSections
                  .flatMap(s => s.items)
                  .find(item => item.id === activeMenuItem)?.label || '仪表盘'}
              </h1>
              <p className='text-sm text-gray-500'>欢迎回来，管理员</p>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            {/* 搜索框 */}
            <div className='relative hidden md:block'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='搜索...'
                className='pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-gray-50'
              />
            </div>

            {/* 功能按钮 */}
            <Button variant='ghost' size='sm' className='relative'>
              <Bell className='w-5 h-5' />
              <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse'></span>
            </Button>

            <Button variant='ghost' size='sm'>
              <RefreshCw className='w-5 h-5' />
            </Button>

            {/* 用户头像 */}
            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform'>
              <User className='w-4 h-4 text-white' />
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <div className='p-6 space-y-6'>
          {/* 统计卡片 */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className='border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer'
                >
                  <CardContent className='p-6'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-2'>
                        <p className='text-sm font-medium text-gray-600'>
                          {stat.title}
                        </p>
                        <div className='flex items-end space-x-2'>
                          <span className='text-2xl font-bold text-gray-900'>
                            {stat.value}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              stat.trend === 'up'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-r ${getStatColor(
                          stat.color
                        )} shadow-lg`}
                      >
                        <Icon className='w-6 h-6 text-white' />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 主要内容区域 */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* 最近活动 */}
            <Card className='lg:col-span-2 border-0 shadow-md'>
              <CardHeader className='border-b border-gray-100 pb-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    最近活动
                  </h3>
                  <div className='flex space-x-2'>
                    <Button variant='ghost' size='sm'>
                      <Filter className='w-4 h-4' />
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <MoreVertical className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  {recentActivities.map(activity => (
                    <div
                      key={activity.id}
                      className='flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer'
                    >
                      <div className='w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center'>
                        <span className='text-xs font-semibold text-gray-600'>
                          {activity.avatar}
                        </span>
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center space-x-2'>
                          <p className='text-sm font-medium text-gray-900'>
                            {activity.user}
                          </p>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getActivityTypeColor(
                              activity.type
                            )}`}
                          >
                            {activity.type}
                          </span>
                        </div>
                        <p className='text-sm text-gray-600'>
                          {activity.action}
                        </p>
                        <p className='text-xs text-gray-400'>{activity.time}</p>
                      </div>
                      <Button variant='ghost' size='sm'>
                        <Eye className='w-4 h-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 快速操作 */}
            <Card className='border-0 shadow-md'>
              <CardHeader className='border-b border-gray-100 pb-4'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  快速操作
                </h3>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-3'>
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Button
                        key={index}
                        variant='outline'
                        className='w-full justify-start hover:scale-105 transition-all duration-200'
                      >
                        <Icon
                          className={`w-4 h-4 mr-3 ${
                            action.color === 'blue'
                              ? 'text-blue-500'
                              : action.color === 'green'
                              ? 'text-green-500'
                              : action.color === 'yellow'
                              ? 'text-yellow-500'
                              : 'text-purple-500'
                          }`}
                        />
                        {action.label}
                      </Button>
                    )
                  })}
                </div>

                {/* 统计摘要 */}
                <div className='mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl'>
                  <h4 className='text-sm font-semibold text-gray-700 mb-3'>
                    今日统计
                  </h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600'>新增订单</span>
                      <span className='text-sm font-semibold text-gray-900'>
                        23
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600'>活跃用户</span>
                      <span className='text-sm font-semibold text-gray-900'>
                        1,247
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600'>收入</span>
                      <span className='text-sm font-semibold text-gray-900'>
                        ¥12,456
                      </span>
                    </div>
                  </div>
                </div>

                {/* 进度指标 */}
                <div className='mt-4'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm font-medium text-gray-700'>
                      月度目标
                    </span>
                    <span className='text-sm text-gray-500'>68%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500'
                      style={{ width: '68%' }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 数据表格 */}
          <Card className='border-0 shadow-md'>
            <CardHeader className='border-b border-gray-100 pb-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  最新订单
                </h3>
                <Button variant='outline' size='sm'>
                  <Download className='w-4 h-4 mr-2' />
                  导出
                </Button>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                        订单号
                      </th>
                      <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                        客户
                      </th>
                      <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                        金额
                      </th>
                      <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                        状态
                      </th>
                      <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                        时间
                      </th>
                      <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {[
                      {
                        id: '#ORD-001',
                        customer: '张明',
                        amount: '¥1,299.00',
                        status: '已完成',
                        time: '2024-01-15 14:30',
                        statusColor: 'bg-green-100 text-green-800'
                      },
                      {
                        id: '#ORD-002',
                        customer: '李华',
                        amount: '¥899.00',
                        status: '处理中',
                        time: '2024-01-15 13:45',
                        statusColor: 'bg-blue-100 text-blue-800'
                      },
                      {
                        id: '#ORD-003',
                        customer: '王芳',
                        amount: '¥599.00',
                        status: '待支付',
                        time: '2024-01-15 12:20',
                        statusColor: 'bg-yellow-100 text-yellow-800'
                      },
                      {
                        id: '#ORD-004',
                        customer: '陈涛',
                        amount: '¥1,599.00',
                        status: '已取消',
                        time: '2024-01-15 11:10',
                        statusColor: 'bg-red-100 text-red-800'
                      }
                    ].map((order, index) => (
                      <tr
                        key={index}
                        className='hover:bg-gray-50 transition-colors'
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {order.id}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                          {order.customer}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                          {order.amount}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${order.statusColor}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.time}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          <div className='flex space-x-2'>
                            <Button variant='ghost' size='sm'>
                              <Eye className='w-4 h-4' />
                            </Button>
                            <Button variant='ghost' size='sm'>
                              <MoreVertical className='w-4 h-4' />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default ModernAdmin
