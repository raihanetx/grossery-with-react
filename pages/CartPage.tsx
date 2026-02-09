import React, { useState, useEffect } from 'react';
import { CartItem } from '../types/cart';

interface CartPageProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onContinueShopping: () => void;
  onGoToCheckout: (items: CartItem[]) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ cartItems, setCartItems, onContinueShopping, onGoToCheckout }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Example dummy data for initial load if cart is empty for testing purposes
  useEffect(() => {
    if (cartItems.length === 0) {
      // You can remove this block if you don't want initial dummy data when cart is empty
      // const dummyProduct1 = {
      //   id: 'prod-001',
      //   imageSrc: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      //   imageAlt: 'Fresh Organic Carrots',
      //   title: 'Organic Premium Carrots',
      //   titleBn: 'অর্গানিক প্রিমিয়াম গাজর',
      //   description: 'Harvested daily from certified organic farms. Sweet, crunchy, and packed with Vitamin A.',
      //   descriptionBn: 'সার্টিফাইড অর্গানিক খামার থেকে প্রতিদিন সংগ্রহ করা হয়। অত্যন্ত মিষ্টি এবং মুচমুচে।',
      //   fullDescription: 'Grown in mineral-rich soil without synthetic pesticides. Hand-picked at peak ripeness to ensure natural sweetness. Washed with purified water.',
      //   fullDescriptionBn: 'কৃত্রিম কীটনাশক ছাড়াই খনিজ সমৃদ্ধ মাটিতে জন্মায়। প্রাকৃতিক মিষ্টতা নিশ্চিত করতে পাকার সঠিক সময়ে এগুলি সংগ্রহ করা হয়।',
      //   features: ['100% Organic Certified', 'Rich in Vitamin A & K', 'Local Sustainable Farms'],
      //   price: '৳80.00',
      //   originalPrice: '৳95.00',
      //   discountText: '-15%',
      //   options: [
      //     { unit: '500g', price: 80, originalPrice: 95 },
      //     { unit: '1 KG', price: 150, originalPrice: 180 },
      //     { unit: '2 KG', price: 280, originalPrice: 330 },
      //   ],
      //   reviews: [],
      //   questions: [],
      //   quantity: 2,
      // };
      // const dummyProduct2 = {
      //   id: 'prod-002',
      //   imageSrc: 'https://i.postimg.cc/d1xy20TV/1000012304-removebg-preview.png',
      //   imageAlt: 'Organic Banana',
      //   title: 'Organic Banana',
      //   titleBn: 'জৈব কলা',
      //   description: 'Sweet and nutritious organic bananas.',
      //   descriptionBn: 'মিষ্টি এবং পুষ্টিকর জৈব কলা।',
      //   fullDescription: 'Naturally ripened organic bananas, excellent source of potassium and vitamins. Perfect for a healthy snack.',
      //   fullDescriptionBn: 'প্রাকৃতিকভাবে পাকা জৈব কলা, পটাসিয়াম এবং ভিটামিনের চমৎকার উৎস। একটি স্বাস্থ্যকর স্ন্যাকসের জন্য উপযুক্ত।',
      //   features: ['Certified Organic', 'Rich in Potassium', 'Versatile Snack'],
      //   price: '৳40.00',
      //   originalPrice: '৳50.00',
      //   discountText: '-20%',
      //   options: [{ unit: '500g', price: 40, originalPrice: 50 }],
      //   reviews: [],
      //   questions: [],
      //   quantity: 1,
      // };
      // setCartItems([dummyProduct1, dummyProduct2]);
    }
  }, []);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        )
        // .filter(item => item.quantity > 0) // Uncomment if you want to remove item when quantity reaches 0
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('৳', ''));
      return sum + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const taxRate = 0.05; // 5% tax
  const tax = subtotal * taxRate;
  const shipping = cartItems.length > 0 ? 60 : 0; // Example fixed shipping, ৳60 if items exist
  const total = subtotal + tax + shipping;

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const handleCheckoutClick = () => {
    if (cartItems.length > 0) {
      onGoToCheckout(cartItems);
    } else {
      alert("Your cart is empty!");
    }
  };

  return (
    <>
      {/* Inline styles for exact replication */}
      <style>
        {`
          /* Reset & Base Styles */
          * { box-sizing: border-box; margin: 0; padding: 0; }

          /* Styles that were in body, now applied to the container */
          .cart-page-container {
            background-color: #f9fafb; 
            font-family: 'Outfit', sans-serif; /* Explicitly apply Outfit font */
            min-height: 100vh;
            display: flex;
            justify-content: center; 
            align-items: center;     
            padding: 20px; 
          }

          .cart-wrapper {
              width: 100%;
              max-width: 480px; 
              background: transparent;
              display: flex; flex-direction: column;
              padding: 0 0.5rem; 
          }

          /* ============================================================
             CART ITEMS
             ============================================================ */
          .cart-items-list { display: flex; flex-direction: column; gap: 15px; }

          .c12-item {
              background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; 
              padding: 15px; display: flex; align-items: center; gap: 15px; 
              width: 100%; box-shadow: 0 2px 5px rgba(0,0,0,0.02);
          }

          .c12-img { 
              width: 64px; height: 64px; border-radius: 10px; 
              object-fit: cover; background: #f0f0f0; flex-shrink: 0; 
          }
          
          .c12-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }

          .c12-name-row { 
              font-size: 1rem; color: #111; line-height: 1.2;
              white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .c12-name { font-weight: 600; }
          .c12-weight { font-weight: 400; color: #888; margin-left: 4px; font-size: 0.85rem; }

          /* ACTION ROW: Price next to Buttons */
          .c12-action-row { 
              display: flex; align-items: center; justify-content: flex-start; gap: 8px; 
          }
          .c12-price { font-weight: 700; color: #111; font-size: 0.95rem; line-height: 1; }

          /* QTY GROUP: Elements inside (- 1 +) are now very close */
          .c12-qty-group { 
              display: flex; align-items: center; 
              gap: 2px; /* CHANGED: Reduced gap to bring icons closer to number */
              background: transparent; border: none; padding: 0; 
              position: relative; top: 1px; 
          }
          
          .c12-qbtn { 
              background: none; border: none; cursor: pointer; 
              font-size: 0.85rem; color: #888; 
              display: flex; align-items: center; transition: 0.2s;
              padding: 0; /* Ensure no extra padding pushes them apart */
          }
          .c12-qbtn:hover { color: #000; }
          
          .c12-qval { 
              font-size: 0.9rem; font-weight: 600; color: #111; 
              min-width: 12px; /* Slightly tighter width */
              text-align: center; 
          }

          .c12-del { 
              margin-left: auto; background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 4px; display: flex; align-items: center; opacity: 0.8; 
          }
          .c12-del:hover { opacity: 1; }

          /* ============================================================
             ORDER SUMMARY
             ============================================================ */
          .order-summary {
              margin-top: 25px; padding: 20px;
              background: #fff; border-radius: 16px; border: 1px solid #e5e7eb;
              display: flex; flex-direction: column; gap: 12px;
          }
          .os-row {
              display: flex; justify-content: space-between; align-items: center;
              font-size: 0.9rem; color: #6b7280;
          }
          .os-shipping-text { color: #888; font-style: italic; font-size: 0.85rem; }
          .os-row.total {
              margin-top: 8px; padding-top: 12px; border-top: 1px dashed #d1d5db;
              color: #111; font-size: 1.1rem; font-weight: 700;
          }

          /* ============================================================
             BUTTONS
             ============================================================ */
          .cart-buttons { margin-top: 20px; display: flex; gap: 12px; width: 100%; }
          .btn {
              flex: 1; padding: 16px; border-radius: 12px;
              font-weight: 600; font-size: 0.95rem; 
              cursor: pointer; text-align: center;
              border: 1px solid transparent; transition: 0.2s; white-space: nowrap; 
          }
          .btn-checkout { background: #111; color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
          .btn-checkout:hover { transform: translateY(-1px); box-shadow: 0 6px 15px rgba(0,0,0,0.2); }
          .btn-continue { background: transparent; color: #111; border: 1px solid #d1d5db; }
          .btn-continue:hover { background: #f9fafb; border-color: #9ca3af; }

          /* ============================================================
             PROMO BANNER
             ============================================================ */
          .promo-banner {
              margin-top: 25px;
              background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
              border: 1px solid #bfdbfe; border-radius: 12px; padding: 15px;
              display: flex; align-items: center; gap: 12px;
              position: relative; overflow: hidden;
          }
          .promo-banner::after {
              content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%);
              opacity: 0.3; pointer-events: none;
          }
          .promo-icon-box {
              width: 40px; height: 40px; background: #fff; border-radius: 50%;
              display: flex; justify-content: center; align-items: center;
              color: #2563eb; font-size: 1.2rem; flex-shrink: 0; z-index: 1;
          }
          .promo-text { font-size: 0.9rem; color: #1e3a8a; line-height: 1.4; z-index: 1; }
          .promo-link { font-weight: 700; text-decoration: underline; cursor: pointer; color: #1e40af; }

          /* ============================================================
             PROFESSIONAL POPUP STYLES
             ============================================================ */
          .modal-overlay {
              display: ${isPaymentModalOpen ? 'flex' : 'none'}; /* Controlled by React state */
              position: fixed; top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(0,0,0,0.6); z-index: 999;
              justify-content: center; align-items: center;
              backdrop-filter: blur(4px);
          }

          .modal-box {
              background: #fff; width: 90%; max-width: 420px;
              border-radius: 20px; padding: 25px 30px 35px 30px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.2);
              animation: slideUp 0.3s ease-out; position: relative;
              text-align: left;
          }

          @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
          }

          .modal-header {
              display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;
          }
          .modal-title { font-size: 1.25rem; font-weight: 700; color: #111; }
          
          .btn-close-icon {
              background: #f3f4f6; border: none; width: 32px; height: 32px;
              border-radius: 50%; display: flex; align-items: center; justify-content: center;
              cursor: pointer; color: #555; transition: 0.2s;
          }
          .btn-close-icon:hover { background: #e5e7eb; color: #000; }

          .payment-options { display: flex; flex-direction: column; gap: 15px; }

          .pay-card {
              width: 100%; background: #fff;
              border: 1px solid #e5e7eb; border-radius: 14px;
              padding: 18px 20px;
              display: flex; align-items: center; gap: 16px;
              cursor: pointer; text-align: left;
              transition: all 0.2s ease; position: relative;
          }
          .pay-card:hover {
              border-color: #111; background: #fafafa;
              transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }

          .pay-icon-circle {
              width: 44px; height: 44px;
              background: #f9fafb; border: 1px solid #f0f0f0; border-radius: 10px;
              display: flex; justify-content: center; align-items: center;
              font-size: 1.3rem; color: #111; flex-shrink: 0;
          }

          .pay-text-group { flex: 1; }
          .pay-label { display: block; font-size: 1rem; font-weight: 600; color: #111; margin-bottom: 3px; }
          .pay-desc { display: block; font-size: 0.85rem; color: #666; font-weight: 400; }
          
          .pay-arrow { color: #ccc; font-size: 1.1rem; transition: 0.2s; }
          .pay-card:hover .pay-arrow { color: #111; transform: translateX(3px); }
        `}
      </style>

      <div className="cart-page-container"> {/* Main container to replicate body styles */}
        <div className="cart-wrapper">
          {/* ITEM LIST */}
          <div className="cart-items-list">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 text-lg py-10">Your cart is empty!</p>
            ) : (
              cartItems.map(item => (
                <div className="c12-item" key={item.id}>
                  <img src={item.imageSrc} className="c12-img" alt={item.imageAlt} />
                  <div className="c12-info">
                    <div className="c12-name-row">
                      <span className="c12-name">{item.title}</span>{' '}
                      <span className="c12-weight">({item.options[0].unit})</span>
                    </div>
                    {/* Action Row */}
                    <div className="c12-action-row">
                      <div className="c12-price">৳{(parseFloat(item.price.replace('৳', '')) * item.quantity).toFixed(2)}</div>
                      {/* Tight Gap Qty Group */}
                      <div className="c12-qty-group">
                        <button className="c12-qbtn" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease quantity of ${item.title}`}>
                          <i className="ph ph-minus"></i>
                        </button>
                        <span className="c12-qval">{item.quantity}</span>
                        <button className="c12-qbtn" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase quantity of ${item.title}`}>
                          <i className="ph ph-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="c12-del" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.title} from cart`}>
                    <i className="ph ph-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* SUMMARY */}
          <div className="order-summary">
            <div className="os-row">
              <span>Subtotal</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>
            <div className="os-row">
              <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
              <span>৳{tax.toFixed(2)}</span>
            </div>
            <div className="os-row">
              <span>Shipping</span>
              {cartItems.length > 0 ? <span>৳{shipping.toFixed(2)}</span> : <span className="os-shipping-text">Calculated at checkout</span>}
            </div>
            <div className="os-row total">
              <span>Total</span>
              <span>৳{total.toFixed(2)}</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="cart-buttons">
            <button className="btn btn-continue" onClick={onContinueShopping}>
              Continue
            </button>
            <button className="btn btn-checkout" onClick={handleCheckoutClick}>
              Checkout
            </button>
          </div>

          {/* BANNER */}
          <div className="promo-banner">
            <div className="promo-icon-box">
              <i className="ph ph-gift"></i>
            </div>
            <div className="promo-text">
              <span className="promo-link">Log in</span> to your account now and get{' '}
              <strong>30% OFF</strong> your first order!
            </div>
          </div>
        </div>

        {/* POPUP */}
        <div className="modal-overlay" id="checkoutModal" onClick={(e) => { if (e.target === e.currentTarget) closePaymentModal(); }}>
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">Payment Method</h3>
              <button className="btn-close-icon" onClick={closePaymentModal} aria-label="Close payment methods">
                <i className="ph ph-x"></i>
              </button>
            </div>
            <div className="payment-options">
              <button className="pay-card" onClick={() => { console.log("Selected: COD"); closePaymentModal(); }}>
                <div className="pay-icon-circle">
                  <i className="ph ph-money"></i>
                </div>
                <div className="pay-text-group">
                  <span className="pay-label">Cash on Delivery</span>
                  <span className="pay-desc">Pay at your doorstep</span>
                }
                <i className="ph ph-caret-right pay-arrow"></i>
              </button>
              <button className="pay-card" onClick={() => { console.log("Selected: Prepaid"); closePaymentModal(); }}>
                <div className="pay-icon-circle">
                  <i className="ph ph-credit-card"></i>
                </div>
                <div className="pay-text-group">
                  <span className="pay-label">Pay Online</span>
                  <span className="pay-desc">Card, UPI, or Netbanking</span>
                </div>
                <i className="ph ph-caret-right pay-arrow"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};