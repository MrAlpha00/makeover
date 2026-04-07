import Sidebar from './Sidebar';
import AuthGuard from './AuthGuard';
import AdminShell from './AdminShell';

export const metadata = {
  title: 'Admin Dashboard | SLV Events',
};

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <AdminShell>
        {children}
      </AdminShell>
    </AuthGuard>
  );
}
