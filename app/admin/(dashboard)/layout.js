import Sidebar from './Sidebar';
import AuthGuard from './AuthGuard';

export const metadata = {
  title: 'Admin Dashboard | SLV Events',
};

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
