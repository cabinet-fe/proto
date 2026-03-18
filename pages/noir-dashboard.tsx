import { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

export const pageMeta = {
  title: '赛博霓虹仪表盘'
};

// ── 模拟数据 ──
const revenueData = [
  { month: "Jan", value: 186, prev: 145 },
  { month: "Feb", value: 205, prev: 162 },
  { month: "Mar", value: 237, prev: 178 },
  { month: "Apr", value: 198, prev: 190 },
  { month: "May", value: 276, prev: 201 },
  { month: "Jun", value: 305, prev: 215 },
  { month: "Jul", value: 342, prev: 228 },
  { month: "Aug", value: 287, prev: 241 },
  { month: "Sep", value: 365, prev: 255 },
  { month: "Oct", value: 410, prev: 268 },
  { month: "Nov", value: 438, prev: 282 },
  { month: "Dec", value: 467, prev: 295 },
];

const trafficData = [
  { hour: "00:00", users: 120, requests: 340 },
  { hour: "03:00", users: 45, requests: 128 },
  { hour: "06:00", users: 89, requests: 267 },
  { hour: "09:00", users: 342, requests: 890 },
  { hour: "12:00", users: 478, requests: 1240 },
  { hour: "15:00", users: 512, requests: 1380 },
  { hour: "18:00", users: 389, requests: 1020 },
  { hour: "21:00", users: 267, requests: 720 },
];

const categoryData = [
  { name: "核心业务", value: 38, color: "#00f0ff" },
  { name: "增值服务", value: 24, color: "#f0a030" },
  { name: "数据产品", value: 18, color: "#00ff88" },
  { name: "平台佣金", value: 12, color: "#ff4488" },
  { name: "其他", value: 8, color: "#8855ff" },
];

const radarData = [
  { metric: "稳定性", score: 92 },
  { metric: "性能", score: 85 },
  { metric: "安全", score: 96 },
  { metric: "可用性", score: 88 },
  { metric: "扩展性", score: 78 },
  { metric: "响应", score: 91 },
];

const barData = [
  { dept: "研发", budget: 420, actual: 385 },
  { dept: "市场", budget: 280, actual: 310 },
  { dept: "运营", budget: 190, actual: 175 },
  { dept: "销售", budget: 350, actual: 368 },
  { dept: "客服", budget: 120, actual: 108 },
];

// ── KPI 卡片数据 ──
const kpiCards = [
  { label: "总营收", value: "¥2.47M", delta: "+12.4%", up: true, icon: "◆" },
  { label: "活跃用户", value: "42,891", delta: "+8.7%", up: true, icon: "■" },
  { label: "转化率", value: "3.24%", delta: "-0.3%", up: false, icon: "▲" },
  { label: "系统可用", value: "99.97%", delta: "+0.02%", up: true, icon: "●" },
];

// ── 实时日志 ──
const logEntries = [
  { time: "14:32:08", type: "INFO", msg: "订单服务响应正常 avg 23ms" },
  { time: "14:31:55", type: "WARN", msg: "缓存命中率降至 87.2%" },
  { time: "14:31:42", type: "INFO", msg: "新增用户注册 +128 (过去1h)" },
  { time: "14:31:30", type: "OK", msg: "数据库主从同步延迟 <1ms" },
  { time: "14:31:18", type: "INFO", msg: "CDN 带宽使用率 62.4%" },
  { time: "14:30:59", type: "WARN", msg: "API 网关 P99 延迟升至 450ms" },
];

// ── 自定义 Tooltip ──
function NoirTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-[#00f0ff33] bg-[#0a0a0fee] px-3 py-2 text-xs shadow-[0_0_20px_#00f0ff22]">
      <p className="mb-1 font-mono text-[#00f0ff]">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-mono">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ── 扫描线动画背景 ──
function ScanlineOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]">
      <div
        className="h-full w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, #00f0ff 2px, #00f0ff 3px)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
}

