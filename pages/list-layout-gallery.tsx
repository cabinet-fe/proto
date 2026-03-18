import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Mail, 
  ChevronRight, 
  LayoutGrid, 
  StretchHorizontal,
  Box
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const pageMeta = {
  title: '列表布局画廊'
};

// --- Mock Data ---
const DATA = [
  { id: 1, name: '项目 Alpha', category: '开发', status: '进行中', owner: '张三', updateTime: '2024-03-01' },
  { id: 2, name: '设计系统 V2', category: '设计', status: '已完成', owner: '李四', updateTime: '2024-02-28' },
  { id: 3, name: '市场调研报告', category: '市场', status: '审核中', owner: '王五', updateTime: '2024-03-02' },
  { id: 4, name: '客户反馈收集', category: '运营', status: '进行中', owner: '赵六', updateTime: '2024-03-01' },
  { id: 5, name: '后端架构重构', category: '技术', status: '已挂起', owner: '孙七', updateTime: '2024-02-20' },
];

// --- Layout 1: Seamless Minimal (无界极简) ---
const LayoutSeamless = () => (
  <div className="space-y-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    {/* Integrated Header */}
    <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 bg-gray-50/30">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">项目列表</h2>
        <p className="text-sm text-gray-500">管理您当前参与的所有活跃项目。</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="bg-white border-gray-200">
          <Download className="w-4 h-4 mr-2" /> 导出
        </Button>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> 新建项目
        </Button>
      </div>
    </div>

    {/* Search & Filter Bar - No gaps */}
    <div className="px-6 py-4 flex flex-wrap items-center gap-4 bg-white">
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          placeholder="快速搜索项目、负责人..." 
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100/50 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <select className="bg-gray-100/50 border-transparent text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100">
          <option>所有状态</option>
          <option>进行中</option>
          <option>已完成</option>
        </select>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <Filter className="w-4 h-4 mr-2" /> 高级筛选
        </Button>
      </div>
    </div>

    {/* Table Area */}
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
            <th className="px-6 py-3 font-medium">项目名称</th>
            <th className="px-6 py-3 font-medium">类别</th>
            <th className="px-6 py-3 font-medium">状态</th>
            <th className="px-6 py-3 font-medium">负责人</th>
            <th className="px-6 py-3 font-medium text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {DATA.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-400">ID: PRJ-{item.id}00</div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">{item.category}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    item.status === '进行中' ? "bg-blue-400" : 
                    item.status === '已完成' ? "bg-emerald-400" : "bg-amber-400"
                  )} />
                  {item.status}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.owner}</td>
              <td className="px-6 py-4 text-right">
                <button className="p-1 hover:bg-gray-100 rounded text-gray-400 group-hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Layout 2: Unified Card (一体化卡片) ---
