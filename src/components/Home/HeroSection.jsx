import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to <span className="text-yellow-300">CampusLink</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Your Centralized Student Utility Hub
        </p>
        <p className="text-lg mb-8 max-w-3xl mx-auto text-blue-50">
          Stay connected with all campus activities, announcements, and essential services. 
          Everything you need for your academic journey, all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Explore Dashboard
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            View All Announcements
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 opacity-20 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-300 opacity-15 rounded-full"></div>
    </section>
  );
};

export default HeroSection;
