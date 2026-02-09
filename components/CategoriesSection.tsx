import React from 'react';
import { CategoryCard } from './CategoryCard';

export const CategoriesSection: React.FC = () => {
  const categories = [
    { iconClass: 'ri-plant-line', title: 'Fruits & Veg' },
    { iconClass: 'ri-drop-line', title: 'Milk & Eggs' },
    { iconClass: 'ri-cake-3-line', title: 'Bakery' },
    { iconClass: 'ri-cup-line', title: 'Beverages' },
    { iconClass: 'ri-restaurant-line', title: 'Fish & Meat' },
    { iconClass: 'ri-cookie-line', title: 'Snacks' },
  ];

  return (
    <section id="categories" className="pt-2 pb-6 md:pt-10"> {/* Removed md:pb-12 */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 font-bangla">ক্যাটাগরি</h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base font-bangla">আপনার প্রয়োজনীয় সবকিছু এখানেই পাবেন</p>
        </div>
        <div className="flex justify-center">
          <div className="flex gap-4 overflow-x-auto md:flex-wrap md:justify-center pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
            {categories.map((category, index) => (
              <CategoryCard key={index} iconClass={category.iconClass} title={category.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};