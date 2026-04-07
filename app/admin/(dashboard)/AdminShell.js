'use client';

import { useState } from 'react';
import Sidebar, { MobileMenuButton } from './Sidebar';

export default function AdminShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-800 admin-panel">
      <MobileMenuButton isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="lg:ml-72 p-4 lg:p-6 pt-14 sm:pt-6 lg:pt-6">
        {children}
      </main>
    </div>
  );
}
