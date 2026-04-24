import React from 'react';
import { RecommendationItem, RecommendationMeta } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface RecommendationsTabProps {
  meta: RecommendationMeta;
  setMeta: React.Dispatch<React.SetStateAction<RecommendationMeta>>;
  items: RecommendationItem[];
  setItems: React.Dispatch<React.SetStateAction<RecommendationItem[]>>;
}

export default function RecommendationsTab({ meta, setMeta, items, setItems }: RecommendationsTabProps) {
  const handleAdd = () => {
    setItems(prev => [
      ...prev,
      { id: Date.now().toString(), text: '', status: '', comment: '' }
    ]);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof RecommendationItem, value: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Rekomendasi Perbaikan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month :</label>
            <input 
              type="text" 
              value={meta.month}
              onChange={(e) => setMeta(prev => ({ ...prev, month: e.target.value }))}
              className="w-full max-w-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="e.g. October 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location :</label>
            <input 
              type="text" 
              value={meta.location}
              onChange={(e) => setMeta(prev => ({ ...prev, location: e.target.value }))}
              className="w-full max-w-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="e.g. Warehouse A"
            />
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Action Items</h3>
          <button 
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-1/3">Rekomendasi Perbaikan (√)</th>
                <th className="px-4 py-3 w-40">Status End Proses</th>
                <th className="px-4 py-3">Comment</th>
                <th className="px-4 py-3 w-16 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 align-top">
                    <textarea 
                      value={item.text}
                      onChange={(e) => updateItem(item.id, 'text', e.target.value)}
                      placeholder="Enter recommendation..."
                      className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 min-h-[60px] resize-y"
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <select
                      value={item.status}
                      onChange={(e) => updateItem(item.id, 'status', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    >
                      <option value="">Select...</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <textarea 
                      value={item.comment}
                      onChange={(e) => updateItem(item.id, 'comment', e.target.value)}
                      placeholder="Comments..."
                      className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 min-h-[60px] resize-y"
                    />
                  </td>
                  <td className="px-4 py-3 text-center align-top pt-5">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove row"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    No recommendations yet. Click "Add Row" to begin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
