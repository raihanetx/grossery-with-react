import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/product';

interface ProductListProps {
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void; // New prop for adding to cart
}

export const ProductList: React.FC<ProductListProps> = ({ onProductSelect, onAddToCart }) => {
  const products: Product[] = [
    {
      id: 'prod-001',
      imageSrc: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Fresh Organic Carrots',
      title: 'Organic Premium Carrots',
      titleBn: 'অর্গানিক প্রিমিয়াম গাজর',
      description: 'Harvested daily from certified organic farms. Sweet, crunchy, and packed with Vitamin A.',
      descriptionBn: 'সার্টিফাইড অর্গানিক খামার থেকে প্রতিদিন সংগ্রহ করা হয়। অত্যন্ত মিষ্টি এবং মুচমুচে।',
      fullDescription: 'Grown in mineral-rich soil without synthetic pesticides. Hand-picked at peak ripeness to ensure natural sweetness. Washed with purified water.',
      fullDescriptionBn: 'কৃত্রিম কীটনাশক ছাড়াই খনিজ সমৃদ্ধ মাটিতে জন্মায়। প্রাকৃতিক মিষ্টতা নিশ্চিত করতে পাকার সঠিক সময়ে এগুলি সংগ্রহ করা হয়।',
      features: ['100% Organic Certified', 'Rich in Vitamin A & K', 'Local Sustainable Farms'],
      price: '৳80',
      originalPrice: '৳95',
      discountText: '-15%',
      options: [
        { unit: '500g', price: 80, originalPrice: 95 },
        { unit: '1 KG', price: 150, originalPrice: 180 },
        { unit: '2 KG', price: 280, originalPrice: 330 },
      ],
      reviews: [
        { id: 'rev1', name: 'Joya P.', initials: 'JP', rating: 5, text: "Super fresh! My kids loved them." }
      ],
      questions: [
        { id: 'q1', question: 'How long do they last?', answer: 'Up to 2 weeks in the refrigerator.' }
      ]
    },
    {
      id: 'prod-002',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Organic Banana',
      title: 'Organic Banana',
      titleBn: 'জৈব কলা',
      description: 'Sweet and nutritious organic bananas.',
      descriptionBn: 'মিষ্টি এবং পুষ্টিকর জৈব কলা।',
      fullDescription: 'Naturally ripened organic bananas, excellent source of potassium and vitamins. Perfect for a healthy snack.',
      fullDescriptionBn: 'প্রাকৃতিকভাবে পাকা জৈব কলা, পটাসিয়াম এবং ভিটামিনের চমৎকার উৎস। একটি স্বাস্থ্যকর স্ন্যাকসের জন্য উপযুক্ত।',
      features: ['Certified Organic', 'Rich in Potassium', 'Versatile Snack'],
      price: '৳40',
      originalPrice: '৳50',
      discountText: '-20%',
      options: [{ unit: '500g', price: 40, originalPrice: 50 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-003',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: "Fresh Cow's Milk",
      title: "Fresh Cow's Milk",
      titleBn: 'তাজা গরুর দুধ',
      description: 'Pure, pasteurized cow\'s milk.',
      descriptionBn: 'বিশুদ্ধ, পাস্তুরিত গরুর দুধ।',
      fullDescription: 'Our fresh cow\'s milk is sourced from local dairies, pasteurized, and homogenized for safety and taste.',
      fullDescriptionBn: 'আমাদের তাজা গরুর দুধ স্থানীয় দুগ্ধ খামার থেকে সংগ্রহ করা হয়, নিরাপত্তা ও স্বাদের জন্য পাস্তুরিত এবং সমজাতীয় করা হয়।',
      features: ['Farm Fresh', 'Pasteurized', 'Rich in Calcium'],
      price: '৳90',
      options: [{ unit: '1 L', price: 90 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-004',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Sourdough Bread',
      title: 'Sourdough Bread',
      titleBn: 'সাওয়ারডো রুটি',
      description: 'Artisan sourdough bread, baked fresh daily.',
      descriptionBn: 'প্রতিদিন তাজা বেক করা কারিগর সাওয়ারডো রুটি।',
      fullDescription: 'Hand-crafted sourdough bread with a perfect crust and chewy interior. Made with natural starters and slow fermentation.',
      fullDescriptionBn: 'হস্তনির্মিত সাওয়ারডো রুটি যা নিখুঁত ক্রাস্ট এবং চিবিয়ে খাওয়ার যোগ্য ভেতরের অংশ সহ। প্রাকৃতিক স্টার্টার এবং ধীর গাঁজন প্রক্রিয়ায় তৈরি।',
      features: ['Artisan Baked', 'Natural Ingredients', 'No Preservatives'],
      price: '৳150',
      originalPrice: '৳180',
      discountText: '-17%',
      options: [{ unit: '500g Loaf', price: 150, originalPrice: 180 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-005',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Orange Juice',
      title: 'Orange Juice',
      titleBn: 'কমলার রস',
      description: '100% pure squeezed orange juice.',
      descriptionBn: '১০০% খাঁটি কমলার রস।',
      fullDescription: 'Freshly squeezed orange juice, no added sugars or preservatives. A delicious way to start your day.',
      fullDescriptionBn: 'তাজা কমলার রস, চিনি বা প্রিজারভেটিভ যোগ করা হয়নি। আপনার দিন শুরু করার একটি সুস্বাদু উপায়।',
      features: ['100% Pure', 'No Added Sugar', 'Rich in Vitamin C'],
      price: '৳120',
      options: [{ unit: '1 L', price: 120 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-006',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Chicken Breast',
      title: 'Chicken Breast',
      titleBn: 'মুরগির বুকের মাংস',
      description: 'Boneless, skinless chicken breast.',
      descriptionBn: 'হাড় ও চামড়াবিহীন মুরগির বুকের মাংস।',
      fullDescription: 'High-quality, lean chicken breast, perfect for grilling, baking, or stir-frying. Responsibly sourced.',
      fullDescriptionBn: 'উচ্চ মানের, চর্বিহীন মুরগির বুকের মাংস, গ্রিলিং, বেকিং বা স্টিয়ার-ফ্রাই করার জন্য উপযুক্ত। দায়িত্বশীলভাবে সংগ্রহ করা হয়।',
      features: ['Lean Protein', 'Hormone-Free', 'Versatile'],
      price: '৳250',
      originalPrice: '৳280',
      discountText: '-10%',
      options: [{ unit: '500g', price: 250, originalPrice: 280 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-007',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Potato Chips',
      title: 'Potato Chips',
      titleBn: 'আলু চিপস',
      description: 'Crispy potato chips, classic salted.',
      descriptionBn: 'মুচমুচে আলু চিপস, ক্লাসিক নোনতা।',
      fullDescription: 'Enjoy our classic salted potato chips, thinly sliced and perfectly crunchy. A great snack for any time.',
      fullDescriptionBn: 'আমাদের ক্লাসিক নোনতা আলু চিপস উপভোগ করুন, পাতলা করে কাটা এবং পুরোপুরি মুচমুচে। যেকোনো সময়ের জন্য একটি দুর্দান্ত স্ন্যাকস।',
      features: ['Crispy Texture', 'Classic Salted', 'Perfect Snack'],
      price: '৳60',
      options: [{ unit: '150g Bag', price: 60 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-008',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Red Apples',
      title: 'Red Apples',
      titleBn: 'লাল আপেল',
      description: 'Sweet and juicy red apples.',
      descriptionBn: 'মিষ্টি এবং রসালো লাল আপেল।',
      fullDescription: 'Farm-fresh red apples, known for their crisp texture and sweet flavor. Rich in fiber and antioxidants.',
      fullDescriptionBn: 'খামার-তাজা লাল আপেল, তাদের খসখসে গঠন এবং মিষ্টি স্বাদের জন্য পরিচিত। ফাইবার এবং অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ।',
      features: ['Sweet & Juicy', 'Rich in Fiber', 'Healthy Snack'],
      price: '৳80',
      originalPrice: '৳85',
      options: [{ unit: '500g', price: 80, originalPrice: 85 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-009',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Organic Eggs',
      title: 'Organic Eggs',
      titleBn: 'জৈব ডিম',
      description: 'Farm fresh organic eggs.',
      descriptionBn: 'খামার তাজা জৈব ডিম।',
      fullDescription: 'Our organic eggs come from free-range hens, fed a natural, organic diet. High in protein and essential nutrients.',
      fullDescriptionBn: 'আমাদের জৈব ডিম মুক্ত-সীমার মুরগি থেকে আসে, যা প্রাকৃতিক, জৈব খাদ্য খাওয়ানো হয়। প্রোটিন এবং প্রয়োজনীয় পুষ্টিতে উচ্চ।',
      features: ['Free-Range', 'Organic Diet', 'High Protein'],
      price: '৳110',
      options: [{ unit: '6 Pcs', price: 110 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-010',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Whole Wheat Bread',
      title: 'Whole Wheat Bread',
      titleBn: 'পুরো গমের রুটি',
      description: 'Healthy and delicious whole wheat bread.',
      descriptionBn: 'স্বাস্থ্যকর এবং সুস্বাদু পুরো গমের রুটি।',
      fullDescription: 'Baked with 100% whole wheat flour, our bread is a nutritious choice for sandwiches and toast. Good source of fiber.',
      fullDescriptionBn: '১০০% পুরো গমের আটা দিয়ে বেক করা, আমাদের রুটি স্যান্ডউইচ এবং টোস্টের জন্য একটি পুষ্টিকর পছন্দ। ফাইবারের ভালো উৎস।',
      features: ['Whole Wheat', 'High Fiber', 'Daily Baked'],
      price: '৳100',
      originalPrice: '৳105',
      options: [{ unit: '500g Loaf', price: 100, originalPrice: 105 }],
      reviews: [],
      questions: []
    },
    {
      id: 'prod-011',
      imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      imageAlt: 'Mineral Water',
      title: 'Mineral Water',
      titleBn: 'মিনারেল ওয়াটার',
      description: 'Pure and refreshing mineral water.',
      descriptionBn: 'বিশুদ্ধ এবং সতেজ মিনারেল ওয়াটার।',
      fullDescription: 'Naturally filtered mineral water, bottled at source. Essential for hydration throughout the day.',
      fullDescriptionBn: 'প্রাকৃতিকভাবে ফিল্টার করা মিনারেল ওয়াটার, উৎস থেকে বোতলজাত। সারাদিন হাইড্রেশনের জন্য অপরিহার্য।',
      features: ['Pure & Natural', 'Refreshing', 'Hydrating'],
      price: '৳30',
      originalPrice: '৳32',
      discountText: '-5%',
      options: [{ unit: '500ml', price: 30, originalPrice: 32 }],
      reviews: [],
      questions: []
    },
  ];

  return (
    <section id="products" className="pb-12 pt-2">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={onProductSelect} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};