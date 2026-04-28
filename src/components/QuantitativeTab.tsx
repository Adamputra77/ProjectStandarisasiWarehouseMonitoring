import React from 'react';
import { QuantitativeState, RecommendationItem, RecommendationMeta } from '../types';
import { quantitativeData } from '../data/checklistData';
import { Info } from 'lucide-react';

interface QuantitativeTabProps {
  state: QuantitativeState;
  setState: React.Dispatch<React.SetStateAction<QuantitativeState>>;
}

export default function QuantitativeTab({ state, setState }: QuantitativeTabProps) {
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
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Quantitative Checklist</h2>
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
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                  <thead className="bg-gray-50 dark:bg-dark-border/50 text-gray-700 dark:text-gray-300 text-xs uppercase border-b border-gray-200 dark:border-dark-border">
                    <tr>
                      <th className="px-4 py-3 w-16 text-center">No</th>
                      <th className="px-4 py-3">Parameter</th>
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
                            <div className="group relative inline-flex items-center space-x-1.5 cursor-pointer">
                              <span>{item.parameter}</span>
                              {item.guidelines && item.guidelines.length > 0 && (
                                <div className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                  <Info className="w-4 h-4" />
                                  <div className="absolute left-0 top-full mt-2 w-80 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999] shadow-xl pointer-events-none border border-gray-600 dark:border-gray-500">
                                    <div className="font-semibold text-blue-300 dark:text-blue-200 mb-2 border-b border-gray-600 dark:border-gray-500 pb-2">Qualitative Checks:</div>
                                    <ul className="list-disc pl-4 space-y-1.5 font-normal text-gray-200 dark:text-gray-100 leading-snug">
                                      {item.guidelines.map((g, i) => (
                                        <li key={i}>{g}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
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
                                      : s === 'N' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' 
                                      : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
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
    </div>
  );
}
