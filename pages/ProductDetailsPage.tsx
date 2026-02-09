import React, { useState, useEffect, useRef } from 'react';
import { Product, ProductReview, ProductOption } from '../types/product';
import { RelatedProductCard } from '../components/RelatedProductCard';
import gsap from 'gsap';

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onBuyNow: (product: Product, quantity: number) => void; // For "Buy Now" button (with navigation to cart)
  onAddToCart: (product: Product, quantity: number) => void; // For "Add to Cart" button (no navigation)
  onProductSelect: (product: Product) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ product, onBack, onBuyNow, onAddToCart, onProductSelect }) => {
  const [qty, setQty] = useState(1);
  const [selectedOption, setSelectedOption] = useState<ProductOption>(product.options[0]);
  const [activeTab, setActiveTab] = useState('descTab');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews);

  const modalCardRef = useRef<HTMLDivElement>(null);

  // Dummy related products
  const relatedProducts: Product[] = [
    {
      id: 'rel-1',
      imageSrc: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400&q=80',
      imageAlt: 'Tomato',
      title: 'Fresh Tomato',
      titleBn: 'তাজা টমেটো',
      description: 'Farm-fresh tomatoes.',
      descriptionBn: 'তাজা টমেটো।',
      fullDescription: 'Juicy and organic tomatoes.',
      fullDescriptionBn: 'রসালো ও অর্গানিক টমেটো।',
      features: ['100% Organic'],
      price: '৳40',
      options: [{ unit: '500g', price: 40 }],
      reviews: [], questions: []
    },
    {
      id: 'rel-2',
      imageSrc: 'https://images.unsplash.com/photo-1596525996076-235735165842?w=400&q=80',
      imageAlt: 'Cucumber',
      title: 'Green Cucumber',
      titleBn: 'সবুজ শসা',
      description: 'Crisp and cool cucumbers.',
      descriptionBn: 'মুচমুচে শসা।',
      fullDescription: 'Cool and refreshing.',
      fullDescriptionBn: 'সতেজ ও চমৎকার।',
      features: ['Farm Fresh'],
      price: '৳35',
      options: [{ unit: '500g', price: 35 }],
      reviews: [], questions: []
    },
    {
      id: 'rel-3',
      imageSrc: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&q=80',
      imageAlt: 'Potato',
      title: 'Organic Potato',
      titleBn: 'জৈব আলু',
      description: 'Premium quality organic potatoes.',
      descriptionBn: 'প্রিমিয়াম কোয়ালিটি আলু।',
      fullDescription: 'Perfect for every dish.',
      fullDescriptionBn: 'যেকোনো খাবারের জন্য উপযুক্ত।',
      features: ['Locally Grown'],
      price: '৳25',
      options: [{ unit: '1 KG', price: 25 }],
      reviews: [], questions: []
    },
    {
      id: 'rel-4',
      imageSrc: 'https://images.unsplash.com/photo-1615485500704-8e99099928b3?w=400&q=80',
      imageAlt: 'Spinach',
      title: 'Fresh Spinach',
      titleBn: 'তাজা পালংশাক',
      description: 'Leafy greens full of iron.',
      descriptionBn: 'আয়রন সমৃদ্ধ শাক।',
      fullDescription: 'Great for health.',
      fullDescriptionBn: 'স্বাস্থ্যের জন্য ভালো।',
      features: ['Pesticide Free'],
      price: '৳15',
      options: [{ unit: '250g', price: 15 }],
      reviews: [], questions: []
    }
  ];

  // GSAP Animations
  useEffect(() => {
    // Reset initial state for animations if component re-mounts
    gsap.set("#imgSection", { opacity: 0, scale: 0.95 });
    gsap.set("#detailSection > *", { opacity: 0, y: 15 });
    gsap.set("#tabsSection", { opacity: 0, y: 20 });
    gsap.set("#relatedSection", { opacity: 0, y: 20 });

    gsap.to("#imgSection", { opacity: 1, scale: 1, duration: 1, ease: "expo.out" });
    gsap.to("#detailSection > *", { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power2.out", delay: 0.1 });
    gsap.to("#tabsSection", { opacity: 1, y: 0, delay: 0.6, duration: 0.8 });
    gsap.to("#relatedSection", { opacity: 1, y: 0, delay: 0.8, duration: 0.8 });
  }, [product.id]); // Re-run animations if product changes

  // Update selected option when product changes
  useEffect(() => {
    setSelectedOption(product.options[0]);
    setQty(1); // Reset quantity
    setReviewsList(product.reviews); // Reset reviews
  }, [product]);

  const updateQty = (change: number) => {
    setQty(prevQty => Math.max(1, prevQty + change));
  };

  const selectOption = (option: ProductOption) => {
    setSelectedOption(option);
    gsap.from("#displayPrice", { scale: 1.1, color: "#FF7F32", duration: 0.2 });
  };

  const switchTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
    setTimeout(() => {
      if (modalCardRef.current) {
        modalCardRef.current.classList.remove('scale-95', 'opacity-0');
        modalCardRef.current.classList.add('scale-100', 'opacity-100');
      }
    }, 10);
  };

  const closeReviewModal = () => {
    if (modalCardRef.current) {
      modalCardRef.current.classList.remove('scale-100', 'opacity-100');
      modalCardRef.current.classList.add('scale-95', 'opacity-0');
    }
    setTimeout(() => {
      setIsReviewModalOpen(false);
      // Reset modal form
      setReviewRating(0);
    }, 300);
  };

  const rate = (r: number) => {
    setReviewRating(r);
  };

  const submitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewName = (e.currentTarget.elements.namedItem('reviewName') as HTMLInputElement).value;
    const reviewText = (e.currentTarget.elements.namedItem('reviewText') as HTMLTextAreaElement).value;

    if (!reviewName || !reviewText || reviewRating === 0) {
      alert("Please fill all fields and provide a rating.");
      return;
    }

    const initials = reviewName.match(/(\b\S)?/g)?.join("").match(/(^\S|\S$)?/g)?.join("").toUpperCase() || 'AN';
    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      name: reviewName,
      initials: initials,
      rating: reviewRating,
      text: reviewText,
      isNew: true,
    };

    setReviewsList(prevReviews => [newReview, ...prevReviews]);
    closeReviewModal();
  };

  return (
    <div className="bg-white text-dark antialiased pb-10">
      {/* Main Product Container */}
      <div className="max-w-5xl mx-auto px-5 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
          {/* Left: Product Image */}
          <div className="flex justify-center md:justify-end">
            <div id="imgSection" className="relative w-full h-72 md:h-full md:w-auto md:aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {product.discountText && (
                <div id="discountTag" className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-md z-10 shadow-md">
                  {product.discountText} OFF
                </div>
              )}
              <img src={product.imageSrc} className="w-full h-full object-cover" alt={product.imageAlt} />
            </div>
          </div>

          {/* Right: Details Content */}
          <div id="detailSection" className="flex flex-col justify-center">
            <h1 className="text-xl md:text-3xl font-bold text-dark leading-tight mb-3">
              {product.title}
            </h1>

            {/* Price & Meta */}
            <div className="flex items-center flex-wrap gap-4 mb-5">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-primary">৳<span id="displayPrice">{selectedOption.price}</span></span>
                {selectedOption.originalPrice && (
                  <span id="oldPrice" className="text-sm text-gray-300 line-through font-medium">৳{selectedOption.originalPrice}</span>
                )}
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <span id="displayUnit" className="text-xs font-bold text-gray-500 uppercase tracking-wide">{selectedOption.unit}</span>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQty(-1)} className="text-gray-400 hover:text-dark text-lg"><i className="ri-subtract-line"></i></button>
                <span id="qtyVal" className="text-base font-bold text-dark w-4 text-center">{qty}</span>
                <button onClick={() => updateQty(1)} className="text-gray-400 hover:text-dark text-lg"><i className="ri-add-line"></i></button>
              </div>
            </div>

            <p className="text-sm text-grey leading-relaxed mb-6 line-clamp-2">
              {product.description}
            </p>

            {/* Options Section */}
            <div className="mb-8">
              <span className="text-[10px] font-bold text-ink uppercase tracking-widest block mb-2.5">
                Choose an option
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectOption(option)}
                    className={`opt-btn btn-tap ring-1 ${selectedOption.unit === option.unit ? 'ring-primary text-primary font-semibold' : 'ring-gray-100 text-gray-500 font-medium hover:ring-gray-300'} px-5 py-2 rounded-[5px] text-xs transition-all`}
                  >
                    {option.unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="btn-tap flex-1 bg-primary text-white h-12 rounded-xl text-sm font-bold shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all uppercase tracking-wide"
                onClick={() => onBuyNow(product, qty)} // Call onBuyNow (goes to cart)
              >
                Buy Now
              </button>
              <button
                className="btn-tap flex-1 border border-primary text-primary h-12 rounded-xl text-sm font-bold hover:bg-orange-50 transition-all uppercase tracking-wide"
                onClick={() => onAddToCart(product, qty)} // Call onAddToCart (stays on page)
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-12" id="tabsSection">
          <div className="flex justify-center items-center gap-5 border-y border-gray-200 py-2.5 mb-8">
            <button onClick={() => switchTab('descTab')} className={`tab-head text-sm ${activeTab === 'descTab' ? 'font-bold text-dark' : 'font-medium text-gray-400 hover:text-dark'} transition-colors`}>Description</button>
            <div className="w-px h-3 bg-gray-300"></div>
            <button onClick={() => switchTab('revTab')} className={`tab-head text-sm ${activeTab === 'revTab' ? 'font-bold text-dark' : 'font-medium text-gray-400 hover:text-dark'} transition-colors`}>Reviews</button>
            <div className="w-px h-3 bg-gray-300"></div>
            <button onClick={() => switchTab('qaTab')} className={`tab-head text-sm ${activeTab === 'qaTab' ? 'font-bold text-dark' : 'font-medium text-gray-400 hover:text-dark'} transition-colors`}>Questions</button>
          </div>

          <div className="max-w-2xl mx-auto">
            <div id="descTab" className={`tab-content ${activeTab === 'descTab' ? 'fade-in' : 'hidden'} text-[0.9rem] text-grey leading-7 text-center md:text-left`}>
              <p className="mb-4">{product.fullDescription}</p>
              <ul className="inline-block text-left text-xs space-y-2 mt-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2"><i className="ri-check-line text-green-500"></i> {feature}</li>
                ))}
              </ul>
            </div>

            <div id="revTab" className={`tab-content ${activeTab === 'revTab' ? 'fade-in' : 'hidden'}`}>
              <div className="flex justify-center md:justify-start mb-6" onClick={openReviewModal}>
                <div className="flex items-center gap-2 cursor-pointer text-primary hover:text-dark transition-colors">
                  <i className="ri-edit-circle-line text-lg"></i>
                  <span className="text-sm font-semibold underline decoration-dotted underline-offset-4">Write a review</span>
                </div>
              </div>

              <div id="reviewsList" className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {reviewsList.length > 0 ? (
                  reviewsList.map((review) => (
                    <div key={review.id} className={`pb-4 border-b border-gray-50 last:border-0 ${review.isNew ? 'fade-in' : ''}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{review.initials}</div>
                        <span className="text-sm font-bold text-dark">{review.name}</span>
                        <div className="w-px h-3 bg-gray-300"></div>
                        <div className="flex text-yellow-400 text-[10px]">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={i < review.rating ? 'ri-star-fill' : 'ri-star-line'}></i>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-grey leading-relaxed">"{review.text}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-grey text-center md:text-left col-span-full">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>

            <div id="qaTab" className={`tab-content ${activeTab === 'qaTab' ? 'fade-in' : 'hidden'}`}>
              <div className="space-y-6 text-center md:text-left">
                {product.questions.length > 0 ? (
                  product.questions.map((q) => (
                    <div key={q.id} className="pb-4 border-b border-gray-50 last:border-0">
                      <p className="text-sm font-bold text-dark mb-1 flex items-center justify-center md:justify-start gap-2">
                        <i className="ri-question-line text-primary"></i> {q.question}
                      </p>
                      <p className="text-sm text-grey md:pl-6">{q.answer}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-grey text-center md:text-left">No questions yet. Ask away!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-12" id="relatedSection">
          <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-8">
            You May Also Like
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {relatedProducts.map(relProd => (
              <RelatedProductCard key={relProd.id} product={relProd} onSelect={onProductSelect} />
            ))}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div id="reviewModal" className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={closeReviewModal}></div>
          <div ref={modalCardRef} className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 transform scale-95 opacity-0 transition-all duration-300">
            <h3 className="text-center text-lg font-bold text-dark mb-4">Write a Review</h3>
            <form onSubmit={submitReview}>
              <div className="flex justify-center gap-2 mb-6" id="starContainer">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`text-2xl cursor-pointer transition-colors ${i < reviewRating ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300 hover:text-yellow-400'}`}
                    onClick={() => rate(i + 1)}
                  ></i>
                ))}
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="reviewName" className="block text-xs font-bold text-gray-400 uppercase mb-1">Your Name</label>
                  <input type="text" id="reviewName" name="reviewName" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label htmlFor="reviewText" className="block text-xs font-bold text-gray-400 uppercase mb-1">Review</label>
                  <textarea id="reviewText" name="reviewText" rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={closeReviewModal} className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-primary shadow-lg shadow-orange-100 hover:opacity-90 transition-colors">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};