const LayoutUnifiedCard = () => (
  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      {/* Combined Header & Search */}
      <div className="p-5 border-b border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">资源工作台</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">刷新</Button>
            <Button size="sm" className="bg-black text-white hover:bg-gray-800">新建资源</Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="通过关键词或 ID 搜索..." 
              className="pl-10 h-10 border-gray-200 focus:border-black focus:ring-0"
            />
          </div>
          <Button variant="outline" className="h-10 border-dashed border-gray-300">
            <Filter className="w-4 h-4 mr-2" /> 过滤器
          </Button>
        </div>
      </div>

      {/* Modern High-Density Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-600 text-left">名称</th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-left">负责人</th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-left">状态</th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-left">最后更新</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {DATA.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {item.name[0]}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{item.owner}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                    item.status === '进行中' ? "bg-blue-100 text-blue-700" : 
                    item.status === '已完成' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  )}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{item.updateTime}</td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight className="w-4 h-4 inline text-gray-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination integrated into card */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">显示 1 到 5 条，共 5 条数据</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled className="text-xs">上一页</Button>
          <Button variant="ghost" size="sm" className="text-xs">下一页</Button>
        </div>
      </div>
    </div>
  </div>
);

// --- Layout 3: Modern Floating (现代悬浮) ---
const LayoutFloating = () => (
  <div className="space-y-6">
    {/* Detached Header Card */}
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
          <Box className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">数据看板</h2>
          <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            系统运行正常
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
          <button className="px-3 py-1 text-xs font-medium bg-white rounded shadow-sm">列表</button>
          <button className="px-3 py-1 text-xs font-medium text-gray-500">网格</button>
        </div>
        <Button className="rounded-xl shadow-md shadow-indigo-100">批量操作</Button>
      </div>
    </div>

    {/* Main Table Card */}
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      {/* Integrated Search Overlay */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-2xl border border-gray-100">
          <Search className="ml-3 w-5 h-5 text-gray-400" />
          <input 
            placeholder="在所有维度中搜索..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
          <div className="h-6 w-px bg-gray-200" />
          <Button variant="ghost" size="sm" className="text-indigo-600 font-bold">搜索</Button>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">任务</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">团队</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">活跃度</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DATA.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-all duration-300">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.owner}`} alt="" />
                       </div>
                       <div>
                         <div className="text-sm font-bold text-gray-800">{item.name}</div>
                         <div className="text-xs text-gray-500">{item.category}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                            {String.fromCharCode(64 + i + item.id)}
                          </div>
                        ))}
                     </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-indigo-500 rounded-full" 
                         style={{ width: `${Math.random() * 60 + 20}%` }}
                       />
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-indigo-600">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
const ListLayoutGallery = () => {
  const [activeLayout, setActiveLayout] = useState<'seamless' | 'unified' | 'floating'>('seamless');

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Sticky Controller */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <LayoutGrid className="text-indigo-600" />
              列表布局实验室
            </h1>
            <p className="text-sm text-gray-500">探索工具栏、搜索栏与表格的最佳融合方案</p>
          </div>
          
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveLayout('seamless')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeLayout === 'seamless' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <StretchHorizontal className="w-4 h-4" /> 无界极简
            </button>
            <button 
              onClick={() => setActiveLayout('unified')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeLayout === 'unified' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Box className="w-4 h-4" /> 一体卡片
            </button>
            <button 
              onClick={() => setActiveLayout('floating')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeLayout === 'floating' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <LayoutGrid className="w-4 h-4" /> 现代悬浮
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-widest">
            当前预览: {activeLayout}
          </div>
        </div>

        {/* Transition area - using simple conditional for now */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeLayout === 'seamless' && <LayoutSeamless />}
          {activeLayout === 'unified' && <LayoutUnifiedCard />}
          {activeLayout === 'floating' && <LayoutFloating />}
        </div>
        
        {/* Comparison Footnote */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 rounded-xl border border-dashed border-gray-300">
            <h4 className="font-bold text-sm mb-2 text-gray-700">设计要点: 无界极简</h4>
            <ul className="text-xs text-gray-500 space-y-1 list-disc ml-4">
              <li>去除容器内外边距，最大化表格利用空间。</li>
              <li>工具栏与表格标题共享背景色，建立视觉锚点。</li>
              <li>搜索栏通过背景色区分而非边框，降低视觉噪音。</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-dashed border-gray-300">
            <h4 className="font-bold text-sm mb-2 text-gray-700">设计要点: 一体卡片</h4>
            <ul className="text-xs text-gray-500 space-y-1 list-disc ml-4">
              <li>标准的后台管理风格，适合复杂的筛选条件。</li>
              <li>搜索框作为 Header 的主要动作，引导用户交互。</li>
              <li>底部分页器封装在卡片内，形成完整的操作闭环。</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-dashed border-gray-300">
            <h4 className="font-bold text-sm mb-2 text-gray-700">设计要点: 现代悬浮</h4>
            <ul className="text-xs text-gray-500 space-y-1 list-disc ml-4">
              <li>通过阴影（Drop Shadow）区分功能模块。</li>
              <li>大面积留白与圆角，呈现 SaaS 产品的时尚感。</li>
              <li>搜索框采用内嵌式设计，像控制台一样精准。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListLayoutGallery;
