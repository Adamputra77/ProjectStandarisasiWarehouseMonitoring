import React, { useMemo } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, AlertTriangle, FileText, ArrowUpRight, PackageOpen, Truck, Warehouse, Box } from 'lucide-react';
import { QuantitativeState } from '../types';
import { quantitativeData } from '../data/checklistData';

interface OverviewTabProps {
  state?: QuantitativeState;
  allStates?: Record<string, QuantitativeState>;
}

export default function OverviewTab({ state = {}, allStates = {} }: OverviewTabProps) {
  const { totalCategories, filledCategories, totalItems, filledItems, maxScore, currentScore } = useMemo(() => {
    let mScore = 0;
    let cScore = 0;
    let fCategories = 0;
    let tItems = 0;
    let fItems = 0;

    quantitativeData.forEach(cat => {
      let isCategoryFilled = true;
      let hasItems = false;

      cat.items.forEach(item => {
        hasItems = true;
        tItems++;
        mScore += item.weight * 4;
        const s = state[item.id];
        if (s && s.status) {
          cScore += (s.score || 0) * item.weight;
          fItems++;
        } else {
          isCategoryFilled = false;
        }
      });
      
      if (hasItems && isCategoryFilled) {
        fCategories++;
      }
    });

    return { totalCategories: quantitativeData.length, filledCategories: fCategories, totalItems: tItems, filledItems: fItems, maxScore: mScore, currentScore: cScore };
  }, [state]);

  const percentage = maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;
  
  const chartData = useMemo(() => {
    return Object.keys(allStates).map(whName => {
      const whState = allStates[whName] || {};
      let whScore = 0;
      let whMaxScore = 0;
      quantitativeData.forEach(cat => {
        cat.items.forEach(item => {
          whMaxScore += item.weight * 4;
          const s = whState[item.id];
          if (s && s.status) {
            whScore += (s.score || 0) * item.weight;
          }
        });
      });
      const progress = whMaxScore > 0 ? Math.round((whScore / whMaxScore) * 100) : 0;
      
      // Get the last word of the warehouse name to fit in the chart better, e.g. "Warehouse BSD" -> "BSD"
      const shortName = whName.split(' ').pop() || whName;
      
      return {
        name: shortName,
        progress: progress,
        score: whScore,
        maxScore: whMaxScore
      };
    });
  }, [allStates]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ringkasan aktivitas standarisasi warehouse.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="relative overflow-hidden bg-white dark:bg-dark-panel p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
          <Warehouse className="absolute -right-4 -top-4 w-16 h-16 sm:w-24 sm:h-24 text-blue-50 dark:text-blue-900/10 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="hidden sm:flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
              Klausul: {totalItems}
            </span>
          </div>
          <h3 className="relative z-10 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">Total Parameter</h3>
          <p className="relative z-10 text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totalCategories}</p>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-dark-panel p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
          <PackageOpen className="absolute -right-4 -top-4 w-16 h-16 sm:w-24 sm:h-24 text-green-50 dark:text-green-900/10 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg group-hover:scale-110 transition-transform">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="hidden sm:flex items-center text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
              Klausul: {filledItems}
            </span>
          </div>
          <h3 className="relative z-10 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">Parameter Selesai</h3>
          <div className="flex items-baseline space-x-1 sm:space-x-2 mt-1">
            <p className="relative z-10 text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{filledCategories}</p>
            <p className="relative z-10 text-[10px] sm:text-sm text-gray-500 font-medium">({Math.round((filledCategories / (totalCategories || 1)) * 100)}%)</p>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-dark-panel p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '300ms' }}>
          <Truck className="absolute -right-4 -top-4 w-16 h-16 sm:w-24 sm:h-24 text-yellow-50 dark:text-yellow-900/10 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
             </div>
          </div>
          <h3 className="relative z-10 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">Progress</h3>
          <div className="relative z-10 w-full bg-gray-200 dark:bg-dark-border rounded-full h-1.5 sm:h-2 mt-2 sm:mt-4">
            <div className="bg-yellow-500 h-1.5 sm:h-2 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="relative z-10 text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1 sm:mt-2">{percentage}%</p>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-dark-panel p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '400ms' }}>
          <Box className="absolute -right-4 -top-4 w-16 h-16 sm:w-24 sm:h-24 text-red-50 dark:text-red-900/10 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="hidden sm:flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              Max: {maxScore}
            </span>
          </div>
          <h3 className="relative z-10 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">Total Score</h3>
          <p className="relative z-10 text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{currentScore}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-panel p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '500ms' }}>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Diagram Progress Checklist</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 25, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" strokeOpacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} domain={[0, 100]} />
              <Tooltip 
                cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--color-bg, white)' }}
                formatter={(value: number, name: string) => {
                  if (name === 'progress') return [`${value}%`, 'Progress'];
                  return [value, name];
                }}
              />
              <Bar 
                dataKey="progress" 
                radius={[6, 6, 0, 0]} 
                maxBarSize={60}
                animationDuration={1500}
                label={{ 
                  position: 'top', 
                  formatter: (value) => `${value}%`,
                  fill: '#6B7280', 
                  fontSize: 13, 
                  fontWeight: 600,
                  dy: -5
                }}
              >
                {chartData.map((entry, index) => {
                  let color = '#F87171'; // Lighter Red < 50%
                  if (entry.progress >= 80) {
                    color = '#4ADE80'; // Lighter Green >= 80%
                  } else if (entry.progress >= 50) {
                    color = '#FBBF24'; // Lighter Yellow 50% - 79%
                  }
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
