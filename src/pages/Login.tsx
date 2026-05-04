import React, { useState, useEffect } from 'react';
import { Building } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, isMaintenanceMode, isAdmin } = useAuth();
  
  const navigate = useNavigate();

  useEffect(() => {
    // Tunda sebentar untuk memastikan state konsisten dan pesan maintenance bisa dihandle PrivateRoute jika perlu
    if (currentUser) {
      if (isMaintenanceMode && !isAdmin) {
         // Biarkan redirect ke home, nanti App.tsx yang handle proses sign out / tampilkan maintenance page
         navigate('/');
      } else {
         navigate('/');
      }
    }
  }, [currentUser, navigate, isMaintenanceMode, isAdmin]);

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const user = await signInWithGoogle();
      
      const email = user.email || '';
      const isPersonal = email.endsWith('@gmail.com') || email.endsWith('@googlemail.com');
      const accountTypeLabel = isPersonal ? 'Akun Pribadi' : 'Akun Korporat';
      
      Swal.fire({
        title: `Login Berhasil (${accountTypeLabel})`,
        text: `Selamat datang, ${user.displayName || email}`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });

      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Login dibatalkan. Silakan coba lagi dan selesaikan proses login Google di jendela / popup yang muncul.");
      } else {
        setError(err.message || "Gagal masuk menggunakan Google. Pastikan popup tidak diblokir oleh browser Anda.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Gambar Background Full */}
      <img
        src="/warehouse-elnusa.jpg"
        alt="Elnusa Warehouse BSD"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay adaptif untuk memberikan efek fokus pada form */}
      <div className="absolute inset-0 bg-slate-900/30 dark:bg-blue-900/40 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-black/20 dark:bg-gray-900/70 backdrop-blur-[4px]"></div>

      {/* Kontainer Form Login (Card) - Mewah Transparan */}
      <div className="relative w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl shadow-indigo-900/10 dark:shadow-black/50 rounded-3xl overflow-hidden border border-white/60 dark:border-gray-700/50">
        
        {/* Header form */}
        <div className="px-6 pt-10 pb-6 sm:px-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
              <Building className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Elnusa Warehouse
          </h2>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 font-medium px-4">
            Sistem manajemen dan standarisasi checklist gudang terpadu.
          </p>
        </div>

        <div className="px-6 pb-10 pt-2 sm:px-10">
          <div className="space-y-6">
            
            {error && (
              <div className="p-3 bg-red-100/50 dark:bg-red-900/40 backdrop-blur-md text-red-800 dark:text-red-200 text-sm rounded-lg border border-red-200/50 dark:border-red-800/50 mb-4 text-center font-medium">
                {error}
              </div>
            )}

            <div>
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                type="button"
                className="w-full flex justify-center py-3.5 px-4 border border-white/80 dark:border-gray-700/50 rounded-xl shadow-sm text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-transparent transition-all disabled:opacity-50 hover:shadow-md"
              >
                {isLoading ? (
                   <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Masuk dengan Google (Korporat / Pribadi)</span>
                  </span>
                )}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}