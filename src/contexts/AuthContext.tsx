import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  isMaintenanceMode: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  currentUser: null, 
  loading: true,
  isAdmin: false,
  isMaintenanceMode: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsAdmin(
          user.email === 'adamsap8888@gmail.com' || 
          user.email === 'rrajadinadam@gmail.com'
        );
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'app'), (doc) => {
      if (doc.exists()) {
        setIsMaintenanceMode(doc.data().maintenanceMode === true);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSettings();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, isAdmin, isMaintenanceMode }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
