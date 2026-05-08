import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, syncUserToFirestore } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  userRole: string;
  isMaintenanceMode: boolean;
  maintenanceScheduledFor: number | null;
}

const AuthContext = createContext<AuthContextType>({ 
  currentUser: null, 
  loading: true,
  isAdmin: false,
  userRole: 'user',
  isMaintenanceMode: false,
  maintenanceScheduledFor: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceScheduledFor, setMaintenanceScheduledFor] = useState<number | null>(null);

  useEffect(() => {
    let unsubscribeUserObj: (() => void) | undefined;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Update user data on login/load to keep lastLogin fresh
        syncUserToFirestore(user).catch(console.error);

        setIsAdmin(
          user.email === 'adamsap8888@gmail.com' || 
          user.email === 'rrajadinadam@gmail.com'
        );
        
        // Fetch user role from database
        unsubscribeUserObj = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Check for ban
            if (data.isBanned) {
              auth.signOut();
              import('sweetalert2').then((Swal) => {
                Swal.default.fire({
                  title: 'Akses Ditolak',
                  text: 'Akun Anda telah dinonaktifkan / dikeluarkan oleh Administrator.',
                  icon: 'error',
                  confirmButtonColor: '#EF4444'
                });
              });
              return;
            }

            if (data.role) {
              setUserRole(data.role);
              if (data.role === 'admin') {
                setIsAdmin(true);
              } else {
                setIsAdmin(
                  user.email === 'adamsap8888@gmail.com' || 
                  user.email === 'rrajadinadam@gmail.com'
                );
              }
            } else {
              setUserRole('user');
              setIsAdmin(
                user.email === 'adamsap8888@gmail.com' || 
                user.email === 'rrajadinadam@gmail.com'
              );
            }
          } else {
            setUserRole('user');
            setIsAdmin(
              user.email === 'adamsap8888@gmail.com' || 
              user.email === 'rrajadinadam@gmail.com'
            );
          }
        });
      } else {
        setIsAdmin(false);
        setUserRole('user');
        if (unsubscribeUserObj) unsubscribeUserObj();
      }
      setLoading(false);
    });

    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'app'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        let mainMode = data.maintenanceMode === true;
        let mainSched = data.maintenanceScheduledFor || null;
        
        if (mainSched && Date.now() >= mainSched) {
          mainMode = true; // Force locally if time has passed
        }
        
        setIsMaintenanceMode(mainMode);
        setMaintenanceScheduledFor(mainSched);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSettings();
      if (unsubscribeUserObj) unsubscribeUserObj();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, isAdmin, userRole, isMaintenanceMode, maintenanceScheduledFor }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
