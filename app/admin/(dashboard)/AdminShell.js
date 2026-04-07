'use client';

import { useState } from 'react';
import Sidebar, { MobileMenuButton } from './Sidebar';

export default function AdminShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-800 flex flex-row admin-panel">
      <MobileMenuButton isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-72 flex flex-col justify-start">
        <main className="p-4 sm:p-5 lg:px-6 pt-14 sm:pt-5 lg:pt-0 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
