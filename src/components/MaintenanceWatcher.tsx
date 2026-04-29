import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';
import { logOut } from '../lib/firebase';

export default function MaintenanceWatcher() {
  const { maintenanceScheduledFor, isMaintenanceMode, isAdmin } = useAuth();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!maintenanceScheduledFor || isMaintenanceMode) {
      setTimeLeft(null);
      return;
    }

    const checkTime = () => {
      const now = Date.now();
      const diff = maintenanceScheduledFor - now;
      
      if (diff <= 0) {
        setTimeLeft(0);
        if (!isAdmin) {
          Swal.fire({
            title: 'Waktu Habis!',
            text: 'Aplikasi sekarang memasuki masa maintenance. Anda akan di-logout otomatis.',
            icon: 'warning',
            confirmButtonColor: '#FF7A00',
            allowOutsideClick: false,
            timer: 5000,
            timerProgressBar: true,
          }).then(() => {
            logOut();
          });
        } else {
          // If admin, update DB cleanly to maintenance mode, this naturally clears the banner
          import('firebase/firestore').then(({ doc, setDoc }) => {
            import('../lib/firebase').then(({ db }) => {
              setDoc(doc(db, 'settings', 'app'), {
                maintenanceMode: true,
                maintenanceScheduledFor: null
              }, { merge: true });
            });
          });
        }
      } else {
        setTimeLeft(diff);
      }
    };

    // Check immediately
    checkTime();

    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [maintenanceScheduledFor, isMaintenanceMode, isAdmin]);

  if (!timeLeft || isMaintenanceMode || timeLeft <= 0) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="bg-red-500 text-white px-4 py-2 flex items-center justify-center space-x-3 z-50 shadow-md">
      <AlertTriangle className="w-5 h-5 animate-pulse" />
      <span className="font-medium text-sm sm:text-base">
        Aplikasi akan memasuki masa maintenance dalam 
        <strong className="ml-1 font-mono tracking-wider">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </strong>
      </span>
      <span className="hidden sm:inline text-sm text-red-100 ml-2 border-l border-red-400 pl-2">
        Harap simpan pekerjaan Anda dan log out.
      </span>
    </div>
  );
}
