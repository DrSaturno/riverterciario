import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { hora: "8hs", msgs: 4 },
  { hora: "9hs", msgs: 12 },
  { hora: "10hs", msgs: 18 },
  { hora: "11hs", msgs: 24 },
  { hora: "12hs", msgs: 15 },
  { hora: "13hs", msgs: 8 },
  { hora: "14hs", msgs: 22 },
  { hora: "15hs", msgs: 31 },
  { hora: "16hs", msgs: 28 },
  { hora: "17hs", msgs: 19 },
  { hora: "18hs", msgs: 11 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-900 border border-navy-500 rounded-lg px-3 py-2 text-xs text-white shadow-lg">
        <p className="text-slate-400">{label}</p>
        <p className="font-semibold">{payload[0].value} mensajes</p>
      </div>
    );
  }
  return null;
};

export default function ActivityChart() {
  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold text-white mb-4">Actividad del día</h2>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data} margin={{ left: -20, right: 10 }}>
          <defs>
            <linearGradient id="colorMsgs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C8102E" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#C8102E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="hora" tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#ffffff", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="msgs" stroke="#C8102E" strokeWidth={2} fill="url(#colorMsgs)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
