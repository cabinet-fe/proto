import React, { useState, useEffect, Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Home, FileText, Menu, X } from 'lucide-react'

// 使用 Vite 的 import.meta.glob 动态导入所有页面
const pageModules = import.meta.glob('./pages/*.tsx')

interface PageInfo {
  name: string
  path: string
  component: React.LazyExoticComponent<React.ComponentType<any>>
}

function App() {
  const [pages, setPages] = useState<PageInfo[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // 处理动态导入的页面
    const pageList: PageInfo[] = Object.keys(pageModules).map(path => {
      const name = path.replace('./pages/', '').replace('.tsx', '')
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        path: name,
        component: React.lazy(
          pageModules[path] as () => Promise<{
            default: React.ComponentType<any>
          }>
        )
      }
    })

    setPages(pageList)
  }, [])

  // 获取当前路径对应的页面名称
  const getCurrentPageName = () => {
    const currentPath = location.pathname.slice(1) // 去掉开头的 '/'
    if (!currentPath || currentPath === '') return 'home'
    return currentPath
  }

  const handleNavigation = (pagePath: string) => {
    if (pagePath === 'home') {
      navigate('/')
    } else {
      navigate(`/${pagePath}`)
    }
  }

  return (
    <div className='flex h-screen bg-gray-50 overflow-hidden'>
      {/* 侧边栏 */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-white shadow-lg transition-all duration-300 flex flex-col flex-shrink-0`}
      >
        {/* 侧边栏头部 */}
        <div className='p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0'>
          {sidebarOpen && (
            <h1 className='text-xl font-bold text-gray-800'>原型平台</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className='flex-1 overflow-y-auto p-4'>
          <ul className='space-y-2'>
            {/* 首页 */}
            <li>
              <button
                onClick={() => handleNavigation('home')}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors text-left ${
                  getCurrentPageName() === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home size={20} className='mr-3 flex-shrink-0' />
                {sidebarOpen && <span className='truncate'>首页</span>}
              </button>
            </li>

            {/* 分隔线 */}
            {pages.length > 0 && (
              <li className='pt-4'>
                <div className='border-t border-gray-200 mb-4'></div>
                {sidebarOpen && (
                  <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>
                    原型页面
                  </p>
                )}
              </li>
            )}

            {/* 动态页面列表 */}
            {pages.map(page => (
              <li key={page.path}>
                <button
                  onClick={() => handleNavigation(page.path)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors text-left ${
                    getCurrentPageName() === page.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={!sidebarOpen ? page.name : undefined}
                >
                  <FileText size={20} className='mr-3 flex-shrink-0' />
                  {sidebarOpen && <span className='truncate'>{page.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 侧边栏底部 */}
        <div className='p-4 border-t border-gray-200 flex-shrink-0'>
          <div className='text-xs text-gray-500 text-center'>
            {sidebarOpen && `共 ${pages.length} 个原型页面`}
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className='flex-1 overflow-hidden flex flex-col'>
        <Routes>
          {/* 首页路由 */}
          <Route
            path='/'
            element={<HomePage pages={pages} onNavigate={handleNavigation} />}
          />

          {/* 动态页面路由 */}
          {pages.map(page => (
            <Route
              key={page.path}
              path={`/${page.path}`}
              element={
                <Suspense
                  fallback={
                    <div className='flex items-center justify-center h-64'>
                      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                    </div>
                  }
                >
                  <page.component />
                </Suspense>
              }
            />
          ))}

          {/* 404 页面 */}
          <Route
            path='*'
            element={
              <div className='text-center py-12'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                  页面未找到
                </h2>
                <p className='text-gray-600 mb-6'>您访问的页面不存在</p>
                <button
                  onClick={() => handleNavigation('home')}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  返回首页
                </button>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

// 首页组件
function HomePage({
  pages,
  onNavigate
}: {
  pages: PageInfo[]
  onNavigate: (page: string) => void
}) {
  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>原型开发平台</h1>
        <p className='text-xl text-gray-600'>
          欢迎使用原型开发平台，这里汇集了所有的原型页面
        </p>
      </div>

      {pages.length === 0 ? (
        <div className='text-center py-12'>
          <FileText size={64} className='mx-auto text-gray-400 mb-4' />
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>
            暂无原型页面
          </h3>
          <p className='text-gray-500'>
            在 pages 目录下创建 .tsx 文件来添加新的原型页面
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {pages.map(page => (
            <div
              key={page.path}
              className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200'
              onClick={() => onNavigate(page.path)}
            >
              <div className='p-6'>
                <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4'>
                  <FileText className='text-blue-600' size={24} />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {page.name}
                </h3>
                <p className='text-gray-600 text-sm'>点击查看原型页面</p>
              </div>
              <div className='px-6 py-3 bg-gray-50 border-t border-gray-200'>
                <span className='text-xs text-gray-500'>
                  路径: /{page.path}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='mt-12 text-center'>
        <div className='bg-blue-50 rounded-lg p-6 border border-blue-200'>
          <h3 className='text-lg font-semibold text-blue-900 mb-2'>开发提示</h3>
          <p className='text-blue-700 text-sm'>
            在 <code className='bg-blue-100 px-2 py-1 rounded'>pages/</code>{' '}
            目录下创建新的 .tsx 文件，系统会自动识别并添加到导航中
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
