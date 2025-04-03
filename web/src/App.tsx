import React from 'react';
// Import components
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
// import Footer from '@/components/layout/Footer'; // Import later

function App() {
  // Add logic here for theme application, routing etc. later

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        {/* Add other page sections here */}
        {/* e.g., <FeaturesSection /> */} 
        {/* e.g., <PricingSection /> */} 
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App; 