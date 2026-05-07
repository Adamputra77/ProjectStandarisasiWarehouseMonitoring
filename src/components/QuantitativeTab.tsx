import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { QuantitativeState, RecommendationItem, RecommendationMeta } from '../types';
import { quantitativeData } from '../data/checklistData';
import { Info } from 'lucide-react';
import Swal from 'sweetalert2';

interface QuantitativeTabProps {
  state: QuantitativeState;
  setState: React.Dispatch<React.SetStateAction<QuantitativeState>>;
  activeDate: string;
  setActiveDate: (val: string) => void;
}

export default function QuantitativeTab({ state, setState, activeDate, setActiveDate }: QuantitativeTabProps) {
  const [tooltip, setTooltip] = useState<{ x: number, y: number, guidelines: string[] } | null>(null);

  const handleStatusChange = (id: string, newStatus: 'Y' | 'N' | 'NA') => {
    setState((prev) => {
      const current = prev[id] || { status: '', score: 0 };
      let newScore = current.score;
      if (newStatus === 'NA') {
        newScore = 4; // Auto max score when Not Applicable
      } else if (current.status === 'NA') {
        newScore = 0; // Reset
      }
      return { ...prev, [id]: { ...current, status: newStatus, score: newScore } };
    });
  };

  const handleScoreChange = (id: string, newScore: number) => {
    setState((prev) => {
      const current = prev[id] || { status: '', score: 0 };
      if (current.status === 'NA') return prev; // Cannot change score if NA
      return { ...prev, [id]: { ...current, score: newScore } };
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-dark-panel p-0 rounded-xl shadow-none border-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Quantitative Checklist</h2>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">Date:</span>
            <input 
              type="date"
              value={activeDate}
              onChange={(e) => setActiveDate(e.target.value)}
              className="bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-gray-100 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-colors flex-1 sm:flex-none w-full sm:w-auto"
            />
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Evaluate each parameter. Select Available (Y), Not Available (N), or Not Applicable (NA). Provide a score from 1 (Poor) to 4 (Excellent).</p>
        
        <div className="space-y-12">
          {quantitativeData.map((category) => (
            <div key={category.id} className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden bg-white dark:bg-dark-panel">
              <div className="bg-blue-50 dark:bg-[#0A2647] px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-dark-border">
                <h3 className="font-semibold text-blue-900 dark:text-gray-100 tracking-wide">
                  {category.no}. {category.name}
                </h3>
                <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                  Max Weight: {category.weight}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 min-w-[800px]">
                  <thead className="bg-gray-50 dark:bg-dark-border/50 text-gray-700 dark:text-gray-300 text-xs uppercase border-b border-gray-200 dark:border-dark-border">
                    <tr>
                      <th className="px-4 py-3 w-16 text-center">No</th>
                      <th className="px-4 py-3">Klausul</th>
                      <th className="px-4 py-3 w-20 text-center">Weight</th>
                      <th className="px-4 py-3 w-40 text-center">Status</th>
                      <th className="px-4 py-3 w-32 text-center">Score (1-4)</th>
                      <th className="px-4 py-3 w-24 text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                    {category.items.map((item) => {
                      const itemState = state[item.id] || { status: '', score: 0 };
                      const totalScore = itemState.score * item.weight;
                      return (
                        <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-border/20 transition-colors">
                          <td className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">{item.no}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-200">
                            <div 
                              className={`inline-flex items-center space-x-1.5 ${item.guidelines && item.guidelines.length > 0 ? 'cursor-help group/klausul' : ''}`}
                              onMouseMove={(e) => {
                                if (item.guidelines && item.guidelines.length > 0) {
                                  setTooltip({ x: e.clientX + 15, y: e.clientY + 15, guidelines: item.guidelines });
                                }
                              }}
                              onMouseLeave={() => setTooltip(null)}
                              onClick={(e) => {
                                if (item.guidelines && item.guidelines.length > 0) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const guidelinesHtml = `<ul style="text-align: left; margin-left: 20px; list-style-type: disc;">` + 
                                    item.guidelines.map(g => `<li>${g}</li>`).join('') + 
                                    `</ul>`;
                                  Swal.fire({
                                    title: 'Qualitative Checks',
                                    html: guidelinesHtml,
                                    icon: 'info',
                                    confirmButtonColor: '#3085d6',
                                  });
                                }
                              }}
                            >
                              <span className={item.guidelines && item.guidelines.length > 0 ? 'decoration-dashed decoration-gray-400 dark:decoration-gray-500 underline-offset-4 group-hover/klausul:underline' : ''}>
                                {item.parameter}
                              </span>
                              {item.guidelines && item.guidelines.length > 0 && (
                                <Info className="w-4 h-4 text-blue-500 dark:text-blue-400 opacity-60 group-hover/klausul:opacity-100 transition-opacity" />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 font-mono">{item.weight}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              {(['Y', 'N', 'NA'] as const).map((s) => (
                                <button
                                  key={s}
                                  onClick={() => handleStatusChange(item.id, s)}
                                  className={`px-2 py-1 text-xs font-medium rounded border transition-colors btn-ripple overflow-visible ${
                                    itemState.status === s 
                                      ? s === 'Y' ? 'bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-700' 
                                      : s === 'N' ? 'bg-red-500 text-white border-red-600 dark:bg-red-600 dark:border-red-700' 
                                      : 'bg-amber-500 text-white border-amber-600 dark:bg-amber-600 dark:border-amber-700'
                                      : 'bg-white dark:bg-dark-panel text-gray-500 dark:text-gray-400 border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border/50'
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <select
                              value={itemState.score}
                              onChange={(e) => handleScoreChange(item.id, parseInt(e.target.value))}
                              disabled={itemState.status === 'NA'}
                              className="border border-gray-200 dark:border-dark-border rounded px-2 py-1 bg-white dark:bg-dark-panel text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-16 text-center disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-dark-border transition-colors"
                            >
                              <option value="0">-</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-gray-100">
                            {totalScore > 0 ? totalScore : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {tooltip && createPortal(
        <div 
          className="hidden sm:block fixed z-[100] w-80 bg-gray-900 border border-gray-700 text-white text-xs rounded-lg shadow-2xl pointer-events-none animate-in fade-in duration-100 ease-out"
          style={{ 
            left: Math.min(tooltip.x, window.innerWidth - 340),
            top: Math.min(tooltip.y, window.innerHeight - 200)
          }}
        >
          <div className="px-4 py-3 border-b border-gray-700/60 bg-gray-800/50 rounded-t-lg">
            <h4 className="font-semibold text-gray-100">Qualitative Checks</h4>
          </div>
          <div className="p-4">
            <ul className="list-disc ml-4 space-y-2">
              {tooltip.guidelines.map((g, idx) => (
                <li key={idx} className="text-gray-300 leading-relaxed">{g}</li>
              ))}
            </ul>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
