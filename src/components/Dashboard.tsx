import { TrendingUp, Droplets, Thermometer, Wind, AlertTriangle, CheckCircle2, Navigation } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

const data = [
  { name: '01 May', index: 82 },
  { name: '02 May', index: 85 },
  { name: '03 May', index: 84 },
  { name: '04 May', index: 88 },
  { name: '05 May', index: 92 },
  { name: '06 May', index: 91 },
  { name: '07 May', index: 94 },
];

const StatCard = ({ icon: Icon, label, value, unit, trend, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
          +{trend}%
        </span>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold flex items-baseline gap-1">
        {value}
        <span className="text-sm font-normal text-slate-400">{unit}</span>
      </h3>
    </div>
  </div>
);

export function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Greetings */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Farm Overview</h2>
          <p className="text-slate-500 mt-1">Status check for Central Valley Plot A</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                Download Report
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-colors">
                New Inspection
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Droplets} label="Soil Moisture" value="64" unit="%" trend="12" color="bg-blue-500" />
        <StatCard icon={Thermometer} label="Avg Temp" value="24.8" unit="°C" color="bg-orange-500" />
        <StatCard icon={Wind} label="Wind Speed" value="12" unit="km/h" color="bg-slate-500" />
        <StatCard icon={TrendingUp} label="Growth Index" value="94" unit="/100" trend="5" color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg">Vegetation Health Index</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm px-3 py-1 text-slate-600 outline-none">
              <span className="sr-only">Time range</span>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="index" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl space-y-4">
             <div className="flex items-center gap-2 text-orange-700">
                <AlertTriangle size={20} />
                <h4 className="font-bold">Recent Alerts</h4>
             </div>
             <div className="space-y-3">
                {[
                    { title: 'Potential Pest Detected', location: 'Section B4', time: '2h ago' },
                    { title: 'Moisture Below Threshold', location: 'Section A2', time: '5h ago' }
                ].map((alert, i) => (
                    <div key={i} className="bg-white/50 p-4 rounded-2xl flex justify-between items-center">
                        <div>
                            <p className="text-sm font-bold text-slate-800">{alert.title}</p>
                            <p className="text-xs text-slate-500">{alert.location}</p>
                        </div>
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">{alert.time}</span>
                    </div>
                ))}
             </div>
          </div>

          {/* Active Fields */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl space-y-4">
            <h4 className="font-bold text-slate-800">Field Diagnostics</h4>
            <div className="space-y-4">
                {[
                    { name: 'Soybean North', status: 'Healthy', color: 'text-emerald-500' },
                    { name: 'Corn Valley', status: 'Warning', color: 'text-orange-500' },
                    { name: 'Wheat Crest', status: 'Healthy', color: 'text-emerald-500' }
                ].map((field, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                            <img src={`https://picsum.photos/seed/${field.name}/64/64`} alt={field.name} referrerPolicy="no-referrer" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-800">{field.name}</p>
                            <div className="flex items-center gap-1">
                                <CheckCircle2 size={12} className={field.color} />
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${field.color}`}>{field.status}</span>
                            </div>
                         </div>
                        </div>
                        <Navigation size={16} className="text-slate-300 group-hover:text-emerald-500" />
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
