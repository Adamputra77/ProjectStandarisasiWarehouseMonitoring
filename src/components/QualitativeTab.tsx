import React from 'react';
import { qualitativeData } from '../data/checklistData';
import { QualitativeItem } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface QualitativeTabProps {
  state: QualitativeItem[];
  setState: React.Dispatch<React.SetStateAction<QualitativeItem[]>>;
}

export default function QualitativeTab({ state, setState }: QualitativeTabProps) {
  const handleToggle = (id: string) => {
    setState(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handlePicChange = (id: string, pic: string) => {
    setState(prev => prev.map(item => 
      item.id === id ? { ...item, pic } : item
    ));
  };

  const handleRemarkChange = (id: string, remark: string) => {
    setState(prev => prev.map(item => 
      item.id === id ? { ...item, remark } : item
    ));
  };

  const handleAdd = () => {
    setState(prev => [
      ...prev,
      { id: Date.now().toString(), remark: '', pic: '', checked: false }
    ]);
  };

  const handleDelete = (id: string) => {
    setState(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Checklist Standard Warehouse</h2>
            <p className="text-gray-500 text-sm">Review standard qualitative parameters, check if compliant, and assign a PIC.</p>
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-12 text-center">Status</th>
                <th className="px-4 py-3">Remark</th>
                <th className="px-4 py-3 w-48">PIC</th>
                <th className="px-4 py-3 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {state.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-center">
                    <input 
                      type="checkbox" 
                      checked={item.checked}
                      onChange={() => handleToggle(item.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input 
                      type="text" 
                      value={item.remark}
                      onChange={(e) => handleRemarkChange(item.id, e.target.value)}
                      placeholder="Enter remark description..."
                      className="w-full bg-transparent border-0 outline-none focus:ring-0 p-0 text-gray-800"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input 
                      type="text" 
                      value={item.pic}
                      onChange={(e) => handlePicChange(item.id, e.target.value)}
                      placeholder="Name..."
                      className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              {state.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    No remarks added. Click "Add Item" to start.
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
