import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpDown,
  Settings2,
  RefreshCw,
  Columns3,
  Terminal,
  FileText,
  Layers,
  PanelLeftClose,
  Hash,
  Clock,
  Tag,
  User,
  CheckCircle2,
  Circle,
  Timer,
  AlertCircle,
  TrendingUp,
  Activity,
  Zap,
  Eye,
  Trash2,
  Edit3,
  Copy,
  Star,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from '../components/Button';

export const pageMeta = {
  title: '列表布局展示'
};

// ──────────────────────────────────────────────
// Mock Data
// ──────────────────────────────────────────────
const MOCK_DATA = [
  { id: 'TSK-1024', title: '重构用户认证模块', assignee: '陈默', status: 'active', priority: 'high', category: '后端', progress: 72, updated: '10 分钟前', starred: true },
  { id: 'TSK-1025', title: '设计系统暗色主题适配', assignee: '林曦', status: 'review', priority: 'medium', category: '设计', progress: 95, updated: '1 小时前', starred: false },
  { id: 'TSK-1026', title: '移动端首页性能优化', assignee: '王远', status: 'active', priority: 'high', category: '前端', progress: 45, updated: '3 小时前', starred: true },
  { id: 'TSK-1027', title: 'API 网关限流策略调整', assignee: '赵明', status: 'pending', priority: 'low', category: '运维', progress: 0, updated: '昨天', starred: false },
  { id: 'TSK-1028', title: '用户行为埋点数据清洗', assignee: '孙颖', status: 'done', priority: 'medium', category: '数据', progress: 100, updated: '2 天前', starred: false },
  { id: 'TSK-1029', title: '国际化多语言包更新', assignee: '张宇', status: 'active', priority: 'medium', category: '前端', progress: 33, updated: '4 小时前', starred: false },
  { id: 'TSK-1030', title: '支付回调异常排查', assignee: '李峰', status: 'review', priority: 'high', category: '后端', progress: 88, updated: '30 分钟前', starred: true },
];

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  active: { label: '进行中', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
  review: { label: '审核中', icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50' },
  pending: { label: '待处理', icon: Circle, color: 'text-gray-500', bg: 'bg-gray-100' },
  done: { label: '已完成', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
};

const PRIORITY_CONFIG: Record<string, { label: string; dot: string }> = {
  high: { label: '高', dot: 'bg-rose-500' },
  medium: { label: '中', dot: 'bg-amber-400' },
  low: { label: '低', dot: 'bg-slate-300' },
};

// ──────────────────────────────────────────────
// Layout 1: 暗色控制台 (Dark Console)
// 深色 header 自然过渡到表格，运维/监控面板风格
// ──────────────────────────────────────────────
const LayoutDarkConsole = () => (
  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200">
    {/* Dark Header Band */}
    <div className="bg-slate-900 text-white px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-tight">任务控制台</h2>
            <p className="text-xs text-slate-400">7 个任务 · 3 个进行中</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-sm font-medium text-slate-900 transition-colors flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> 新任务
          </button>
        </div>
      </div>
      {/* Search Bar - Dark integrated */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            placeholder="搜索任务 ID、标题、负责人..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> 筛选
          </button>
          <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5">
            <Columns3 className="w-3.5 h-3.5" /> 列
          </button>
        </div>
      </div>
    </div>

    {/* Table - Light body, seamless connection */}
    <div className="bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80">
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 tracking-wide">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 tracking-wide">任务</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 tracking-wide">状态</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 tracking-wide">优先级</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 tracking-wide">进度</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 tracking-wide">更新</th>
            <th className="px-6 py-3 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {MOCK_DATA.map((item, i) => {
            const st = STATUS_CONFIG[item.status];
            const pr = PRIORITY_CONFIG[item.priority];
            return (
              <tr key={item.id} className={cn("border-b border-slate-50 hover:bg-slate-50/80 transition-colors group", i === MOCK_DATA.length - 1 && "border-b-0")}>
                <td className="px-6 py-3.5">
                  <code className="text-xs font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{item.id}</code>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">{item.title}</span>
                    {item.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.assignee} · {item.category}</div>
                </td>
                <td className="px-6 py-3.5">
                  <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md", st.bg, st.color)}>
                    <st.icon className="w-3 h-3" /> {st.label}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-2 h-2 rounded-full", pr.dot)} />
                    <span className="text-xs text-slate-600">{pr.label}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", item.progress === 100 ? "bg-emerald-500" : "bg-blue-500")}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono w-8 text-right">{item.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-xs text-slate-400">{item.updated}</td>
                <td className="px-6 py-3.5">
                  <button className="p-1 rounded hover:bg-slate-100 text-slate-300 group-hover:text-slate-500 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        <span className="text-xs text-slate-400">共 {MOCK_DATA.length} 条记录</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((p) => (
            <button key={p} className={cn("w-7 h-7 rounded text-xs font-medium transition-colors", p === 1 ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100")}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ──────────────────────────────────────────────
// Layout 2: 线性融合 (Linear Blend)
// 受 Linear 启发，无明显分隔，通过微妙色差引导
// ──────────────────────────────────────────────
const LayoutLinearBlend = () => {
  const [activeTab, setActiveTab] = useState('all');
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header row */}
      <div className="px-5 pt-4 pb-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">任务列表</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-500 h-7 px-2">
              <Download className="w-3.5 h-3.5 mr-1.5" /> 导出
            </Button>
            <Button size="sm" className="h-7 bg-violet-600 hover:bg-violet-700 text-white rounded-md shadow-none">
              <Plus className="w-3.5 h-3.5 mr-1" /> 新建
            </Button>
          </div>
        </div>

        {/* Tabs + Search inline */}
        <div className="flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-0">
            {[
              { key: 'all', label: '全部', count: 7 },
              { key: 'active', label: '进行中', count: 3 },
              { key: 'review', label: '审核中', count: 2 },
              { key: 'done', label: '已完成', count: 1 },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium border-b-2 transition-colors relative -mb-px",
                  activeTab === tab.key
                    ? "border-violet-600 text-violet-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                {tab.label}
                <span className={cn(
                  "ml-1.5 text-xs px-1.5 py-0.5 rounded-full",
                  activeTab === tab.key ? "bg-violet-100 text-violet-700" : "bg-gray-100 text-gray-500"
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                placeholder="筛选..."
                className="w-44 pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
              />
            </div>
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors">
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-400 uppercase tracking-wider">
            <th className="px-5 py-2.5 text-left font-medium">任务</th>
            <th className="px-5 py-2.5 text-left font-medium">负责人</th>
            <th className="px-5 py-2.5 text-left font-medium">状态</th>
            <th className="px-5 py-2.5 text-left font-medium">优先级</th>
            <th className="px-5 py-2.5 text-left font-medium">更新时间</th>
            <th className="px-5 py-2.5 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {MOCK_DATA.map((item) => {
            const st = STATUS_CONFIG[item.status];
            const pr = PRIORITY_CONFIG[item.priority];
            return (
              <tr key={item.id} className="border-t border-gray-50 hover:bg-violet-50/30 transition-colors group">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-mono text-gray-400">{item.id}</span>
                    <span className="font-medium text-gray-800">{item.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                      {item.assignee[0]}
                    </div>
                    <span className="text-sm text-gray-600">{item.assignee}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={cn("inline-flex items-center gap-1 text-xs font-medium", st.color)}>
                    <st.icon className="w-3.5 h-3.5" /> {st.label}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full", pr.dot)} />
                    <span className="text-xs text-gray-500">{pr.label}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs text-gray-400">{item.updated}</td>
                <td className="px-5 py-3">
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-300 opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer */}
      <div className="px-5 py-2.5 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">{MOCK_DATA.length} 条任务</span>
        <button className="text-xs text-violet-600 hover:text-violet-700 font-medium">查看全部</button>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Layout 3: Notion 文档流 (Notion Flow)
// 极简文档风格，行内搜索，几乎无边框
// ──────────────────────────────────────────────
const LayoutNotionFlow = () => (
  <div className="max-w-4xl mx-auto">
    {/* Breadcrumb */}
    <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-1 px-1">
      <span className="hover:bg-gray-100 px-1.5 py-0.5 rounded cursor-pointer transition-colors">工作区</span>
      <span>/</span>
      <span className="hover:bg-gray-100 px-1.5 py-0.5 rounded cursor-pointer transition-colors">项目管理</span>
      <span>/</span>
      <span className="text-gray-600">任务看板</span>
    </div>

    {/* Title Area - Notion style large title */}
    <div className="px-1 mb-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-1 hover:bg-gray-50 rounded-md px-1 -mx-1 transition-colors cursor-text">
        Sprint #14 任务清单
      </h1>
      <p className="text-gray-400 text-sm px-1 hover:bg-gray-50 rounded-md -mx-0 py-1 transition-colors cursor-text">
        2024年3月 · 迭代周期 3.1 - 3.15 · 点击编辑描述
      </p>
    </div>

    {/* Inline Controls - Notion filter style */}
    <div className="flex flex-wrap items-center gap-2 px-1 mb-3">
      <button className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
        <Filter className="w-3.5 h-3.5" /> 筛选
      </button>
      <button className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
        <ArrowUpDown className="w-3.5 h-3.5" /> 排序
      </button>
      <button className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
        <Search className="w-3.5 h-3.5" /> 搜索
      </button>
      <div className="h-4 w-px bg-gray-200 mx-1" />
      <button className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
        <Plus className="w-3.5 h-3.5" /> 新建
      </button>
    </div>

    {/* Table - Minimal, document-like */}
    <div className="border-t border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="text-xs text-gray-400">
            <th className="text-left py-2 px-2 font-normal border-b border-gray-100">
              <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5 -mx-1 cursor-pointer transition-colors">
                <FileText className="w-3 h-3" /> 名称
              </div>
            </th>
            <th className="text-left py-2 px-2 font-normal border-b border-gray-100 w-24">
              <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5 -mx-1 cursor-pointer transition-colors">
                <Tag className="w-3 h-3" /> 状态
              </div>
            </th>
            <th className="text-left py-2 px-2 font-normal border-b border-gray-100 w-24">
              <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5 -mx-1 cursor-pointer transition-colors">
                <User className="w-3 h-3" /> 负责人
              </div>
            </th>
            <th className="text-left py-2 px-2 font-normal border-b border-gray-100 w-24">
              <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5 -mx-1 cursor-pointer transition-colors">
                <AlertCircle className="w-3 h-3" /> 优先级
              </div>
            </th>
            <th className="text-left py-2 px-2 font-normal border-b border-gray-100 w-28">
              <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5 -mx-1 cursor-pointer transition-colors">
                <Clock className="w-3 h-3" /> 更新
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_DATA.map((item) => {
            const st = STATUS_CONFIG[item.status];
            const pr = PRIORITY_CONFIG[item.priority];
            return (
              <tr key={item.id} className="group hover:bg-gray-50/80 transition-colors border-b border-gray-50">
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 group-hover:text-gray-400 transition-colors cursor-grab">⋮⋮</span>
                    <div className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                      {item.status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <span className="text-sm text-gray-800 hover:underline cursor-pointer">{item.title}</span>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <span className={cn("text-xs px-1.5 py-0.5 rounded", st.bg, st.color)}>{st.label}</span>
                </td>
                <td className="py-2 px-2 text-sm text-gray-500">{item.assignee}</td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <span className={cn("w-2 h-2 rounded-sm", pr.dot)} />
                    <span className="text-xs text-gray-500">{pr.label}</span>
                  </div>
                </td>
                <td className="py-2 px-2 text-xs text-gray-400">{item.updated}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Add row - Notion style */}
      <button className="w-full py-2 px-3 text-sm text-gray-400 hover:bg-gray-50 transition-colors text-left flex items-center gap-2">
        <Plus className="w-4 h-4" /> 新页面
      </button>
    </div>
  </div>
);

// ──────────────────────────────────────────────
// Layout 4: 毛玻璃层叠 (Glass Stack)
// 半透明叠层，渐变背景上的 Glass 卡片
// ──────────────────────────────────────────────
const LayoutGlassStack = () => (
  <div className="relative rounded-3xl overflow-hidden">
    {/* Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />

    <div className="relative p-6 space-y-3">
      {/* Glass Header */}
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">工作台</h2>
              <p className="text-xs text-white/60">本周活跃任务总览</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm text-white/90 transition-all">
              <Download className="w-4 h-4 inline mr-1.5 -mt-0.5" /> 导出
            </button>
            <button className="px-3 py-1.5 bg-white hover:bg-white/90 rounded-lg text-sm font-medium text-purple-700 transition-all shadow-lg shadow-purple-500/20">
              <Plus className="w-4 h-4 inline mr-1 -mt-0.5" /> 创建
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              placeholder="在任务中搜索..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/30 outline-none transition-all"
            />
          </div>
          <button className="p-2.5 bg-white/10 border border-white/10 rounded-xl text-white/70 hover:bg-white/20 hover:text-white transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {[
            { label: '总计', value: '7', icon: Hash },
            { label: '进行中', value: '3', icon: Timer },
            { label: '已完成', value: '1', icon: CheckCircle2 },
            { label: '完成率', value: '14%', icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <stat.icon className="w-4 h-4 text-white/50" />
              <div>
                <div className="text-lg font-bold text-white leading-none">{stat.value}</div>
                <div className="text-[10px] text-white/50 mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glass Table */}
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-5 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">任务</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">标签</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">状态</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">进度</th>
              <th className="px-5 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.map((item) => {
              const st = STATUS_CONFIG[item.status];
              return (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white/80 shrink-0">
                        {item.assignee[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{item.title}</div>
                        <div className="text-xs text-white/40">{item.assignee} · {item.updated}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/70 text-xs">{item.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80">
                      <span className={cn("w-2 h-2 rounded-full",
                        item.status === 'active' ? 'bg-blue-400' :
                        item.status === 'done' ? 'bg-emerald-400' :
                        item.status === 'review' ? 'bg-amber-400' : 'bg-gray-400'
                      )} />
                      {st.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/60 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/40 font-mono">{item.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="p-1 rounded hover:bg-white/10 text-white/30 group-hover:text-white/60 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ──────────────────────────────────────────────
// Layout 5: 侧栏驾驶舱 (Cockpit Sidebar)
// 左侧筛选面板 + 右侧表格，驾驶舱控制感
// ──────────────────────────────────────────────
const LayoutCockpitSidebar = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* Left Filter Panel */}
        <div className="border-r border-gray-100 bg-gray-50/50">
          {/* Panel Header */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <PanelLeftClose className="w-4 h-4 text-gray-400" /> 筛选面板
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">重置</button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                placeholder="搜索..."
                className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">状态</h4>
            <div className="space-y-1">
              {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setSelectedStatus(selectedStatus === key ? null : key)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-all",
                    selectedStatus === key ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <val.icon className={cn("w-4 h-4", selectedStatus === key ? "text-blue-600" : val.color)} />
                    {val.label}
                  </span>
                  <span className={cn("text-xs px-1.5 py-0.5 rounded-full", selectedStatus === key ? "bg-blue-100 text-blue-700" : "bg-gray-200/60 text-gray-500")}>
                    {MOCK_DATA.filter((d) => d.status === key).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">优先级</h4>
            <div className="space-y-1">
              {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
                <label key={key} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm text-gray-600 transition-colors">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
                  <span className={cn("w-2.5 h-2.5 rounded-full", val.dot)} />
                  {val.label}优先级
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="px-4 py-3">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">分类</h4>
            <div className="flex flex-wrap gap-1.5">
              {['前端', '后端', '设计', '运维', '数据'].map((cat) => (
                <button key={cat} className="px-2.5 py-1 text-xs rounded-full border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col">
          {/* Toolbar */}
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-gray-900">任务列表</h2>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {selectedStatus ? STATUS_CONFIG[selectedStatus].label : '全部'} · {selectedStatus ? MOCK_DATA.filter((d) => d.status === selectedStatus).length : MOCK_DATA.length} 条
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" /> 排序
              </Button>
              <Button size="sm" className="h-8 bg-gray-900 hover:bg-gray-800 text-white shadow-none rounded-lg">
                <Plus className="w-3.5 h-3.5 mr-1" /> 新建
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">任务</th>
                  <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">负责人</th>
                  <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">进度</th>
                  <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">更新</th>
                  <th className="px-5 py-2.5 w-20 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DATA
                  .filter((d) => !selectedStatus || d.status === selectedStatus)
                  .map((item) => {
                    const st = STATUS_CONFIG[item.status];
                    const pr = PRIORITY_CONFIG[item.priority];
                    return (
                      <tr key={item.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <span className={cn("w-1 h-8 rounded-full shrink-0", pr.dot)} />
                            <div>
                              <div className="font-medium text-gray-800 flex items-center gap-1.5">
                                {item.title}
                                {item.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                                <code className="font-mono">{item.id}</code>
                                <span>·</span>
                                <span className={cn("inline-flex items-center gap-1", st.color)}>
                                  <st.icon className="w-3 h-3" /> {st.label}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-[10px] text-white font-bold">
                              {item.assignee[0]}
                            </div>
                            <span className="text-gray-600">{item.assignee}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={cn("h-full rounded-full", item.progress === 100 ? "bg-emerald-500" : item.progress > 60 ? "bg-blue-500" : "bg-gray-300")}
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 w-8 text-right">{item.progress}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-400">{item.updated}</td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="编辑">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="复制">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="删除">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <span className="text-xs text-gray-400">
              显示 {selectedStatus ? MOCK_DATA.filter((d) => d.status === selectedStatus).length : MOCK_DATA.length} / {MOCK_DATA.length} 条
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>上一页</Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs">下一页</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
type LayoutKey = 'console' | 'linear' | 'notion' | 'glass' | 'cockpit';

const LAYOUTS: { key: LayoutKey; label: string; desc: string; icon: React.ElementType }[] = [
  { key: 'console', label: '暗色控制台', desc: '深色头部 + 亮色表格', icon: Terminal },
  { key: 'linear', label: '线性融合', desc: 'Tab 分类 + 紧凑行', icon: Zap },
  { key: 'notion', label: '文档流式', desc: '极简文档内联风格', icon: FileText },
  { key: 'glass', label: '毛玻璃层叠', desc: '渐变背景 + 透明卡片', icon: Layers },
  { key: 'cockpit', label: '侧栏驾驶舱', desc: '左侧筛选 + 右侧列表', icon: PanelLeftClose },
];

const ListLayoutShowcase = () => {
  const [activeLayout, setActiveLayout] = useState<LayoutKey>('console');

  return (
    <div className="min-h-full bg-[#f5f5f7] pb-16">
      {/* Top switcher bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">列表布局展廊</h1>
            <p className="text-xs text-gray-500">5 种不同风格的列表页布局，工具栏 · 搜索栏 · 表格一体化设计</p>
          </div>

          {/* Layout Switcher */}
          <div className="flex items-center bg-gray-100/80 p-1 rounded-xl gap-0.5 overflow-x-auto">
            {LAYOUTS.map((layout) => (
              <button
                key={layout.key}
                onClick={() => setActiveLayout(layout.key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                  activeLayout === layout.key
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <layout.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{layout.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active layout description */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          {(() => {
            const current = LAYOUTS.find((l) => l.key === activeLayout)!;
            return (
              <>
                <div className="px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <current.icon className="w-3.5 h-3.5" />
                  {current.label}
                </div>
                <span className="text-sm text-gray-500">{current.desc}</span>
              </>
            );
          })()}
        </div>
      </div>

      {/* Layout Display */}
      <div className="max-w-7xl mx-auto px-6">
        <div key={activeLayout} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeLayout === 'console' && <LayoutDarkConsole />}
          {activeLayout === 'linear' && <LayoutLinearBlend />}
          {activeLayout === 'notion' && <LayoutNotionFlow />}
          {activeLayout === 'glass' && <LayoutGlassStack />}
          {activeLayout === 'cockpit' && <LayoutCockpitSidebar />}
        </div>
      </div>

      {/* Design Notes */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h3 className="text-sm font-bold text-gray-700 mb-4">设计要点对比</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { key: 'console', points: ['深色 header 与亮色 body 的高对比度形成视觉锚点', '暗色搜索栏与 header 融为一体，减少分割感', '分页器嵌入底部，形成完整闭环'] },
            { key: 'linear', points: ['Tab 切换替代下拉筛选，减少操作层级', '搜索框与排序按钮在同一行，高效紧凑', '行 hover 显示操作，保持界面干净'] },
            { key: 'notion', points: ['文档式极简设计，几乎零边框', '面包屑导航提供空间上下文', '可编辑标题暗示内联操作能力'] },
            { key: 'glass', points: ['渐变背景上的毛玻璃层叠创造深度感', '统计卡片嵌入 header，一目了然', '透明度层次引导视觉焦点到内容'] },
            { key: 'cockpit', points: ['左侧固定筛选面板提供持久的过滤上下文', '实时筛选结果计数让操作可预期', '行内操作按钮分组，悬停显示'] },
          ].map((note) => (
            <div key={note.key} className={cn(
              "p-3 rounded-xl border transition-colors",
              activeLayout === note.key ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white"
            )}>
              <h4 className={cn("text-xs font-bold mb-2", activeLayout === note.key ? "text-white" : "text-gray-700")}>
                {LAYOUTS.find((l) => l.key === note.key)?.label}
              </h4>
              <ul className={cn("text-[11px] space-y-1 leading-relaxed", activeLayout === note.key ? "text-white/70" : "text-gray-500")}>
                {note.points.map((p, i) => (
                  <li key={i} className="flex gap-1.5">
                    <span className="shrink-0 mt-0.5">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLayoutShowcase;
