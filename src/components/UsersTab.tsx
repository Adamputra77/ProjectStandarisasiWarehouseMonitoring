import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, doc, setDoc, writeBatch, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { Shield, ShieldAlert, User as UserIcon, Loader2, Settings, Wrench } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  lastLogin: string;
  role: string;
  isBanned?: boolean;
}

export default function UsersTab() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMaintenanceMode } = useAuth();
  const [togglingMaintenance, setTogglingMaintenance] = useState(false);

  const toggleUserBan = async (userId: string, currentBanStatus: boolean) => {
    try {
      const newBanStatus = !currentBanStatus;
      await setDoc(doc(db, 'users', userId), { isBanned: newBanStatus }, { merge: true });
      
      setUsers(users.map(u => u.uid === userId ? { ...u, isBanned: newBanStatus } : u));
      Swal.fire({
        title: 'Berhasil!',
        text: newBanStatus ? 'User berhasil dikeluarkan.' : 'User berhasil dipulihkan.',
        icon: 'success',
        confirmButtonColor: '#10B981',
      });
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: 'Gagal',
        text: 'Anda tidak memiliki akses atau terjadi kesalahan.',
        icon: 'error',
      });
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Hapus User?',
        text: 'Data user ini akan dihapus dari sistem (database).',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        const batch = writeBatch(db);
        batch.delete(doc(db, 'users', userId));
        batch.delete(doc(db, 'admins', userId)); // in case they were admin
        await batch.commit();
        
        setUsers(users.filter(u => u.uid !== userId));
        
        Swal.fire(
          'Terhapus!',
          'Data user telah dihapus.',
          'success'
        );
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: 'Gagal',
        text: 'Anda tidak memiliki akses atau terjadi kesalahan.',
        icon: 'error',
      });
    }
  };

  const toggleMaintenance = async () => {
    if (isMaintenanceMode) {
      try {
        setTogglingMaintenance(true);
        await setDoc(doc(db, 'settings', 'app'), {
          maintenanceMode: false,
          maintenanceScheduledFor: null
        }, { merge: true });
        
        Swal.fire({
          title: 'Sukses!',
          text: `Mode Maintenance berhasil dinonaktifkan.`,
          icon: 'success',
          confirmButtonColor: '#10B981',
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat mengubah mode maintenance.',
          icon: 'error',
          confirmButtonColor: '#EF4444',
        });
      } finally {
        setTogglingMaintenance(false);
      }
    } else {
      const { value: delay } = await Swal.fire({
        title: 'Aktifkan Maintenance Mode',
        text: 'Pilih kapan maintenance akan dimulai. Pengguna akan mendapatkan notifikasi.',
        input: 'select',
        inputOptions: {
          '0': 'Sekarang Juga',
          '5': '5 Menit Lagi',
          '10': '10 Menit Lagi',
          '15': '15 Menit Lagi',
          '30': '30 Menit Lagi'
        },
        inputPlaceholder: 'Pilih Waktu',
        showCancelButton: true,
        confirmButtonColor: '#FF7A00',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Mulai'
      });
      
      if (delay !== undefined) {
        try {
          setTogglingMaintenance(true);
          const numDelay = parseInt(delay);
          
          if (numDelay === 0) {
            await setDoc(doc(db, 'settings', 'app'), {
              maintenanceMode: true,
              maintenanceScheduledFor: null
            }, { merge: true });
          } else {
            // Give some buffer, scheduling for future
            const scheduledTime = Date.now() + numDelay * 60 * 1000;
            await setDoc(doc(db, 'settings', 'app'), {
              maintenanceMode: false,
              maintenanceScheduledFor: scheduledTime
            }, { merge: true });
          }
          
          Swal.fire({
            title: 'Sukses!',
            text: numDelay === 0 ? 'Mode Maintenance berhasil diaktifkan.' : `Maintenance dijadwalkan dalam ${numDelay} menit.`,
            icon: 'success',
            confirmButtonColor: '#FF7A00',
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat mengatur maintenance.',
            icon: 'error',
            confirmButtonColor: '#EF4444',
          });
        } finally {
          setTogglingMaintenance(false);
        }
      }
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const batch = writeBatch(db);
      // Update in users collection
      batch.set(doc(db, 'users', userId), { role: newRole }, { merge: true });
      
      // Update admins collection based on role
      if (newRole === 'admin') {
        batch.set(doc(db, 'admins', userId), { createdAt: serverTimestamp() });
      } else {
        batch.delete(doc(db, 'admins', userId));
      }
      
      await batch.commit();
      
      setUsers(users.map(u => u.uid === userId ? { ...u, role: newRole } : u));
      Swal.fire({
        title: 'Berhasil!',
        text: `Role user berhasil diubah menjadi ${newRole}.`,
        icon: 'success',
        confirmButtonColor: '#10B981', // green
      });
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: 'Gagal',
        text: 'Anda tidak memiliki akses atau terjadi kesalahan.',
        icon: 'error',
        confirmButtonColor: '#EF4444', // red
      });
      handleFirestoreError(err, OperationType.WRITE, 'users/admins');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        const usersList: UserData[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data() as UserData);
        });
        setUsers(usersList);
      } catch (err: any) {
        console.error("Error fetching users:", err);
        if (err.message) setError(err.message);
        
        try {
          handleFirestoreError(err, OperationType.LIST, 'users');
        } catch (e: any) {
          // It throws, we already caught message
          if (!error) setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30 flex items-start space-x-3 max-w-4xl">
        <ShieldAlert className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold mb-1">Access Restricted or Error</h3>
          <p className="text-sm">Cannot retrieve users list. Your account might not have admin rights, or the rules have not been configured to allow reading the users list.</p>
          <pre className="mt-3 p-3 bg-red-100/50 dark:bg-red-900/40 rounded text-xs overflow-auto max-w-full">
            {error}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-panel p-6 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm animate-in fade-in duration-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center mb-4">
          <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
          Application Settings
        </h2>
        <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-dark-border rounded-lg bg-gray-50/50 dark:bg-dark-bg">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100 flex items-center mb-1">
              <Wrench className="w-4 h-4 mr-2" />
              Maintenance Mode
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              When enabled, only administrators will be able to access the dashboard.
            </p>
          </div>
          <button
            onClick={toggleMaintenance}
            disabled={togglingMaintenance}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 dark:focus:ring-offset-dark-panel disabled:opacity-50 ${
              isMaintenanceMode ? 'bg-[#FF7A00]' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isMaintenanceMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-panel overflow-hidden rounded-xl border border-gray-200 dark:border-dark-border shadow-sm animate-in fade-in duration-500">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              Registered Users
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Displaying all users registered via Google or Email.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
             {users.length} Total Users
          </div>
        </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-dark-border/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-medium border-b border-gray-200 dark:border-dark-border">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Last Login</th>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  <UserIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p>No users found in the database.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Users will appear here once they log in.</p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50/50 dark:hover:bg-dark-border/20 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-gray-200 dark:border-dark-border" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{user.displayName || 'Unknown Name'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role || 'user'}
                      onChange={(e) => updateUserRole(user.uid, e.target.value)}
                      className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border-0 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 appearance-none ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' 
                          : user.role === 'supervisor'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <option value="user" className="bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100">User</option>
                      <option value="supervisor" className="bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100">Supervisor</option>
                      <option value="admin" className="bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-gray-400 dark:text-gray-500 font-mono text-[10px]">
                    {user.uid}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => toggleUserBan(user.uid, !!user.isBanned)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark-panel transition-all ${
                          user.isBanned 
                            ? 'bg-orange-100 hover:bg-orange-200 text-orange-700 focus:ring-orange-500 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 dark:text-orange-400'
                            : 'bg-red-50 hover:bg-red-100 text-red-600 focus:ring-red-500 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-900/30'
                        }`}
                      >
                        {user.isBanned ? 'Pulihkan' : 'Keluarkan'}
                      </button>
                      <button
                        onClick={() => deleteUser(user.uid)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark-panel transition-all bg-gray-100 hover:bg-red-600 hover:text-white text-gray-700 focus:ring-red-500 dark:bg-gray-800 dark:hover:bg-red-700 dark:text-gray-300 border border-transparent dark:border-dark-border"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
