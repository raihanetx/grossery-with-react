import React from 'react';
import { Product } from '../types/product'; // Import the new Product type

interface ProductCardProps {
  product: Product; // Pass the entire product object
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void; // New prop for adding to cart
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart, // Destructure the new prop
}) => {
  const { imageSrc, imageAlt, title, price, originalPrice, discountText } = product;

  return (
    <div
      className="bg-white p-3 shadow-sm relative cursor-pointer transition-all duration-300 flex flex-col w-full h-[250px] border border-gray-200 rounded-[15px] hover:shadow-lg group"
      onClick={() => onSelect(product)} // Make the entire card clickable
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

        <button
          className="w-full text-xs font-bold py-1.5 flex items-center justify-center gap-1 bg-primary text-white rounded-full border-none cursor-pointer transition-transform duration-200 active:scale-95"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click on button click
            onAddToCart(product, 1); // Call the onAddToCart prop
          }}
        >
          <i className="ri-shopping-cart-line text-sm"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};