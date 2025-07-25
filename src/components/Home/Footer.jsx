import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0.5 left-0.5 right-0.5 h-2 bg-white rounded-sm flex items-center justify-center">
              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
            </div>
            <div className="absolute bottom-0.5 left-0.5 right-0.5 h-4 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-2 bg-orange-500 rounded-sm"></div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">CampusLink</h3>
            <p className="text-sm text-gray-300">Sri Eshwar College of Engineering</p>
          </div>
        </div>
        <p className="text-gray-300 mb-2">Connecting students, empowering education</p>
        <p className="text-sm text-gray-400">© 2025 CampusLink. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
