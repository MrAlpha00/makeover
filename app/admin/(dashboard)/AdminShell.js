'use client';

import { useState } from 'react';
import Sidebar, { MobileMenuButton } from './Sidebar';

export default function AdminShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-800 flex flex-row admin-panel" style={{ margin: 0, padding: 0 }}>
      <MobileMenuButton isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-72 flex flex-col" style={{ margin: 0, padding: 0 }}>
        <main className="flex-1 p-4 sm:p-5 lg:p-6 pt-14 sm:pt-5 lg:pt-6" style={{ margin: 0, paddingTop: 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
