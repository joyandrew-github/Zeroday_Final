// src/components/DashboardSection.jsx
import React from 'react';
import { ChevronRight, AlertTriangle, Package, Clock } from 'lucide-react';

const DashboardSection = ({ quickStats, setActiveSection }) => {
  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl text-white p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">CampusLink</span>
          </h1>
          <p className="text-xl mb-4 text-blue-100">
            Your Centralized Student Utility Hub
          </p>
          <p className="text-blue-50 mb-6 max-w-2xl">
            Stay connected with all campus activities, manage your schedule, track complaints, and find lost items. 
            Everything you need for your academic journey, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setActiveSection('lost-found')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <span>Quick Actions</span>
              <ChevronRight size={20} />
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Announcements
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-4 right-12 w-32 h-32 bg-yellow-300 opacity-20 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-indigo-300 opacity-15 rounded-full"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
              <AlertTriangle size={20} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Water issue complaint #C001 updated to In Progress</p>
              <p className="text-gray-500 text-sm mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <Package size={20} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Your lost wallet was found in Library</p>
              <p className="text-gray-500 text-sm mt-1">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Clock size={20} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Chemistry Lab moved to Room 204</p>
              <p className="text-gray-500 text-sm mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;