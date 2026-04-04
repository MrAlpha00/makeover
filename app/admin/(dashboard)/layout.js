import Sidebar from './Sidebar';
import AdminShell from './AdminShell';
import AuthGuard from './AuthGuard';

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
