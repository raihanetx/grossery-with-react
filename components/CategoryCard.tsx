import React from 'react';

interface CategoryCardProps {
  iconClass: string;
  title: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ iconClass, title }) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
      <div className="w-[60px] h-[60px] rounded-xl border border-gray-300 bg-white flex items-center justify-center text-gray-700 group-hover:text-orange-500 transition-colors duration-300 mb-2">
        <i className={`${iconClass} text-2xl`}></i>
      </div>
      <div className="text-center w-[70px]">
        <h3 className="text-[11px] font-medium text-gray-900 group-hover:text-orange-500 transition-colors leading-tight font-bangla">
          {title}
        </h3>
      </div>
    </div>
  );
};