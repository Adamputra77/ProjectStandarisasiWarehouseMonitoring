import { useState } from 'react';
import { QualitativeItem, QuantitativeState, RecommendationItem, RecommendationMeta } from '../types';
import { qualitativeData } from '../data/checklistData';
import QuantitativeTab from '../components/QuantitativeTab';
import QualitativeTab from '../components/QualitativeTab';
import RecommendationsTab from '../components/RecommendationsTab';
import Summary from '../components/Summary';
import { ClipboardCheck, CheckSquare, MessageSquare, BarChart3, Building, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../lib/firebase';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'quant' | 'qual' | 'rec' | 'summary'>('quant');
  const [quantState, setQuantState] = useState<QuantitativeState>({});
  
  const initialQualState: QualitativeItem[] = qualitativeData.map((remark, idx) => ({
    id: `qual-${idx}`,
    remark,
    pic: '',
    checked: false
  }));
  const [qualState, setQualState] = useState<QualitativeItem[]>(initialQualState);
  
  const [recMeta, setRecMeta] = useState<RecommendationMeta>({ month: '', location: '' });
  const [recItems, setRecItems] = useState<RecommendationItem[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                  Elnusa Warehouse
                </h1>
                <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-widest">Standard Checklist</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-sm font-medium text-gray-800">{currentUser?.displayName}</span>
                <span className="text-xs text-gray-500">{currentUser?.email}</span>
              </div>
              <img 
                src={currentUser?.photoURL || 'https://picsum.photos/seed/user/100/100'} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-200 hidden md:block"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={logOut}
                className="text-gray-500 hover:text-red-600 flex items-center space-x-1 p-2 transition-colors ml-4"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-t border-gray-100 pt-3">
             <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
              <button
                onClick={() => setActiveTab('quant')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'quant' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Quantitative</span>
              </button>
              <button
                onClick={() => setActiveTab('qual')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'qual' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>Qualitative</span>
              </button>
              <button
                onClick={() => setActiveTab('rec')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'rec' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Recommendations</span>
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'summary' 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Summary</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[500px] p-4 md:p-6">
          {activeTab === 'quant' && <QuantitativeTab state={quantState} setState={setQuantState} />}
          {activeTab === 'qual' && <QualitativeTab state={qualState} setState={setQualState} />}
          {activeTab === 'rec' && <RecommendationsTab meta={recMeta} setMeta={setRecMeta} items={recItems} setItems={setRecItems} />}
          {activeTab === 'summary' && <Summary state={quantState} />}
        </div>
      </main>
      
      <footer className="mt-auto border-t border-gray-200 bg-white text-center py-6 text-gray-500 text-sm">
        <p>Elnusa Warehouse Standard Checklist &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
