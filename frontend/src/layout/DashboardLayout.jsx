import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Page Content */}
        <div className="p-6">
          <Outlet /> {/* This is where nested route content gets rendered */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
