import AuthGuard from './AuthGuard';
import AdminShell from './AdminShell';

export const metadata = {
  title: 'Admin Dashboard | Party Hub',
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
