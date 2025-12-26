import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { Hexagon, Zap, Feather, Scroll, Wind, Mountain } from 'lucide-react';

type Theme = 'ink' | 'porcelain' | 'china-chic';

interface ThemeConfig {
  id: Theme;
  name: string;
  icon: React.ElementType;
  description: string;
  styles: {
    wrapper: string;
    container: string;
    header: string;
    title: string;
    subtitle: string;
    card: string;
    cardTitle: string;
    cardText: string;
    buttonPrimary: string;
    buttonSecondary: string;
    badge: string;
    input: string;
    divider: string;
    iconColor: string;
  };
}

const themes: ThemeConfig[] = [
  {
    id: 'ink',
    name: '水墨丹青',
    icon: Feather,
    description: '墨色晕染，留白意境，传统文人画风',
    styles: {
      wrapper: 'bg-[#f0f2f0] font-serif selection:bg-stone-300 selection:text-stone-900',
      container: 'max-w-6xl mx-auto p-8',
      header: 'border-b border-stone-300 pb-8 mb-12 relative',
      title: 'text-6xl font-bold text-stone-900 tracking-widest mb-4',
      subtitle: 'text-xl text-stone-600 italic',
      card: 'bg-[#fafafa] border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
      cardTitle: 'text-2xl font-bold text-stone-800 mb-4 border-l-4 border-stone-900 pl-4',
      cardText: 'text-stone-600 leading-relaxed',
      buttonPrimary: 'bg-stone-900 text-[#fafafa] px-8 py-3 rounded-none hover:bg-stone-800 transition-colors border border-stone-900 shadow-lg shadow-stone-900/20',
      buttonSecondary: 'bg-transparent text-stone-900 px-8 py-3 rounded-none border border-stone-900 hover:bg-stone-100 transition-colors',
      badge: 'px-3 py-1 bg-stone-200 text-stone-700 text-sm border border-stone-300 rounded-none',
      input: 'w-full bg-transparent border-b-2 border-stone-300 px-4 py-3 focus:border-stone-900 outline-none transition-colors placeholder-stone-400 text-stone-900',
      divider: 'border-stone-300',
      iconColor: 'text-stone-800'
    }
  },
  {
    id: 'porcelain',
    name: '青花瓷韵',
    icon: Hexagon,
    description: '蓝白相间，温润如玉，典雅精致',
    styles: {
      wrapper: 'bg-[#f8fbff] font-sans selection:bg-blue-200 selection:text-blue-900',
      container: 'max-w-6xl mx-auto p-8',
      header: 'border-b-2 border-blue-100 pb-8 mb-12 text-center',
      title: 'text-5xl font-bold text-blue-900 mb-4 tracking-wide',
      subtitle: 'text-lg text-blue-600/80 font-medium',
      card: 'bg-white border-2 border-blue-100 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:border-blue-300 hover:shadow-blue-100/50 hover:shadow-xl',
      cardTitle: 'text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2',
      cardText: 'text-slate-600 leading-relaxed',
      buttonPrimary: 'bg-blue-700 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-all hover:shadow-lg hover:shadow-blue-700/30',
      buttonSecondary: 'bg-blue-50 text-blue-700 px-8 py-3 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors',
      badge: 'px-4 py-1 bg-blue-50 text-blue-700 text-sm border border-blue-100 rounded-full font-medium',
      input: 'w-full bg-white border border-blue-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-blue-300 text-blue-900',
      divider: 'border-blue-100',
      iconColor: 'text-blue-600'
    }
  },
  {
    id: 'china-chic',
    name: '现代国潮',
    icon: Zap,
    description: '霓虹撞色，大胆前卫，东方赛博',
    styles: {
      wrapper: 'bg-slate-950 font-sans selection:bg-rose-500 selection:text-white',
      container: 'max-w-6xl mx-auto p-8',
      header: 'border-b border-white/10 pb-8 mb-12 flex flex-col items-start',
      title: 'text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 mb-4 tracking-tighter',
      subtitle: 'text-xl text-slate-400 font-bold uppercase tracking-[0.2em]',
      card: 'bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-xl relative overflow-hidden group hover:border-rose-500/50 transition-all duration-300',
      cardTitle: 'text-2xl font-bold text-white mb-4 relative z-10',
      cardText: 'text-slate-400 leading-relaxed relative z-10 group-hover:text-slate-200 transition-colors',
      buttonPrimary: 'bg-gradient-to-r from-rose-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:brightness-110 transition-all font-bold tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]',
      buttonSecondary: 'bg-transparent text-emerald-400 px-8 py-3 rounded-lg border-2 border-emerald-500/30 hover:bg-emerald-500/10 transition-colors font-bold',
      badge: 'px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold rounded uppercase tracking-wider',
      input: 'w-full bg-slate-900 border-2 border-white/10 rounded-lg px-4 py-3 focus:border-amber-400 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] outline-none transition-all placeholder-slate-600 text-white',
      divider: 'border-white/10',
      iconColor: 'text-amber-400'
    }
  }
];

