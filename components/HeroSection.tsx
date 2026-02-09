import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full pb-4"> {/* Removed md:pb-0 */}
      <div className="mx-6 mt-6 md:mx-6 md:mt-6 relative h-[172.5px] md:h-[260px] rounded-2xl overflow-hidden shadow-xl group">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </div>
    </section>
  );
};