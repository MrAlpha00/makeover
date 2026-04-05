import Sidebar from './Sidebar';
import AuthGuard from './AuthGuard';

export const metadata = {
  title: 'Admin Dashboard | SLV Events',
};

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-dark-900">
        <Sidebar />
        <main className="lg:ml-64 p-6">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