export default function ChineseStyleDemo() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('ink');
  const theme = themes.find(t => t.id === currentTheme) || themes[0];
  const styles = theme.styles;

  return (
    <div className={cn("min-h-screen transition-all duration-700 ease-in-out", styles.wrapper)}>
      {/* 顶部导航与切换器 */}
      <div className="sticky top-0 z-50 backdrop-blur-md border-b border-black/5">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="text-sm font-bold opacity-50 uppercase tracking-widest">
            Style Switcher
          </div>
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setCurrentTheme(t.id)}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium",
                  currentTheme === t.id 
                    ? "bg-black/10 text-black shadow-inner scale-95" 
                    : "hover:bg-black/5 text-gray-500 hover:text-gray-900"
                )}
                style={{
                  backgroundColor: currentTheme === t.id && t.id === 'china-chic' ? 'rgba(255,255,255,0.1)' : undefined,
                  color: currentTheme === t.id && t.id === 'china-chic' ? 'white' : undefined,
                }}
              >
                <t.icon size={16} />
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* 头部区域 */}
        <header className={styles.header}>
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
             {/* 装饰性背景元素，根据主题变化 */}
             {currentTheme === 'ink' && <Mountain size={400} strokeWidth={0.5} />}
             {currentTheme === 'porcelain' && <div className="w-96 h-96 border-[20px] border-blue-900 rounded-full opacity-20" />}
             {currentTheme === 'china-chic' && <div className="w-96 h-96 bg-gradient-to-tr from-rose-500 to-blue-500 blur-[100px] opacity-40" />}
          </div>
          
          <h1 className={styles.title}>
            {currentTheme === 'ink' && "高山流水"}
            {currentTheme === 'porcelain' && "青花瓷韵"}
            {currentTheme === 'china-chic' && "赛博东方"}
          </h1>
          <p className={styles.subtitle}>{theme.description}</p>
        </header>

        {/* 主要内容网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 左侧内容区 */}
          <div className="lg:col-span-8 space-y-8">
            <section className={styles.card}>
              <div className="flex justify-between items-start mb-6">
                 <h2 className={styles.cardTitle}>设计理念</h2>
                 <span className={styles.badge}>Core Concept</span>
              </div>
              <p className={styles.cardText}>
                中国传统色彩与其承载的文化内涵，在现代设计语境下焕发出新的生命力。
                {currentTheme === 'ink' && "水墨画强调气韵生动，以黑白二色构建出无限的色彩空间。设计中多用留白，讲究虚实相生。"}
                {currentTheme === 'porcelain' && "青花瓷以氧化钴为着色剂，在白瓷胎上绘出纹饰。蓝白相映，明净素雅，给人以宁静致远之感。"}
                {currentTheme === 'china-chic' && "国潮风格大胆运用高饱和度的传统色，结合现代排版与光影效果，形成强烈的视觉冲击。"}
              </p>
              
              <div className={`mt-8 pt-8 border-t ${styles.divider} flex gap-4`}>
                <button className={styles.buttonPrimary}>
                  查看详情
                </button>
                <button className={styles.buttonSecondary}>
                  分享设计
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className={styles.card}>
                <Wind className={`mb-4 ${styles.iconColor}`} size={32} />
                <h3 className={styles.cardTitle}>风雅颂</h3>
                <p className={styles.cardText}>
                  诗经中的风雅颂，代表了不同阶层与场合的音乐与诗歌。
                </p>
              </section>
              <section className={styles.card}>
                <Scroll className={`mb-4 ${styles.iconColor}`} size={32} />
                <h3 className={styles.cardTitle}>笔墨纸砚</h3>
                <p className={styles.cardText}>
                  文房四宝，中华文明传承的载体，书写历史的工具。
                </p>
              </section>
            </div>
          </div>

          {/* 右侧侧边栏 */}
          <div className="lg:col-span-4 space-y-8">
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>用户登录</h3>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-2 text-sm font-medium opacity-70 ${currentTheme === 'china-chic' ? 'text-white' : 'text-gray-700'}`}>用户名</label>
                  <input type="text" className={styles.input} placeholder="请输入用户名" />
                </div>
                <div>
                  <label className={`block mb-2 text-sm font-medium opacity-70 ${currentTheme === 'china-chic' ? 'text-white' : 'text-gray-700'}`}>密码</label>
                  <input type="password" className={styles.input} placeholder="••••••••" />
                </div>
                <button className={`w-full ${styles.buttonPrimary} mt-4`}>
                  立即登录
                </button>
              </div>
            </section>

            <section className={styles.card}>
              <h3 className={styles.cardTitle}>色彩提取</h3>
              <div className="space-y-3">
                {currentTheme === 'ink' && (
                  <>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#1a1a1a] rounded-sm shadow-sm"></div><span className="text-stone-600">墨黑 #1a1a1a</span></div>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#808080] rounded-sm shadow-sm"></div><span className="text-stone-600">深灰 #808080</span></div>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#f5f5f5] rounded-sm shadow-sm border border-stone-200"></div><span className="text-stone-600">宣纸 #f5f5f5</span></div>
                  </>
                )}
                {currentTheme === 'porcelain' && (
                  <>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#1e3a8a] rounded-full shadow-sm"></div><span className="text-blue-900">青花蓝 #1e3a8a</span></div>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#60a5fa] rounded-full shadow-sm"></div><span className="text-blue-500">天青 #60a5fa</span></div>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#ffffff] rounded-full shadow-sm border border-blue-100"></div><span className="text-blue-900">瓷白 #ffffff</span></div>
                  </>
                )}
                {currentTheme === 'china-chic' && (
                  <>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-rose-500 rounded-lg shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div><span className="text-rose-400">朱红 #f43f5e</span></div>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-emerald-500 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div><span className="text-emerald-400">玉绿 #10b981</span></div>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-amber-400 rounded-lg shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div><span className="text-amber-400">赤金 #fbbf24</span></div>
                  </>
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
