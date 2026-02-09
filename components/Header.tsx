import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
  onViewCart: () => void; // New prop for viewing cart
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onViewCart }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.08)] flex items-center justify-between px-3 md:px-[2rem] h-[60px] md:h-[90px] sticky top-0 z-50">
      <div className="flex items-center shrink-0 w-[80px] md:w-auto">
        <button onClick={onLogoClick} className="font-black tracking-tighter text-[24px] md:text-[36px] text-black leading-none focus:outline-none hover:text-orange-500 transition-colors">
          Lumina<span className="text-orange-500">.</span>
        </button>
      </div>

      <form className="hidden md:flex flex-1 justify-center mx-[2rem] max-w-2xl">
        <div className="flex items-center border border-gray-300 rounded-full px-6 w-full bg-transparent h-12 relative transition-all duration-200 focus-within:border-orange-500">
          <input type="text" name="search" placeholder="Search Product" className="w-full outline-none bg-transparent text-lg text-gray-700 placeholder-gray-400 pr-10" />
          <div className="absolute right-[60px] h-7 w-[1px] bg-gray-300"></div>
          <button type="button" className="absolute right-5 cursor-pointer hover:text-black transition-colors">
            <i className="ri-search-line text-gray-400 text-2xl"></i>
          </button>
        </div>
      </form>

      <form className="md:hidden flex items-center border border-gray-300 rounded-full px-3 bg-white h-[36px] flex-1 mr-4 ml-2 relative">
        <input type="text" name="search" placeholder="Search..." className="w-full outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400 pr-6 pb-[1px]" />
        <div className="absolute right-[30px] h-4 w-[1px] bg-gray-300"></div>
        <button type="button" className="absolute right-2">
          <i className="ri-search-line text-gray-400 text-base"></i>
        </button>
      </form>

      <div className="flex items-center justify-end h-10 shrink-0 md:w-auto">
        <div className="hidden md:flex items-center h-full">
          <a href="#products" className="px-4 cursor-pointer hover:bg-gray-50 rounded-md transition-colors block">
            <i className="ri-store-line text-[28px] text-gray-500 hover:text-black leading-none"></i>
          </a>
          <div className="w-[1px] h-[28px] bg-gray-300"></div>
        </div>
        <div className="hidden md:flex items-center h-full">
          <div className="px-4 cursor-pointer hover:bg-gray-50 rounded-md transition-colors relative" onClick={onViewCart}>
            <i className="ri-shopping-bag-line text-[28px] text-gray-500 hover:text-black leading-none"></i>
            {/* <span className="absolute top-0 right-2 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white">3</span> */}
          </div>
          <div className="w-[1px] h-[28px] bg-gray-300"></div>
        </div>

        <div className="md:hidden flex items-center h-full">
          <div className="pr-2 pl-0 cursor-pointer pb-[2px] relative" onClick={onViewCart}>
            <i className="ri-shopping-bag-line text-[24px] text-gray-500 leading-none"></i>
            {/* <span className="absolute -top-1 right-0 h-3 w-3 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold border border-white">3</span> */}
          </div>
          <div className="pl-3 pr-1 cursor-pointer">
            <i className="ri-more-2-line text-[24px] text-gray-500 leading-none"></i>
          </div>
        </div>

        <div className="hidden md:flex items-center h-full">
          <div className="px-4 cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
            <i className="ri-todo-line text-[28px] text-gray-500 hover:text-black leading-none"></i>
          </div>
          <div className="w-[1px] h-[28px] bg-gray-300"></div>
        </div>

        <div className="hidden md:flex items-center h-full">
          <div className="px-4 cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
            <i className="ri-more-2-line text-[28px] text-gray-700 hover:text-orange-500 leading-none"></i>
          </div>
        </div>
      </div>
    </header>
  );
};