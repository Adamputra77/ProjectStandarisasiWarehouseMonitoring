import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, AlertTriangle, FileText, ArrowUpRight, PackageOpen, Truck, Warehouse, Box } from 'lucide-react';
import { QuantitativeState } from '../types';
import { quantitativeData } from '../data/checklistData';

const data = [
  { name: 'Senin', selesai: 0, pending: 0, eror: 0 },
  { name: 'Selasa', selesai: 0, pending: 0, eror: 0 },
  { name: 'Rabu', selesai: 0, pending: 0, eror: 0 },
  { name: 'Kamis', selesai: 0, pending: 0, eror: 0 },
  { name: 'Jumat', selesai: 0, pending: 0, eror: 0 },
  { name: 'Sabtu', selesai: 0, pending: 0, eror: 0 },
  { name: 'Minggu', selesai: 0, pending: 0, eror: 0 },
];

const recentChecklists: any[] = [];

interface OverviewTabProps {
  state?: QuantitativeState;
}

export default function OverviewTab({ state = {} }: OverviewTabProps) {
  const { totalItems, filledItems, maxScore, currentScore } = useMemo(() => {
    let tItems = 0;
    let mScore = 0;
    let fItems = 0;
    let cScore = 0;

    quantitativeData.forEach(cat => {
      cat.items.forEach(item => {
        tItems++;
        mScore += item.weight * 4;
        const s = state[item.id];
        if (s && s.status) {
          fItems++;
          cScore += (s.score || 0) * item.weight;
        }
      });
    });

    return { totalItems: tItems, filledItems: fItems, maxScore: mScore, currentScore: cScore };
  }, [state]);

  const handleExport = () => {
    const headers = ["ID", "Kategori", "Parameter", "Status", "Score", "Notes"];
    const rows: any[] = [];
    
    quantitativeData.forEach(cat => {
      cat.items.forEach(item => {
        const itemState = state[item.id] || {};
        rows.push([
          item.id,
          `"${cat.category}"`,
          `"${item.description}"`,
          itemState.status || "-",
          itemState.score || 0,
          `"${itemState.notes || ""}"`
        ]);
      });
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `checklist_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const percentage = maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ringkasan aktivitas standarisasi warehouse.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-white dark:bg-dark-panel border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-dark-border transition-colors text-sm font-medium btn-ripple"
          >
            Export Data
          </button>
          <button className="px-4 py-2 bg-[#FF7A00] text-white rounded-lg shadow-sm hover:bg-[#e06c00] hover:shadow-[0_4px_15px_rgba(255,122,0,0.4)] transition-all text-sm font-medium flex items-center btn-ripple">
            <span className="mr-2">+</span> Tambah Checklist
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative overflow-hidden bg-white dark:bg-dark-panel p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
          <Warehouse className="absolute -right-4 -top-4 w-24 h-24 text-blue-50 dark:text-blue-900/10 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
              Parameter
            </span>
          </div>
          <h3 className="relative z-10 text-gray-500 dark:text-gray-400 text-sm font-medium">Total Parameter</h3>
          <p className="relative z-10 text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totalItems}</p>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-dark-panel p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
          <PackageOpen className="absolute -right-4 -top-4 w-24 h-24 text-green-50 dark:text-green-900/10 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
              {Math.round((filledItems / (totalItems || 1)) * 100)}%
            </span>
          </div>
          <h3 className="relative z-10 text-gray-500 dark:text-gray-400 text-sm font-medium">Parameter Diisi</h3>
          <p className="relative z-10 text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{filledItems}</p>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-dark-panel p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '300ms' }}>
          <Truck className="absolute -right-4 -top-4 w-24 h-24 text-yellow-50 dark:text-yellow-900/10 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
             </div>
          </div>
          <h3 className="relative z-10 text-gray-500 dark:text-gray-400 text-sm font-medium">Progress</h3>
          <div className="relative z-10 w-full bg-gray-200 dark:bg-dark-border rounded-full h-2 mt-4">
            <div className="bg-yellow-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="relative z-10 text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{percentage}%</p>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-dark-panel p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '400ms' }}>
          <Box className="absolute -right-4 -top-4 w-24 h-24 text-red-50 dark:text-red-900/10 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              Max: {maxScore}
            </span>
          </div>
          <h3 className="relative z-10 text-gray-500 dark:text-gray-400 text-sm font-medium">Total Score</h3>
          <p className="relative z-10 text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{currentScore}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-panel p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '500ms' }}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Aktivitas Checklist (7 Hari Terakhir)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSelesai" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" strokeOpacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--color-dark-panel, #fff)', color: 'var(--color-gray-900, #111)' }}
                />
                <Area type="monotone" dataKey="selesai" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorSelesai)" />
                <Area type="monotone" dataKey="pending" stroke="#EAB308" strokeWidth={3} fillOpacity={1} fill="url(#colorPending)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent List */}
        <div className="bg-white dark:bg-dark-panel p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Checklist Terbaru</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium btn-ripple px-2 py-1 rounded">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {recentChecklists.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-dark-border/50 rounded-lg transition-colors group cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-dark-border">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'Selesai' ? 'bg-green-500' : 
                    item.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#FF7A00] transition-colors">{item.id}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                    item.status === 'Selesai' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
                    item.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {item.status}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
