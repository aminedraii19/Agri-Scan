import { Navigation, ShieldCheck, MapPin, Search, Layers, Compass } from "lucide-react";

export function FieldMap() {
    return (
        <div className="h-full flex flex-col gap-6 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Field Monitor</h2>
                    <p className="text-slate-500">Real-time spatial visualization of your land parcels</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find parcel..." 
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Map Placeholder */}
                <div className="lg:col-span-3 bg-slate-100 rounded-[32px] overflow-hidden relative border border-slate-200">
                    <img 
                        src="https://picsum.photos/seed/farm-map/1200/800" 
                        alt="Satellite view" 
                        className="w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                    />
                    
                    {/* Map Overlays */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <button className="p-3 bg-white shadow-lg rounded-2xl text-slate-600 hover:text-emerald-600 transition-colors">
                            <Layers size={20} />
                        </button>
                        <button className="p-3 bg-white shadow-lg rounded-2xl text-slate-600 hover:text-emerald-600 transition-colors">
                            <Compass size={20} />
                        </button>
                    </div>

                    {/* Markers */}
                    <div className="absolute top-1/3 left-1/4 group cursor-pointer">
                        <div className="p-1.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 group-hover:scale-125 transition-transform">
                            <MapPin size={16} className="text-white" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="bg-white px-3 py-1.5 rounded-lg shadow-xl border border-slate-100 font-bold text-[10px] uppercase tracking-wider">
                                Sector 01: Optimal
                             </div>
                        </div>
                    </div>

                    <div className="absolute bottom-1/2 right-1/3 group cursor-pointer">
                        <div className="p-1.5 bg-rose-500 rounded-full shadow-lg shadow-rose-500/50 group-hover:scale-125 transition-transform">
                            <MapPin size={16} className="text-white" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="bg-white px-3 py-1.5 rounded-lg shadow-xl border border-slate-100 font-bold text-[10px] uppercase tracking-wider text-rose-600">
                                Sector 12: Warning
                             </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                        <h4 className="font-bold text-slate-800">Parcels List</h4>
                        <div className="space-y-3">
                            {[
                                { id: 'P001', name: 'Cotton Ridge', size: '45ha', health: 88 },
                                { id: 'P002', name: 'Valley Basin', size: '120ha', health: 94 },
                                { id: 'P003', name: 'North Slopes', size: '32ha', health: 65 }
                            ].map((parcel, i) => (
                                <div key={i} className="p-4 rounded-2xl border border-slate-50 hover:border-emerald-100 hover:bg-emerald-50/20 transition-all cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-bold text-sm text-slate-800 group-hover:text-emerald-700">{parcel.name}</h5>
                                        <span className="text-[10px] font-mono text-slate-400">{parcel.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs text-slate-500">{parcel.size}</p>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${parcel.health > 80 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                                    style={{ width: `${parcel.health}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-600">{parcel.health}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-emerald-900 p-6 rounded-3xl text-white space-y-4 shadow-xl shadow-emerald-900/20">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-emerald-400" />
                            <h4 className="font-bold">Protection Mode</h4>
                        </div>
                        <p className="text-xs text-emerald-100 leading-relaxed">Automated drone surveillance is active for Sector 01 & 02. No intrusion or anomalies detected.</p>
                        <button className="w-full py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-xs font-bold border border-white/20">
                            View Live Stream
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
