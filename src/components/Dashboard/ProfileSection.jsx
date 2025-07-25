// src/components/ProfileSection.jsx
import React from 'react';

const ProfileSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">JS</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">John Smith</h3>
            <p className="text-gray-600">Computer Science</p>
            <p className="text-gray-500">Student ID: CS2024001</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
            <p className="text-gray-600">Email: john.smith@university.edu</p>
            <p className="text-gray-600">Phone: +91 9876543210</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Academic Information</h4>
            <p className="text-gray-600">Year: 2nd Year</p>
            <p className="text-gray-600">Semester: 4th Semester</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;