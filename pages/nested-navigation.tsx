import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Compass, 
  Shield, 
  Database, 
  Terminal,
  Cloud,
  Code2,
  ChevronRight,
  MoreHorizontal,
  Circle
} from 'lucide-react';
import { cn } from '../utils/cn';

// --- 模拟嵌套数据 ---
const NAVIGATION_DATA = [
  {
    group: "Development",
    items: [
      { id: 'cloud', label: 'Cloud Services', icon: Cloud, children: ['AWS', 'GCP', 'Azure'] },
      { id: 'db', label: 'Databases', icon: Database, children: ['PostgreSQL', 'Redis', 'MongoDB'] },
      { id: 'api', label: 'API Management', icon: Code2, children: ['GraphQL', 'REST', 'gRPC'] },
    ]
  },
  {
    group: "System",
    items: [
      { id: 'security', label: 'Security', icon: Shield, children: ['Vault', 'IAM', 'Network'] },
      { id: 'infra', label: 'Infrastructure', icon: Terminal, children: ['Terraform', 'Kubernetes'] },
    ]
  }
];

// --- 方案 1: Floating Context (侧向悬浮上下文) ---
// 特点：子菜单不占用垂直空间，而是以一种“呼吸感”极强的侧边层展现
const FloatingContextNav = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="w-64 p-4 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-[2.5rem] shadow-xl relative">
      <div className="px-4 py-6 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-lg rotate-12" />
          <span className="font-bold text-gray-900">Nexus.io</span>
        </div>
      </div>

      <div className="space-y-6">
        {NAVIGATION_DATA.map((group) => (
          <div key={group.group}>
            <h4 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">{group.group}</h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div 
                  key={item.id} 
                  className="relative group/parent"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300",
                    hoveredItem === item.id ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:bg-gray-50"
                  )}>
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <ChevronRight size={14} className={cn("transition-transform", hoveredItem === item.id && "rotate-90 md:rotate-0")} />
                  </button>

                  {/* 悬浮子菜单 */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 20, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.95 }}
                        className="absolute top-0 left-full ml-2 w-48 p-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 pointer-events-auto"
                      >
                        {item.children.map((child) => (
                          <button key={child} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors">
                            {child}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

// --- 方案 2: Fluid Stacks (流体堆叠) ---
// 特点：极简主义，子菜单展开时主菜单项会产生微妙的位移和缩进，通过间距表现层级
const FluidStacksNav = () => {
  const [expanded, setExpanded] = useState<string | null>('cloud');

  return (
    <nav className="w-64 p-6 bg-zinc-950 rounded-[3rem] text-zinc-400">
      <div className="mb-10 px-2 flex justify-between items-center">
        <Compass className="text-zinc-100" />
        <MoreHorizontal size={18} className="text-zinc-600" />
      </div>

      <LayoutGroup>
        <div className="space-y-4">
          {NAVIGATION_DATA.map((group) => (
            <div key={group.group} className="space-y-2">
              <span className="px-2 text-xs font-medium text-zinc-600">{group.group}</span>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isExpanded = expanded === item.id;
                  return (
                    <div key={item.id} className="overflow-hidden">
                      <motion.button
                        layout
                        onClick={() => setExpanded(isExpanded ? null : item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors",
                          isExpanded ? "text-zinc-100 bg-zinc-900" : "hover:text-zinc-200"
                        )}
                      >
                        <item.icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                        <motion.div 
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          className="ml-auto"
                        >
                          <ChevronRight size={14} />
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-9 border-l border-zinc-800 mt-1"
                          >
                            {item.children.map((child, idx) => (
                              <motion.button
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                key={child}
                                className="w-full text-left px-4 py-2 text-xs hover:text-zinc-100 transition-colors"
                              >
                                {child}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </nav>
  );
};

// --- 方案 3: Bento Grid Groups (本图网格分组) ---
// 特点：将导航项视为“卡片”，点击时在内部展开子项，极具现代 Dashboard 的感觉
const BentoNav = () => {
  const [active, setActive] = useState('cloud');

  return (
    <nav className="w-72 space-y-8">
      {NAVIGATION_DATA.map((group) => (
        <div key={group.group}>
          <div className="flex items-center gap-4 mb-4">
            <h3 className="font-black italic text-gray-900">{group.group}</h3>
            <div className="h-[2px] flex-1 bg-black" />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {group.items.map((item) => {
              const isActive = active === item.id;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "cursor-pointer border-2 border-black transition-all duration-200 p-4",
                    isActive 
                      ? "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1" 
                      : "bg-gray-100 hover:bg-white"
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon size={20} strokeWidth={2.5} />
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/10"
                      >
                        {item.children.map((child) => (
                          <span key={child} className="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase">
                            {child}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};

// --- Demo Page ---
const NestedNavigationDemo = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-12 font-sans">
      <header className="max-w-6xl mx-auto mb-16">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Modern Nested Menus</h1>
        <p className="text-slate-500 text-lg">
          Moving beyond the classic accordion. Exploring depth, motion, and spatial hierarchy.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Floating Context */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Circle className="fill-indigo-500 text-indigo-500" size={10} />
            <span className="text-sm font-bold text-slate-400">01 / Floating Context</span>
          </div>
          <FloatingContextNav />
          <p className="text-xs text-slate-400 leading-relaxed">
            Horizontal expansion on hover. Keeps the vertical flow undisturbed while providing instant depth access.
          </p>
        </div>

        {/* Fluid Stacks */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Circle className="fill-zinc-800 text-zinc-800" size={10} />
            <span className="text-sm font-bold text-slate-400">02 / Fluid Stacks</span>
          </div>
          <FluidStacksNav />
          <p className="text-xs text-slate-400 leading-relaxed">
            Monochromatic elegance. Uses precise indentation and vertical line markers to denote hierarchy without clutter.
          </p>
        </div>

        {/* Bento Groups */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Circle className="fill-black text-black" size={10} />
            <span className="text-sm font-bold text-slate-400">03 / Bento Grid</span>
          </div>
          <BentoNav />
          <p className="text-xs text-slate-400 leading-relaxed">
            Card-based navigation where nested items appear as metadata chips. High visual impact for modern web apps.
          </p>
        </div>
      </main>
    </div>
  );
};

export default NestedNavigationDemo;
