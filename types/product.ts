export interface ProductOption {
  unit: string;
  price: number;
  originalPrice?: number;
}

export interface ProductReview {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  isNew?: boolean;
}

export interface ProductQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  titleBn: string; // Bengali title for language toggle
  description: string; // Short description
  descriptionBn: string; // Short description Bengali
  fullDescription: string;
  fullDescriptionBn: string;
  features: string[]; // e.g., ["100% Organic Certified", ...]
  price: string; // Display string for current price
  originalPrice?: string; // Display string for original price
  discountText?: string;
  options: ProductOption[]; // Detailed options for selection on details page
  reviews: ProductReview[];
  questions: ProductQuestion[];
}