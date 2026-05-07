import React, { useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, logOut } from '../lib/firebase';
import { QuantitativeState, RecommendationItem, RecommendationMeta } from '../types';
import QuantitativeTab from '../components/QuantitativeTab';
import RecommendationsTab from '../components/RecommendationsTab';
import Summary from '../components/Summary';
import UsersTab from '../components/UsersTab';
import OverviewTab from '../components/OverviewTab';
import MaintenanceWatcher from '../components/MaintenanceWatcher';
import { 
  ClipboardCheck, 
  MessageSquare, 
  BarChart3, 
  Building, 
  LogOut, 
  Users, 
  LayoutDashboard, 
  Bell, 
  Search, 
  Menu, 
  Settings,
  Moon,
  Sun,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

export const WAREHOUSES = [
  'Warehouse BSD',
  'Warehouse Cakung',
  'Warehouse Mundu',
  'Warehouse Kalitidu',
  'Warehouse Balikpapan',
  'Warehouse Duri'
];

export default function Dashboard() {
  const { currentUser, isAdmin, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'quant' | 'rec' | 'summary' | 'users'>('overview');
  
  const [activeWarehouse, setActiveWarehouse] = useState<string>(WAREHOUSES[0]);
  
  const [activeDate, setActiveDate] = useState<string>(new Date().toISOString().substring(0, 10)); // YYYY-MM-DD
  const [initialDate] = useState<string>(new Date().toISOString().substring(0, 10)); // Keep track of the fallback date for legacy data

  // States stored per warehouse
  const [warehouseData, setWarehouseData] = useState<Record<string, any>>({});
  
  useEffect(() => {
    const unsubscribes = WAREHOUSES.map(wh => {
      return onSnapshot(doc(db, 'warehouses', wh), (snapshot) => {
        if (snapshot.exists()) {
          setWarehouseData(prev => ({ ...prev, [wh]: snapshot.data() }));
        }
      });
    });
    return () => unsubscribes.forEach(unsub => unsub());
  }, []);
  
  // Helpers to get/set current warehouse state
  const quantState = warehouseData[activeWarehouse]?.quantStates?.[activeDate] 
    || (activeDate === initialDate && warehouseData[activeWarehouse]?.quantState ? warehouseData[activeWarehouse]?.quantState : {}) 
    || {};

  const setQuantState: React.Dispatch<React.SetStateAction<QuantitativeState>> = (newState) => {
    setWarehouseData(prev => {
      const currentWhData = prev[activeWarehouse] || {};
      const currentStates = currentWhData.quantStates || {};
      const prevStateForDate = currentStates[activeDate] || {};
      const actualNextState = typeof newState === 'function' ? newState(prevStateForDate) : newState;

      const nextWhData = {
        ...currentWhData,
        quantStates: {
          ...currentStates,
          [activeDate]: actualNextState
        }
      };

      setDoc(doc(db, 'warehouses', activeWarehouse), { quantStates: nextWhData.quantStates }, { merge: true }).catch(err => console.error("Error saving to Firebase:", err));

      return { ...prev, [activeWarehouse]: nextWhData };
    });
  };

  const recMeta = warehouseData[activeWarehouse]?.recMeta || { month: '', location: activeWarehouse };
  const setRecMeta: React.Dispatch<React.SetStateAction<RecommendationMeta>> = (newMeta) => {
    setWarehouseData(prev => {
      const currentMeta = prev[activeWarehouse]?.recMeta || { month: '', location: activeWarehouse };
      const nextMeta = typeof newMeta === 'function' ? newMeta(currentMeta) : newMeta;
      
      setDoc(doc(db, 'warehouses', activeWarehouse), { recMeta: nextMeta }, { merge: true }).catch(err => console.error("Error saving to Firebase:", err));
      
      return { ...prev, [activeWarehouse]: { ...prev[activeWarehouse], recMeta: nextMeta } };
    });
  };

  const recItems = warehouseData[activeWarehouse]?.recItems || [];
  const setRecItems: React.Dispatch<React.SetStateAction<RecommendationItem[]>> = (newItems) => {
    setWarehouseData(prev => {
      const currentItems = prev[activeWarehouse]?.recItems || [];
      const nextItems = typeof newItems === 'function' ? newItems(currentItems) : newItems;
      
      setDoc(doc(db, 'warehouses', activeWarehouse), { recItems: nextItems }, { merge: true }).catch(err => console.error("Error saving to Firebase:", err));
      
      return { ...prev, [activeWarehouse]: { ...prev[activeWarehouse], recItems: nextItems } };
    });
  };

  const allQuantStates = useMemo(() => {
    const states: Record<string, QuantitativeState> = {};
    WAREHOUSES.forEach(wh => {
      const whData = warehouseData[wh];
      if (whData) {
        states[wh] = whData.quantStates?.[activeDate] || (activeDate === initialDate && whData.quantState ? whData.quantState : {}) || {};
      } else {
        states[wh] = {};
      }
    });
    return states;
  }, [warehouseData, activeDate, initialDate]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quant', label: 'Checklist Kuantitatif', icon: ClipboardCheck },
    { id: 'rec', label: 'Rekomendasi', icon: MessageSquare },
    { id: 'summary', label: 'Laporan', icon: BarChart3 },
  ] as const;

  return (
    <div className="flex flex-col h-screen print:h-auto overflow-hidden">
      <MaintenanceWatcher />
      <div className={`flex flex-1 min-h-0 bg-[#F3F4F6] dark:bg-dark-bg font-[Poppins] transition-colors duration-300`}>
        {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/*  print:hidden added */}
      <aside className={`print:hidden bg-[#0A2647] dark:bg-[#06182c] text-white transition-all duration-300 z-30 shrink-0 shadow-xl ${
        isSidebarOpen ? 'w-64 absolute md:relative h-full' : 'w-0 md:w-20 hidden md:flex'
      } flex-col overflow-hidden`}>

        <div className="h-16 flex items-center px-4 border-b border-white/10 shrink-0 overflow-hidden">
          <div className={`w-8 h-8 rounded bg-[#FF7A00] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,122,0,0.4)] ${!isSidebarOpen && 'md:mx-auto'}`}>
            <Building className="w-5 h-5 text-white" />
          </div>
          <div className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${!isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'}`}>
            <h1 className="text-lg font-bold leading-tight tracking-wide">Elnusa</h1>
            <p className="text-[10px] text-blue-200 tracking-wider uppercase font-medium">Warehouse</p>
          </div>
        </div>

        <div className="flex-1 py-6 overflow-y-auto overflow-x-hidden">
          {/* Mobile Global Selectors inside Sidebar */}
          <div className="px-4 mb-6 md:hidden space-y-3">
            <div>
              <p className="text-xs font-semibold text-blue-300/50 uppercase tracking-wider mb-2">
                Tanggal Checklist
              </p>
              <div className="relative group flex items-center bg-white/5 rounded-lg border border-white/10 px-3 py-2 transition-colors">
                <input
                  type="date"
                  value={activeDate}
                  onChange={(e) => setActiveDate(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-semibold text-blue-100 cursor-pointer appearance-none w-full"
                />
              </div>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-blue-300/50 uppercase tracking-wider mb-2">
                Lokasi Warehouse
              </p>
              <div className="relative group flex items-center bg-white/5 rounded-lg border border-white/10 px-3 py-2 transition-colors">
                <MapPin className="w-4 h-4 text-[#FF7A00] mr-2 shrink-0" />
                <select
                  value={activeWarehouse}
                  onChange={(e) => setActiveWarehouse(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-semibold text-blue-100 cursor-pointer appearance-none pr-4 w-full"
                >
                  {WAREHOUSES.map((wh) => (
                    <option key={wh} value={wh} className="text-gray-900">
                      {wh}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2 flex items-center">
                  <svg className="w-4 h-4 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <p className={`px-6 text-xs font-semibold text-blue-300/50 uppercase tracking-wider mb-4 transition-opacity ${!isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'}`}>
            Menu Utama
          </p>
          <nav className="space-y-1.5 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all group relative btn-ripple overflow-visible ${
                  activeTab === item.id 
                    ? 'bg-white/10 text-[#FF7A00] shadow-inner' 
                    : 'text-blue-100 hover:bg-white/5 hover:text-white'
                }`}
                title={item.label}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FF7A00] rounded-r-full" />
                )}
                <item.icon className="w-5 h-5 shrink-0" />
                <span className={`ml-3 whitespace-nowrap transition-opacity ${!isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'}`}>
                  {item.label}
                </span>

                {!isSidebarOpen && (
                  <div className="absolute left-14 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg hidden md:block">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
            
            {isAdmin && (
              <>
                <p className={`px-6 mt-8 mb-4 text-xs font-semibold text-blue-300/50 uppercase tracking-wider transition-opacity ${!isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'}`}>
                  Admin
                </p>
                <button
                  onClick={() => {
                    setActiveTab('users');
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all group relative btn-ripple overflow-visible ${
                    activeTab === 'users' 
                      ? 'bg-white/10 text-[#FF7A00] shadow-inner' 
                      : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }`}
                  title="Users & Settings"
                >
                  {activeTab === 'users' && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FF7A00] rounded-r-full" />
                  )}
                  <Users className="w-5 h-5 shrink-0" />
                  <span className={`ml-3 whitespace-nowrap transition-opacity ${!isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'}`}>
                    Management User
                  </span>

                  {!isSidebarOpen && (
                    <div className="absolute left-14 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg hidden md:block">
                      Management User
                    </div>
                  )}
                </button>
              </>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={logOut}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium text-blue-200 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors btn-ripple ${
              !isSidebarOpen && 'md:justify-center'
            }`}
            title="Log out"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className={`ml-3 whitespace-nowrap transition-opacity ${!isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'}`}>
              Log out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible bg-grid-pattern dark:bg-grid-pattern relative">
        {/* Top Navbar */}
        <header className="print:hidden h-16 bg-white/90 dark:bg-dark-panel/90 backdrop-blur-md border-b border-gray-200 dark:border-dark-border flex items-center justify-between px-4 sm:px-6 z-10 shrink-0 transition-colors duration-300">

          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors mr-4 btn-ripple"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg max-w-md w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all group mr-4">
              <Search className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors mr-2" />
              <input 
                type="text" 
                placeholder="Cari checklist, laporan..." 
                className="bg-transparent border-none outline-none text-sm w-48 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Global Date Selector */}
            <div className="relative group items-center bg-gray-50 dark:bg-dark-border/20 rounded-lg border border-gray-200 dark:border-dark-border px-3 py-1.5 transition-colors hidden md:flex">
              <input
                type="date"
                value={activeDate}
                onChange={(e) => setActiveDate(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer appearance-none"
              />
            </div>
            
            {/* Warehouse Selector */}
            <div className="relative group flex items-center bg-blue-50 dark:bg-[#0A2647] rounded-lg border border-blue-100 dark:border-[#133A6B] px-3 py-1.5 transition-colors hidden md:flex">
              <MapPin className="w-4 h-4 text-[#FF7A00] mr-2" />
              <select
                value={activeWarehouse}
                onChange={(e) => setActiveWarehouse(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-semibold text-blue-900 dark:text-blue-100 cursor-pointer appearance-none pr-4"
              >
                {WAREHOUSES.map((wh) => (
                  <option key={wh} value={wh} className="text-gray-800 dark:text-gray-800">
                    {wh}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 flex items-center">
                <svg className="w-4 h-4 text-blue-900 dark:text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            <button 
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-dark-border btn-ripple"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-dark-border btn-ripple" 
              title="Notifikasi"
              onClick={() => {
                Swal.fire({
                  title: 'Tidak ada notifikasi',
                  text: 'Anda sudah membaca semua pemberitahuan saat ini.',
                  icon: 'info',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Oke',
                });
              }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF7A00] rounded-full border-2 border-white dark:border-dark-panel"></span>
            </button>
            <div className="h-6 w-px bg-gray-200 dark:bg-dark-border hidden sm:block"></div>
            <div className="flex items-center space-x-3 cursor-pointer group px-2 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border/50 transition-colors">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{currentUser?.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userRole === 'supervisor' ? 'Supervisor' : isAdmin ? 'Administrator' : 'Staf Warehouse'}
                </p>
              </div>
              <img 
                src={currentUser?.photoURL || 'https://ui-avatars.com/api/?name=' + (currentUser?.displayName || 'User') + '&background=0A2647&color=fff'} 
                alt="Profile" 
                className="w-9 h-9 rounded-full border-2 border-white dark:border-dark-panel shadow-sm group-hover:border-blue-100 dark:group-hover:border-blue-800 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-auto print:overflow-visible p-3 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {activeTab === 'overview' && <OverviewTab state={quantState} allStates={allQuantStates} />}
            {activeTab === 'quant' && (
              <div className="bg-white dark:bg-dark-panel rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-dark-border p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <QuantitativeTab state={quantState} setState={setQuantState} activeDate={activeDate} setActiveDate={setActiveDate} />
              </div>
            )}
            {activeTab === 'rec' && (
              <div className="bg-white dark:bg-dark-panel rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-dark-border p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <RecommendationsTab meta={recMeta} setMeta={setRecMeta} items={recItems} setItems={setRecItems} />
              </div>
            )}
            {activeTab === 'summary' && (
              <div className="bg-white dark:bg-dark-panel rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-dark-border p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <Summary state={quantState} activeWarehouse={activeWarehouse} activeDate={activeDate} />
              </div>
            )}
            {activeTab === 'users' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <UsersTab />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}
