import React from 'react';
import { Product } from '../types/product';

interface RelatedProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const RelatedProductCard: React.FC<RelatedProductCardProps> = ({
  product,
  onSelect,
}) => {
  const { imageSrc, imageAlt, title, price, originalPrice, discountText } = product;

  return (
    <div
      className="bg-white p-3 shadow-sm relative cursor-pointer transition-all duration-300 flex flex-col w-full h-[250px] border border-gray-200 rounded-[15px] hover:shadow-lg group"
      onClick={() => onSelect(product)}
    >
      {discountText && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
          {discountText}
        </span>
      )}

      <div className="flex-grow flex items-center justify-center">
        <div className="cursor-pointer flex items-center justify-center w-[140px] h-[140px]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col mt-auto">
        <h3 className="text-sm font-medium text-gray-900 mb-0.5 truncate cursor-pointer font-bangla">
          {title}
        </h3>

        <div className="flex items-center gap-2 cursor-pointer mb-1.5">
          <span className="text-sm font-semibold text-orange-500">
            {price}
          </span>
          {originalPrice && (
            <span className="text-sm line-through text-gray-600">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
