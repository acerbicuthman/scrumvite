import React from 'react';
import { Link } from 'react-router';

export default function TutorDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Tutor Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li> <Link to ="/educator/tutor-profile" className="text-gray-700 hover:text-blue-600">Profile</Link></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Students</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Schedule</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Messages</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-4">Welcome, Tutor!</h1>
        <p className="text-gray-600">Here’s what’s happening with your classes today:</p>

        {/* Example dashboard widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-medium">Upcoming Sessions</h3>
            <p className="text-gray-500">3 sessions scheduled today</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-medium">New Messages</h3>
            <p className="text-gray-500">2 unread messages</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-medium">Student Progress</h3>
            <p className="text-gray-500">80% average completion</p>
          </div>
        </div>
      </main>
    </div>
  );
}
