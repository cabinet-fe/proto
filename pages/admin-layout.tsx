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
  Home
} from 'lucide-react'

// 导航菜单数据
const navigationItems = [
  {
    id: 'dashboard',
    label: '仪表盘',
    icon: LayoutDashboard,
    href: '/dashboard'
  },
  { id: 'users', label: '用户管理', icon: Users, href: '/users' },
  { id: 'orders', label: '订单管理', icon: ShoppingCart, href: '/orders' },
  { id: 'products', label: '商品管理', icon: FileText, href: '/products' },
  { id: 'analytics', label: '数据分析', icon: BarChart3, href: '/analytics' },
  { id: 'settings', label: '系统设置', icon: Settings, href: '/settings' }
]

// 快捷统计数据
const statsData = [
  {
    title: '总用户数',
    value: '12,345',
    change: '+12%',
    color: 'text-blue-600'
  },
  { title: '今日订单', value: '256', change: '+5%', color: 'text-green-600' },
  {
    title: '总收入',
    value: '¥89,234',
    change: '+18%',
    color: 'text-purple-600'
  },
  { title: '待处理', value: '23', change: '-3%', color: 'text-orange-600' }
]

const AdminLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard')

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* 侧边栏 */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } flex flex-col`}
      >
        {/* Logo 区域 */}
        <div className='h-16 flex items-center justify-between px-4 border-b border-gray-200'>
          {!sidebarCollapsed && (
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Home className='w-5 h-5 text-white' />
              </div>
              <span className='text-xl font-bold text-gray-800'>管理系统</span>
            </div>
          )}
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleSidebar}
            className='p-2'
          >
            {sidebarCollapsed ? (
              <ChevronRight className='w-4 h-4' />
            ) : (
              <ChevronLeft className='w-4 h-4' />
            )}
          </Button>
        </div>

        {/* 导航菜单 */}
        <nav className='flex-1 py-4 space-y-1 px-2'>
          {navigationItems.map(item => {
            const Icon = item.icon
            const isActive = activeMenuItem === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveMenuItem(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className='w-5 h-5 flex-shrink-0' />
                {!sidebarCollapsed && (
                  <span className='font-medium'>{item.label}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* 用户信息 */}
        {!sidebarCollapsed && (
          <div className='p-4 border-t border-gray-200'>
            <div className='flex items-center space-x-3 mb-3'>
              <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
                <User className='w-4 h-4 text-gray-600' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate'>
                  管理员
                </p>
                <p className='text-xs text-gray-500 truncate'>
                  admin@example.com
                </p>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start text-gray-600'
            >
              <LogOut className='w-4 h-4 mr-2' />
              退出登录
            </Button>
          </div>
        )}
      </aside>

      {/* 主内容区域 */}
      <main className='flex-1 flex flex-col'>
        {/* 顶部导航栏 */}
        <header className='bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6'>
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='sm' className='md:hidden'>
              <Menu className='w-5 h-5' />
            </Button>
            <h1 className='text-xl font-semibold text-gray-800'>
              {navigationItems.find(item => item.id === activeMenuItem)
                ?.label || '仪表盘'}
            </h1>
          </div>

          <div className='flex items-center space-x-4'>
            {/* 搜索框 */}
            <div className='relative hidden md:block'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='搜索...'
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64'
              />
            </div>

            {/* 通知铃铛 */}
            <Button variant='ghost' size='sm' className='relative'>
              <Bell className='w-5 h-5' />
              <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center'>
                <span className='text-xs text-white font-bold'>3</span>
              </span>
            </Button>

            {/* 用户头像 */}
            <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
              <User className='w-4 h-4 text-gray-600' />
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <div className='flex-1 p-6 space-y-6 overflow-auto'>
          {/* 统计卡片 */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {statsData.map((stat, index) => (
              <Card key={index} className='border-0 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        {stat.title}
                      </p>
                      <p className='text-2xl font-bold text-gray-900 mt-2'>
                        {stat.value}
                      </p>
                      <p className={`text-sm mt-1 ${stat.color}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        stat.color === 'text-blue-600'
                          ? 'bg-blue-100'
                          : stat.color === 'text-green-600'
                          ? 'bg-green-100'
                          : stat.color === 'text-purple-600'
                          ? 'bg-purple-100'
                          : 'bg-orange-100'
                      }`}
                    >
                      <BarChart3 className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 主要内容区域 */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* 最近活动 */}
            <Card className='lg:col-span-2 border-0 shadow-sm'>
              <CardHeader className='border-b border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  最近活动
                </h3>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  {[
                    {
                      action: '新用户注册',
                      user: '张三',
                      time: '2分钟前',
                      type: 'success'
                    },
                    {
                      action: '订单支付完成',
                      user: '李四',
                      time: '5分钟前',
                      type: 'info'
                    },
                    {
                      action: '商品库存不足',
                      user: '系统',
                      time: '10分钟前',
                      type: 'warning'
                    },
                    {
                      action: '数据备份完成',
                      user: '系统',
                      time: '1小时前',
                      type: 'success'
                    }
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50'
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === 'success'
                            ? 'bg-green-500'
                            : activity.type === 'info'
                            ? 'bg-blue-500'
                            : activity.type === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                        }`}
                      />
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-900'>
                          {activity.action}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 快速操作 */}
            <Card className='border-0 shadow-sm'>
              <CardHeader className='border-b border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  快速操作
                </h3>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-3'>
                  <Button className='w-full justify-start' variant='outline'>
                    <Users className='w-4 h-4 mr-2' />
                    添加新用户
                  </Button>
                  <Button className='w-full justify-start' variant='outline'>
                    <FileText className='w-4 h-4 mr-2' />
                    创建商品
                  </Button>
                  <Button className='w-full justify-start' variant='outline'>
                    <Settings className='w-4 h-4 mr-2' />
                    系统配置
                  </Button>
                  <Button className='w-full justify-start' variant='outline'>
                    <BarChart3 className='w-4 h-4 mr-2' />
                    生成报告
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 数据表格示例 */}
          <Card className='border-0 shadow-sm'>
            <CardHeader className='border-b border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-900'>最新订单</h3>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        订单号
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        客户
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        金额
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        状态
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        时间
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {[
                      {
                        id: '#12345',
                        customer: '张三',
                        amount: '¥299.00',
                        status: '已完成',
                        time: '2024-01-15 14:30'
                      },
                      {
                        id: '#12346',
                        customer: '李四',
                        amount: '¥199.00',
                        status: '处理中',
                        time: '2024-01-15 13:45'
                      },
                      {
                        id: '#12347',
                        customer: '王五',
                        amount: '¥399.00',
                        status: '待支付',
                        time: '2024-01-15 12:20'
                      }
                    ].map((order, index) => (
                      <tr key={index} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {order.id}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.customer}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.amount}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === '已完成'
                                ? 'bg-green-100 text-green-800'
                                : order.status === '处理中'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.time}
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

export default AdminLayout
