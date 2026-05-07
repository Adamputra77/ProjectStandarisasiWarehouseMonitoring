import React from 'react';
import { RecommendationItem, RecommendationMeta } from '../types';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { WAREHOUSES } from '../pages/Dashboard';

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

  const updateItem = (id: string, field: keyof RecommendationItem, value: string | undefined) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleImageUpload = (id: string, field: 'beforePic' | 'afterPic', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItem(id, field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-dark-panel p-6 rounded-xl shadow-none border-none flex-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-100 dark:border-dark-border pb-4">Rekomendasi Perbaikan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date :</label>
            <input 
              type="date" 
              value={meta.month}
              onChange={(e) => setMeta(prev => ({ ...prev, month: e.target.value }))}
              className="w-full max-w-xs bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location :</label>
            <select
              value={meta.location}
              onChange={(e) => setMeta(prev => ({ ...prev, location: e.target.value }))}
              className="w-full max-w-xs bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-colors cursor-pointer"
            >
              <option value="">Select Location...</option>
              {WAREHOUSES.map((wh) => (
                <option key={wh} value={wh}>{wh}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Action Items</h3>
          <button 
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-[#FF7A00] hover:bg-[#e06c00] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-[0_4px_15px_rgba(255,122,0,0.4)] btn-ripple"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-x-auto bg-white dark:bg-dark-panel">
          <table className="w-full min-w-[800px] text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-dark-border/50 text-gray-700 dark:text-gray-300 text-xs uppercase border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-4 py-3 w-1/3">Rekomendasi Perbaikan (√)</th>
                <th className="px-4 py-3 w-40">Status End Proses</th>
                <th className="px-4 py-3 min-w-[300px]">Comment & Evidence</th>
                <th className="px-4 py-3 w-16 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-border/20 transition-colors">
                  <td className="px-4 py-3 align-top">
                    <textarea 
                      value={item.text}
                      onChange={(e) => updateItem(item.id, 'text', e.target.value)}
                      placeholder="Enter recommendation..."
                      className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-gray-100 rounded px-2 py-1 text-sm outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] min-h-[60px] resize-y transition-colors"
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <select
                      value={item.status}
                      onChange={(e) => updateItem(item.id, 'status', e.target.value)}
                      className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-gray-100 rounded px-2 py-1.5 text-sm outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Perbaikan Selesai">Perbaikan Selesai</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <textarea 
                      value={item.comment}
                      onChange={(e) => updateItem(item.id, 'comment', e.target.value)}
                      placeholder="Comments..."
                      className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-gray-100 rounded px-2 py-1 text-sm outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] min-h-[60px] resize-y mb-3 transition-colors"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Before Picture</span>
                        {item.beforePic ? (
                          <div className="relative h-24 bg-gray-100 dark:bg-dark-bg rounded border border-gray-200 dark:border-dark-border overflow-hidden group">
                            <img src={item.beforePic} alt="Before" className="w-full h-full object-cover" />
                            <button 
                              onClick={() => updateItem(item.id, 'beforePic', undefined)} 
                              className="absolute top-1 right-1 bg-white/80 dark:bg-dark-panel/80 p-1 rounded-full text-red-500 hover:bg-white dark:hover:bg-dark-panel transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-dark-border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors bg-white dark:bg-dark-bg">
                            <Upload className="w-4 h-4 text-gray-400 dark:text-gray-500 mb-1" />
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">Upload Before</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(item.id, 'beforePic', e)} 
                            />
                          </label>
                        )}
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">After Picture</span>
                        {item.afterPic ? (
                          <div className="relative h-24 bg-gray-100 dark:bg-dark-bg rounded border border-gray-200 dark:border-dark-border overflow-hidden group">
                            <img src={item.afterPic} alt="After" className="w-full h-full object-cover" />
                            <button 
                              onClick={() => updateItem(item.id, 'afterPic', undefined)} 
                              className="absolute top-1 right-1 bg-white/80 dark:bg-dark-panel/80 p-1 rounded-full text-red-500 hover:bg-white dark:hover:bg-dark-panel transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-dark-border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors bg-white dark:bg-dark-bg">
                            <Upload className="w-4 h-4 text-gray-400 dark:text-gray-500 mb-1" />
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">Upload After</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(item.id, 'afterPic', e)} 
                            />
                          </label>
                        )}
                      </div>
                    </div>
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
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
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
