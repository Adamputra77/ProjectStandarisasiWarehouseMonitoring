import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Wrench, LogOut } from 'lucide-react';
import { logOut } from './lib/firebase';
import { useAutoLogout } from './hooks/useAutoLogout';

// Helper component to protect routes
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isMaintenanceMode, isAdmin } = useAuth();
  
  // Use auto logout hook (only active when inside PrivateRoute)
  useAutoLogout();

  React.useEffect(() => {
    if (isMaintenanceMode && !isAdmin) {
      const timer = setTimeout(() => {
        logOut();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMaintenanceMode, isAdmin]);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (isMaintenanceMode && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Under Maintenance</h1>
          <p className="text-gray-500 mb-4">
            The application is currently undergoing maintenance by the administrator.
          </p>
          <p className="text-sm font-medium text-red-600 mb-8 animate-pulse">
            Anda akan di-logout otomatis dalam beberapa detik...
          </p>
          <button
            onClick={logOut}
            className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-[#FF7A00] text-white hover:bg-orange-600 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Sekarang</span>
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/*" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

