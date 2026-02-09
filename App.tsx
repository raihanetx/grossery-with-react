import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { ProductList } from './components/ProductList';
import { MobileNav } from './components/MobileNav';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationCard } from './pages/OrderConfirmationCard';
import { CartPage } from './pages/CartPage';
import { Footer } from './components/Footer';
import { OrderTrackingPage } from './pages/OrderTrackingPage'; // Import Tracking Page
import { Product } from './types/product';
import { OrderConfirmationData } from './types/order';
import { CartItem } from './types/cart';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmationData | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'productDetails' | 'cart' | 'checkout' | 'orderConfirmation' | 'trackOrder'>('home');
  
  // Tracking State
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetails');
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
    setCheckoutItems([]);
    setOrderConfirmation(null);
    setCurrentPage('home');
  };

  const handleAddToCartOnly = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleBuyNowAndGoToCart = (product: Product, quantity: number) => {
    handleAddToCartOnly(product, quantity);
    setCurrentPage('cart');
  };

  const handleViewCart = () => {
    setCurrentPage('cart');
  };

  const handleGoToCheckoutFromCart = (items: CartItem[]) => {
    setCheckoutItems(items);
    setCurrentPage('checkout');
  };

  const handleBackToCart = () => {
    setCheckoutItems([]);
    setCurrentPage('cart');
  };

  const handleOrderConfirmed = (orderData: OrderConfirmationData) => {
    setOrderConfirmation(orderData);
    setCartItems([]);
    setCheckoutItems([]);
    setCurrentPage('orderConfirmation');
  };

  const handleCloseOrderConfirmation = () => {
    setOrderConfirmation(null);
    setCurrentPage('home');
  };
  
  // Tracking Logic
  const handleNavigateToTrackOrder = () => {
    setCurrentPage('trackOrder');
    setOrderConfirmation(null);
    setTrackingError(null);
  };

  const handleTrackOrder = (orderId: string, phone: string) => {
    setIsTrackingLoading(true);
    setTrackingError(null);

    // MOCK BACKEND CALL
    // In the real backend integration, this will be a fetch('/api/orders/track')
    setTimeout(() => {
      setIsTrackingLoading(false);
      
      // Mock validation for demo
      if (orderId.length < 3) {
        setTrackingError("Order ID not found. Please check and try again.");
        return;
      }

      // Mock success result
      const mockFoundOrder: OrderConfirmationData = {
        orderId: orderId,
        status: 'Processing', // Randomly could be 'Packed' or 'Done'
        customerName: 'Guest User',
        shippingAddress: 'Dhaka, Bangladesh',
        estimatedDelivery: '2 Days',
        items: [
           {
            id: 'prod-001',
            imageSrc: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            imageAlt: 'Fresh Organic Carrots',
            title: 'Organic Premium Carrots',
            titleBn: 'অর্গানিক প্রিমিয়াম গাজর',
            description: '', descriptionBn: '', fullDescription: '', fullDescriptionBn: '', features: [], price: '৳80', options: [{unit: '500g', price: 80}], reviews: [], questions: [],
            quantity: 2
           }
        ],
        subtotal: 160,
        deliveryCharge: 60,
        discountAmount: 0,
        totalPayable: 220,
        paymentMethod: 'Cash on Delivery'
      };

      setOrderConfirmation(mockFoundOrder); // Reuse the confirmation card to show status
      setCurrentPage('orderConfirmation'); // Reuse the confirmation page view
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col pb-[60px] md:pb-0 bg-[#f4f5f7]">
      <Header onLogoClick={handleBackToHome} onViewCart={handleViewCart} />
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <HeroSection />
            <CategoriesSection />
            <ProductList
              onProductSelect={handleProductSelect}
              onAddToCart={handleAddToCartOnly}
            />
          </>
        )}
        {currentPage === 'productDetails' && selectedProduct && (
          <ProductDetailsPage
            product={selectedProduct}
            onBack={handleBackToHome}
            onBuyNow={handleBuyNowAndGoToCart}
            onAddToCart={handleAddToCartOnly}
            onProductSelect={handleProductSelect}
          />
        )}
        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            setCartItems={setCartItems}
            onContinueShopping={handleBackToHome}
            onGoToCheckout={handleGoToCheckoutFromCart}
          />
        )}
        {currentPage === 'checkout' && checkoutItems.length > 0 ? (
          <CheckoutPage
            cartItems={checkoutItems}
            onBackToCart={handleBackToCart}
            onOrderConfirmed={handleOrderConfirmed}
          />
        ) : null}
        
        {/* Reuse OrderConfirmationCard for both new orders AND tracking results */}
        {currentPage === 'orderConfirmation' && orderConfirmation ? (
          <OrderConfirmationCard
            order={orderConfirmation}
            onClose={handleCloseOrderConfirmation}
          />
        ) : null}

        {currentPage === 'trackOrder' && (
          <OrderTrackingPage 
             onTrack={handleTrackOrder}
             isLoading={isTrackingLoading}
             error={trackingError}
             foundOrder={null} // We switch pages on success, so this can be null here
             onCloseResult={() => {}} 
          />
        )}

      </main>
      <MobileNav onHomeClick={handleBackToHome} onViewCart={handleViewCart} />
      <Footer onTrackOrderClick={handleNavigateToTrackOrder} />
    </div>
  );
};

export default App;