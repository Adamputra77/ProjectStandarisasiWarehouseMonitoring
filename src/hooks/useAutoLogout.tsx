import { useEffect, useRef } from 'react';
import { logOut } from '../lib/firebase';
import Swal from 'sweetalert2';

const TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes in milliseconds

export function useAutoLogout() {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleLogout = () => {
      logOut();
      Swal.fire({
        title: 'Sesi Berakhir',
        text: 'Anda telah logout otomatis karena tidak ada aktivitas selama 15 menit.',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    };

    const resetTimer = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(handleLogout, TIMEOUT_MS);
    };

    // Initialize timer
    resetTimer();

    // Events to track
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    
    // Throttle the resets lightly for performance if needed, but modern browsers handle this okay.
    let isThrottled = false;
    const activityHandler = () => {
      if (!isThrottled) {
        resetTimer();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 1000); // Only reset timer max once per second
      }
    };

    events.forEach(event => {
      window.addEventListener(event, activityHandler);
    });

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, activityHandler);
      });
    };
  }, []);
}
