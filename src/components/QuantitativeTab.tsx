import React from 'react';
import { QualitativeItem, QuantitativeState, RecommendationItem, RecommendationMeta } from '../types';
import { quantitativeData } from '../data/checklistData';

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
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Quantitative Checklist</h2>
        <p className="text-gray-500 text-sm mb-6">Evaluate each parameter. Select Available (Y), Not Available (N), or Not Applicable (NA). Provide a score from 1 (Poor) to 4 (Excellent).</p>
        
        <div className="space-y-12">
          {quantitativeData.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
                <h3 className="font-semibold text-blue-900">
                  {category.no}. {category.name}
                </h3>
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Max Weight: {category.weight}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 text-xs uppercase border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 w-16 text-center">No</th>
                      <th className="px-4 py-3">Parameter</th>
                      <th className="px-4 py-3 w-20 text-center">Weight</th>
                      <th className="px-4 py-3 w-40 text-center">Status</th>
                      <th className="px-4 py-3 w-32 text-center">Score (1-4)</th>
                      <th className="px-4 py-3 w-24 text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {category.items.map((item) => {
                      const itemState = state[item.id] || { status: '', score: 0 };
                      const totalScore = itemState.score * item.weight;
                      return (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-center text-gray-500">{item.no}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{item.parameter}</td>
                          <td className="px-4 py-3 text-center text-gray-500 font-mono">{item.weight}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              {(['Y', 'N', 'NA'] as const).map((s) => (
                                <button
                                  key={s}
                                  onClick={() => handleStatusChange(item.id, s)}
                                  className={`px-2 py-1 text-xs font-medium rounded border ${
                                    itemState.status === s 
                                      ? s === 'Y' ? 'bg-green-100 text-green-700 border-green-200' 
                                      : s === 'N' ? 'bg-red-100 text-red-700 border-red-200' 
                                      : 'bg-gray-200 text-gray-700 border-gray-300'
                                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
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
                              className="border border-gray-200 rounded px-2 py-1 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-16 text-center disabled:opacity-50 disabled:bg-gray-50"
                            >
                              <option value="0">-</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-center font-semibold text-gray-900">
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
