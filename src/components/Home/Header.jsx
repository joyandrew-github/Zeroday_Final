import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/public/logosece.png" alt="CampusLink Logo" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">CampusLink</h1>
              <p className="text-xs text-gray-600">Sri Eshwar College</p>
            </div>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</a>
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Login</a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 flex flex-col space-y-4">
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</a>
              <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">Login</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;