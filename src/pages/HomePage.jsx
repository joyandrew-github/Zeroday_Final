import React from 'react';
import Header from '../components/Home/Header';
import HeroSection from '../components/Home/HeroSection';
import PostsSection from '../components/Home/PostsSection';
import Footer from '../components/Home/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <HeroSection />
      <PostsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
