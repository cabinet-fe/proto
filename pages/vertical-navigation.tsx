import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { 
  Home, 
  Settings, 
  Layers, 
  Bell, 
  Plus,
  Command,
  LayoutGrid,
  Zap,
  Star,
  Hash
} from 'lucide-react';
import { cn } from '../utils/cn';

// --- 模拟数据 ---
const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'analytics', label: 'Analytics', icon: Zap },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// --- Style 1: Zen Minimalist ---
const ZenNav = ({ items }: { items: typeof MENU_ITEMS }) => {
  const [active, setActive] = useState(items[0].id);

  return (
    <nav className="w-64 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <Command className="text-white" size={16} />
        </div>
        <span className="font-semibold tracking-tight">Studio.</span>
      </div>
      
      <ul className="space-y-1 relative">
        <LayoutGroup id="zen-nav">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "relative w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-xl outline-none",
                    isActive ? "text-black" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="zen-active-pill"
                      className="absolute inset-0 bg-gray-100/60 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="zen-active-line"
                      className="absolute left-0 w-1 h-4 bg-black rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </LayoutGroup>
      </ul>

      <div className="mt-20 px-2">
        <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">Upgrade to Pro for team collaboration tools.</p>
          <button className="w-full py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Style 2: Aurora Glass ---
const AuroraNav = ({ items }: { items: typeof MENU_ITEMS }) => {
  const [active, setActive] = useState(items[0].id);

  return (
    <nav className="w-64 p-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
      {/* 装饰性光晕 */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/20 blur-[60px] pointer-events-none group-hover:bg-purple-500/30 transition-colors duration-1000" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[60px] pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-1000" />

      <div className="flex items-center gap-3 px-4 py-6">
        <div className="relative">
          <LayoutGrid className="text-blue-400" size={24} />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-blue-400/20 blur-md" 
          />
        </div>
        <span className="font-bold text-white tracking-widest text-lg">AURORA</span>
      </div>

      <div className="space-y-2 mt-4">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "group/item relative w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 overflow-hidden",
                isActive 
                  ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="aurora-active-bg"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10"
                />
              )}
              <item.icon 
                size={20} 
                className={cn(
                  "transition-transform duration-300 group-hover/item:scale-110",
                  isActive ? "text-blue-400" : "group-hover/item:text-white"
                )} 
              />
              <span className="text-sm font-semibold tracking-wide">{item.label}</span>
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" 
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-12 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border border-white/20" />
          <div className="flex-1">
            <p className="text-xs font-bold text-white">Alex Rivera</p>
            <p className="text-[10px] text-slate-400">Pro Account</p>
          </div>
          <Settings className="text-slate-500 hover:text-white cursor-pointer transition-colors" size={16} />
        </div>
      </div>
    </nav>
  );
};

// --- Style 3: Cyber Brutalist ---
const BrutalistNav = ({ items }: { items: typeof MENU_ITEMS }) => {
  const [active, setActive] = useState(items[0].id);

  return (
    <nav className="w-64 p-4 bg-yellow-300 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-2 mb-8 p-2 border-b-2 border-black">
        <Hash size={24} strokeWidth={3} />
        <span className="font-black text-2xl italic tracking-tighter">APP_UI</span>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "group relative flex items-center gap-4 px-4 py-3 border-[3px] border-black font-black uppercase tracking-tighter transition-all duration-100",
                isActive 
                  ? "bg-black text-yellow-300 translate-x-[4px] translate-y-[4px] shadow-none" 
                  : "bg-white text-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
              )}
            >
              <item.icon size={20} strokeWidth={3} />
              <span className="text-lg">{item.label}</span>
              {isActive && (
                <Star className="ml-auto animate-spin-slow fill-yellow-300" size={16} />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <button className="w-full flex items-center justify-center gap-2 p-3 bg-white border-[3px] border-black font-black hover:bg-black hover:text-white transition-colors">
          <Plus size={20} strokeWidth={3} />
          NEW PROJECT
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </nav>
  );
};

// --- Demo Page ---
const VerticalNavigationDemo = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] p-12 font-sans selection:bg-blue-100">
      <header className="max-w-6xl mx-auto mb-16">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">Vertical Navigations</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Three distinct aesthetic directions for vertical menus. From minimalist refinement to bold brutalism.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-start">
        {/* Style 1 Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">01 / Minimalist</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="flex justify-center">
            <ZenNav items={MENU_ITEMS} />
          </div>
          <div className="text-sm text-gray-400 italic px-4">
            "Zen" focus. High-end, clean, and calm. Uses layout animations for state transitions.
          </div>
        </section>

        {/* Style 2 Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">02 / Futuristic</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="flex justify-center">
            <AuroraNav items={MENU_ITEMS} />
          </div>
          <div className="text-sm text-gray-400 italic px-4">
            "Aurora" focus. Modern dark mode with translucency, blurs, and vibrant gradients.
          </div>
        </section>

        {/* Style 3 Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">03 / Brutalist</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="flex justify-center">
            <BrutalistNav items={MENU_ITEMS} />
          </div>
          <div className="text-sm text-gray-400 italic px-4">
            "Cyber" focus. Bold contrast, thick borders, and playful 2D shadows.
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-24 pt-8 border-t border-gray-200 flex justify-between items-center text-gray-400 text-sm">
        <p>© 2026 Prototype Lab. Built with Tailwind 4 & Framer Motion.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-900 transition-colors">Documentation</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Components</a>
        </div>
      </footer>
    </div>
  );
};

export default VerticalNavigationDemo;
