import React, { useState } from 'react';
import { Link } from 'react-router';
import AsideTutor from './AsideTutor';
import MainContentTutor from './MainContentTutor';

export default function TutorDashboard() {
  const [collapsed, setCollapse] = useState(false)
  return (
    <div className="flex min-h-screen bg-[#121221] mt-20 text-white">
      {/* Sidebar */}
      <aside className="  shadow-md block">
        <AsideTutor collapsed={collapsed} setCollapse={setCollapse} />
      </aside>

      {/* Main content */}
      <main className={`p-6 transition-all duration-300 ${collapsed ? `md:w-[calc(100%-90px)]`: `md:w-[calc(100%-100px)]`}`}>
        <MainContentTutor/>

        {/* Example dashboard widgets */}
        
      </main>
    </div>
  );
}
