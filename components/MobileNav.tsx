import React from 'react';

interface MobileNavProps {
  onHomeClick: () => void;
  onViewCart: () => void; // New prop for viewing cart
}

export const MobileNav: React.FC<MobileNavProps> = ({ onHomeClick, onViewCart }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.08)] h-[60px] flex justify-around items-center md:hidden z-40">
      <button onClick={onHomeClick} className="flex flex-col items-center justify-center flex-1 h-full relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[25px] after:w-[1px] after:bg-gray-300 cursor-pointer text-gray-500 hover:text-orange-500 transition-colors">
        <i className="ri-home-4-line text-[22px] mb-[1px] leading-none"></i>
        <span className="text-[10px] font-medium leading-none mt-1">Home</span>
      </button>
      <a href="#products" className="flex flex-col items-center justify-center flex-1 h-full relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[25px] after:w-[1px] after:bg-gray-300 cursor-pointer text-gray-500 hover:text-orange-500 transition-colors">
        <i className="ri-store-line text-[22px] mb-[1px] leading-none"></i>
        <span className="text-[10px] font-medium leading-none mt-1">Shop</span>
      </a>
      <button onClick={onViewCart} className="flex flex-col items-center justify-center flex-1 h-full cursor-pointer text-gray-500 hover:text-orange-500 transition-colors">
        <i className="ri-shopping-bag-line text-[22px] mb-[1px] leading-none"></i>
        <span className="text-[10px] font-medium leading-none mt-1">Cart</span>
      </button>
    </div>
  );
};