// ── 主组件 ──
export default function NoirDashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ts = time.toLocaleTimeString("zh-CN", { hour12: false });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&display=swap');
        .noir-dash { font-family: 'JetBrains Mono', monospace; }
        .noir-dash .font-display { font-family: 'Orbitron', sans-serif; }
        @keyframes noir-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes noir-fadein { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .noir-card { animation: noir-fadein 0.6s ease both; }
        .glow-cyan { text-shadow: 0 0 10px #00f0ff88, 0 0 30px #00f0ff44; }
        .glow-amber { text-shadow: 0 0 10px #f0a03088, 0 0 30px #f0a03044; }
        .border-glow { box-shadow: inset 0 0 30px #00f0ff08, 0 0 1px #00f0ff44; }
        .grid-bg {
          background-image:
            linear-gradient(#00f0ff06 1px, transparent 1px),
            linear-gradient(90deg, #00f0ff06 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      <ScanlineOverlay />
      <div className="noir-dash grid-bg min-h-screen bg-[#06060c] text-[#c8d6e5] selection:bg-[#00f0ff33]">
        {/* ── 顶栏 ── */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#00f0ff18] bg-[#06060cee] px-6 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" style={{ animation: "noir-glow 2s infinite" }} />
            <h1 className="font-display text-sm font-bold tracking-[0.3em] text-[#00f0ff] glow-cyan">
              SYSTEM OVERVIEW
            </h1>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <span className="text-[#f0a030] glow-amber">◉ LIVE</span>
            <span className="font-display tracking-widest text-[#00f0ff88]">{ts}</span>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] space-y-5 p-5">
          {/* ── KPI 卡片 ── */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {kpiCards.map((k, i) => (
              <div
                key={k.label}
                className="noir-card border-glow rounded border border-[#00f0ff15] bg-[#0a0a14] p-4"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c8d6e566]">{k.label}</span>
                  <span className="font-display text-xs text-[#00f0ff44]">{k.icon}</span>
                </div>
                <div className="font-display text-xl font-bold text-[#00f0ff] glow-cyan">{k.value}</div>
                <div className={`mt-1 text-xs ${k.up ? "text-[#00ff88]" : "text-[#ff4466]"}`}>
                  {k.delta}
                  <span className="ml-1 text-[#c8d6e533]">vs 上月</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── 第一行：营收趋势 + 饼图 ── */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* 营收折线图 */}
            <div className="noir-card border-glow col-span-2 rounded border border-[#00f0ff15] bg-[#0a0a14] p-4" style={{ animationDelay: "0.4s" }}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-[10px] font-medium uppercase tracking-[0.25em] text-[#00f0ff88]">
                  ▎营收趋势
                </h2>
                <div className="flex gap-4 text-[10px] text-[#c8d6e544]">
                  <span><span className="mr-1 inline-block h-1.5 w-3 rounded-full bg-[#00f0ff]" />本年</span>
                  <span><span className="mr-1 inline-block h-1.5 w-3 rounded-full bg-[#f0a030]" />去年</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f0a030" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#f0a030" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00f0ff0a" />
                  <XAxis dataKey="month" tick={{ fill: "#c8d6e544", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#c8d6e544", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<NoirTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#00f0ff" strokeWidth={2} fill="url(#gc)" name="本年" />
                  <Area type="monotone" dataKey="prev" stroke="#f0a030" strokeWidth={1.5} fill="url(#ga)" name="去年" strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 饼图 - 业务构成 */}
            <div className="noir-card border-glow rounded border border-[#00f0ff15] bg-[#0a0a14] p-4" style={{ animationDelay: "0.5s" }}>
              <h2 className="mb-4 font-display text-[10px] font-medium uppercase tracking-[0.25em] text-[#00f0ff88]">▎业务构成</h2>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value" stroke="none">
                    {categoryData.map((c) => <Cell key={c.name} fill={c.color} opacity={0.85} />)}
                  </Pie>
                  <Tooltip content={<NoirTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1.5">
                {categoryData.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
                      <span className="text-[#c8d6e577]">{c.name}</span>
                    </span>
                    <span className="font-display text-[#c8d6e5aa]">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 第三行：流量面积图 + 实时日志 ── */}
          <div className="grid gap-4 lg:grid-cols-5">
            <div className="noir-card border-glow col-span-3 rounded border border-[#00f0ff15] bg-[#0a0a14] p-4" style={{ animationDelay: "0.8s" }}>
              <h2 className="mb-4 font-display text-[10px] font-medium uppercase tracking-[0.25em] text-[#00f0ff88]">▎24H 流量监控</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00f0ff0a" />
                  <XAxis dataKey="hour" tick={{ fill: "#c8d6e544", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#c8d6e544", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<NoirTooltip />} />
                  <Line type="monotone" dataKey="users" stroke="#00ff88" strokeWidth={2} dot={false} name="用户" />
                  <Line type="monotone" dataKey="requests" stroke="#00f0ff" strokeWidth={1.5} dot={false} name="请求" strokeDasharray="5 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── 第二行：柱状图 + 雷达图 ── */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="noir-card border-glow rounded border border-[#00f0ff15] bg-[#0a0a14] p-4" style={{ animationDelay: "0.6s" }}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-[10px] font-medium uppercase tracking-[0.25em] text-[#00f0ff88]">▎部门预算 vs 实际</h2>
                <div className="flex gap-4 text-[10px] text-[#c8d6e544]">
                  <span><span className="mr-1 inline-block h-1.5 w-3 rounded-full bg-[#00f0ff55]" />预算</span>
                  <span><span className="mr-1 inline-block h-1.5 w-3 rounded-full bg-[#f0a030]" />实际</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00f0ff0a" />
                  <XAxis dataKey="dept" tick={{ fill: "#c8d6e544", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#c8d6e544", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<NoirTooltip />} />
                  <Bar dataKey="budget" fill="#00f0ff33" radius={[2, 2, 0, 0]} name="预算" />
                  <Bar dataKey="actual" fill="#f0a030" radius={[2, 2, 0, 0]} name="实际" opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 雷达图 - 系统健康 */}
            <div className="noir-card border-glow rounded border border-[#00f0ff15] bg-[#0a0a14] p-4" style={{ animationDelay: "0.7s" }}>
              <h2 className="mb-4 font-display text-[10px] font-medium uppercase tracking-[0.25em] text-[#00f0ff88]">▎系统健康指数</h2>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#00f0ff15" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#c8d6e555", fontSize: 10 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar dataKey="score" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.15} strokeWidth={1.5} name="得分" />
                  <Tooltip content={<NoirTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* 实时日志 */}
            <div className="noir-card border-glow col-span-2 rounded border border-[#00f0ff15] bg-[#0a0a14] p-4" style={{ animationDelay: "0.9s" }}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-[10px] font-medium uppercase tracking-[0.25em] text-[#00f0ff88]">▎系统日志</h2>
                <span className="h-1.5 w-1.5 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" style={{ animation: "noir-glow 1.5s infinite" }} />
              </div>
              <div className="space-y-2 font-mono text-[10px]">
                {logEntries.map((l, i) => (
                  <div key={i} className="flex gap-2 border-b border-[#00f0ff08] pb-1.5">
                    <span className="shrink-0 text-[#c8d6e533]">{l.time}</span>
                    <span className={`shrink-0 font-bold ${l.type === "WARN" ? "text-[#f0a030]" : l.type === "OK" ? "text-[#00ff88]" : "text-[#00f0ff66]"}`}>
                      {l.type}
                    </span>
                    <span className="text-[#c8d6e588]">{l.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ── 底栏 ── */}
        <footer className="border-t border-[#00f0ff10] px-6 py-3 text-center font-mono text-[9px] tracking-widest text-[#c8d6e522]">
          NOIR COMMAND CENTER v2.4.0 — ALL SYSTEMS NOMINAL
        </footer>
      </div>
    </>
  );
}
