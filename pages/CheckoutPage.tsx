import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '../types/product'; // Still need Product type for CartItem
import { OrderConfirmationData } from '../types/order';
import { CartItem } from '../types/cart'; // Import CartItem
import gsap from 'gsap';

interface CheckoutPageProps {
  cartItems: CartItem[]; // Changed to accept an array of CartItem
  onBackToCart: () => void; // Renamed from onBackToProductDetails
  onOrderConfirmed: (orderData: OrderConfirmationData) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onBackToCart, onOrderConfirmed }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  // Refs for input labels
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const couponInputRef = useRef<HTMLInputElement>(null);

  // Calculate subtotal from cart items
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('৳', ''));
    return sum + (price * item.quantity);
  }, 0);
  const totalPayable = subtotal + deliveryCharge;

  // --- GSAP Input Label Animation Logic ---
  const animateLabelUp = useCallback((label: HTMLLabelElement, duration: number = 0.3) => {
    label.classList.add('active-label');
    gsap.to(label, {
      top: 0,
      left: 12,
      fontSize: "0.75rem",
      duration: duration,
      ease: "power2.out"
    });
  }, []);

  const animateLabelDown = useCallback((label: HTMLLabelElement) => {
    label.classList.remove('active-label');
    gsap.to(label, {
      top: "50%",
      left: 44,
      fontSize: "0.95rem",
      duration: 0.3,
      ease: "power2.out"
    });
  }, []);

  useEffect(() => {
    const inputs = [
      { ref: fullNameInputRef, value: fullName },
      { ref: phoneInputRef, value: phone },
      { ref: addressInputRef, value: address },
      { ref: couponInputRef, value: coupon },
    ];

    inputs.forEach(({ ref, value }) => {
      const inputEl = ref.current;
      if (inputEl) {
        const label = inputEl.nextElementSibling as HTMLLabelElement;

        const handleFocus = () => animateLabelUp(label);
        const handleBlur = () => {
          if (inputEl.value === '') animateLabelDown(label);
          else animateLabelUp(label, 0); // Keep label up if value exists after blur
        };

        inputEl.addEventListener('focus', handleFocus);
        inputEl.addEventListener('blur', handleBlur);

        // Initial check for existing value (e.g., from autofill or initial state)
        if (value !== '') animateLabelUp(label, 0);

        return () => {
          inputEl.removeEventListener('focus', handleFocus);
          inputEl.removeEventListener('blur', handleBlur);
        };
      }
    });

    gsap.set("#info-cod", { opacity: 1, display: 'block' });

  }, [fullName, phone, address, coupon, animateLabelUp, animateLabelDown]);

  // Dynamic Delivery Charge Logic
  useEffect(() => {
    if (address.trim().length > 0) {
      setDeliveryCharge(60);
    } else {
      setDeliveryCharge(0);
    }
  }, [address]);

  // Handle form submission
  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address) {
      alert("Please fill in all shipping details.");
      return;
    }

    const orderData: OrderConfirmationData = {
      orderId: `ORD-${Math.floor(Math.random() * 100000)}`, // Generate a random order ID
      status: 'Processing',
      customerName: fullName,
      shippingAddress: address,
      estimatedDelivery: '1 - 7 Days', // Static for now
      items: cartItems, // Pass the entire cartItems array
      subtotal: subtotal,
      deliveryCharge: deliveryCharge,
      discountAmount: coupon ? 50 : 0, // Simple discount logic for demo
      totalPayable: totalPayable - (coupon ? 50 : 0),
      paymentMethod: 'Cash on Delivery',
    };

    onOrderConfirmed(orderData); // Pass order data to parent
  };

  return (
    <>
      {/* Inline styles for exact replication */}
      <style>
        {`
          :root {
            --primary-orange: #FF7F32;
            --text-dark: #222;
            --text-grey: #666;
            --border-input: #e0e0e0;
            --bg-white: #ffffff;
            --btn-cancel-bg: #f9f9f9;
            --btn-cancel-text: #666;
            --icon-color: #a0a0a0;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
            -webkit-tap-highlight-color: transparent;
          }

          body {
            background-color: #ffffff;
            color: var(--text-dark);
            display: flex;
            justify-content: center;
            min-height: 100vh;
          }

          .container {
            width: 100%;
            max-width: 480px;
            padding: 20px 25px;
            padding-bottom: 50px;
          }

          .divider {
            height: 1px;
            background-color: #f0f0f0;
            margin: 30px 0;
            border: none;
          }

          .section-header {
            font-size: 0.8rem;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 20px;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .section-header i {
            font-size: 1.1rem;
            color: var(--primary-orange);
            font-weight: normal;
          }
          
          /* --- Input Styles --- */
          .input-wrapper {
            position: relative;
            margin-bottom: 20px;
          }

          .input-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--icon-color);
            font-size: 1.1rem; 
            transition: color 0.3s ease;
            z-index: 2;
            pointer-events: none;
          }

          .clean-input {
            width: 100%;
            padding: 13px 15px 13px 44px; 
            border: 1px solid var(--border-input);
            border-radius: 8px;
            font-size: 0.95rem;
            color: var(--text-dark);
            background: transparent;
            outline: none;
            transition: border-color 0.3s ease;
          }

          .clean-input:focus {
            border-color: var(--primary-orange);
            box-shadow: none;
          }

          /* --- AUTOFILL FIX --- */
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
            -webkit-text-fill-color: var(--text-dark) !important;
            transition: background-color 5000s ease-in-out 0s;
          }

          /* Label Styling */
          .input-label {
            position: absolute;
            left: 44px;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            color: #999;
            font-size: 0.95rem;
            pointer-events: none;
          }

          .input-label.active-label {
            background-color: #ffffff; 
            padding: 0 4px;
            font-weight: 600;
            color: var(--primary-orange);
            z-index: 5;
          }
          
          .clean-input:focus ~ .input-icon {
            color: var(--primary-orange);
          }

          .row-inputs { /* Kept for general structure, though now only one item */
            display: flex;
            gap: 15px;
          }
          .row-inputs .input-wrapper {
            flex: 1;
          }

          /* --- Order Summary --- */
          .product-row {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }

          .prod-img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            object-fit: cover;
            background: #f9f9f9;
            margin-right: 15px;
          }

          .prod-info h4 {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 3px;
          }

          .prod-info span {
            font-size: 0.85rem;
            color: var(--text-grey);
          }

          .prod-price {
            margin-left: auto;
            font-weight: 700;
            font-size: 1rem;
          }

          .cost-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 0.9rem;
            color: var(--text-grey);
          }

          .total-row {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px dashed #eee;
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--text-dark);
          }

          /* --- Coupon --- */
          .coupon-wrapper {
            display: flex;
            gap: 10px;
            margin-top: 25px;
          }
          .coupon-wrapper .input-wrapper {
            margin-bottom: 0;
            flex: 1;
          }
          .btn-apply {
            background: transparent;
            border: 1px solid var(--primary-orange);
            color: var(--primary-orange);
            border-radius: 8px;
            padding: 0 24px;
            font-weight: 600;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
          }
          .btn-apply:hover {
            background: var(--primary-orange);
            color: white;
          }

          /* --- Payment Tabs (Styling kept but element removed) --- */
          .pay-tabs {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
          }

          .pay-tab-item {
            flex: 1;
            text-align: center;
            font-size: 0.9rem;
            font-weight: 500;
            color: #aaa;
            cursor: pointer;
            transition: all 0.3s;
            padding: 8px 0;
            position: relative;
          }

          .pay-tab-item:first-child::after {
            content: '';
            position: absolute;
            right: 0;
            top: 20%;
            height: 60%;
            width: 1px;
            background-color: #ddd;
          }

          .pay-tab-item.active {
            color: var(--primary-orange);
            font-weight: 700;
          }

          /* --- Payment Details --- */
          .pay-content {
            margin-bottom: 15px;
            padding-left: 5px;
            /* display: none; */ /* Removed display: none default for COD */
            opacity: 0; /* Keep opacity for fade in on mount */
          }

          .instruction {
            font-size: 0.95rem;
            color: var(--text-grey);
            line-height: 1.6;
          }

          .wallet-options {
            display: flex;
            gap: 12px;
            margin-bottom: 18px;
          }

          .w-btn {
            border: 1px solid #eee;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.85rem;
            color: #666;
            cursor: pointer;
            transition: all 0.2s;
            background: white;
          }

          .w-btn.active {
            border-color: var(--primary-orange);
            color: var(--primary-orange);
            font-weight: 600;
            background-color: #fffaf7;
          }

          .pay-line-text {
            font-size: 0.95rem;
            color: var(--text-dark);
            margin-bottom: 15px;
            display: block;
          }

          /* --- Terms & Actions --- */
          .legal-check {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }
          .legal-check input {
            accent-color: var(--primary-orange);
            width: 18px;
            height: 18px;
            margin-right: 12px;
            cursor: pointer;
          }
          .legal-check label {
            font-size: 0.9rem;
            color: var(--text-grey);
            cursor: pointer;
          }
          .link { color: var(--primary-orange); text-decoration: none; font-weight: 500; }

          .btn-group {
            display: flex;
            gap: 15px;
            margin-top: 35px;
          }
          .btn-main {
            flex: 1;
            padding: 15px;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .btn-cancel { background: var(--btn-cancel-bg); color: var(--btn-cancel-text); }
          .btn-confirm { background: var(--primary-orange); color: white; box-shadow: 0 4px 15px rgba(255, 127, 50, 0.25); }
        `}
      </style>
      <div className="container">

        {/* 1. Shipping Address */}
        <div className="section-header">
          <i className="ri-map-pin-user-line"></i> Shipping Details
        </div>

        <div className="input-wrapper">
          <i className="ri-user-3-line input-icon"></i>
          <input
            ref={fullNameInputRef}
            type="text"
            id="fullname"
            className="clean-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="fullname" className="input-label">Full Name</label>
        </div>

        {/* Phone input, now standalone */}
        <div className="input-wrapper">
            <i className="ri-smartphone-line input-icon"></i>
            <input
              ref={phoneInputRef}
              type="tel"
              id="phone"
              className="clean-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone" className="input-label">Phone</label>
        </div>
        {/* City input removed as per request */}

        <div className="input-wrapper">
          <i className="ri-map-pin-2-line input-icon"></i>
          <input
            ref={addressInputRef}
            type="text"
            id="address"
            className="clean-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="address" className="input-label">Full Address</label>
        </div>

        <hr className="divider" />

        {/* 2. Order Summary */}
        <div className="section-header">
          <i className="ri-shopping-bag-3-line"></i> Order Summary
        </div>

        {cartItems.map(item => (
          <div className="product-row" key={item.id}>
            <img src={item.imageSrc} alt={item.imageAlt} className="prod-img" />
            <div className="prod-info">
              <h4>{item.title}</h4>
              <span>Qty: {item.quantity} x {item.options[0].unit}</span> {/* Assuming first option for quantity */}
            </div>
            <div className="prod-price">৳{(parseFloat(item.price.replace('৳', '')) * item.quantity).toFixed(2)}</div>
          </div>
        ))}

        <div className="cost-row">
          <span>Subtotal</span>
          <span>৳{subtotal.toFixed(2)}</span>
        </div>

        <div className="cost-row">
          <span>Delivery Charge</span>
          <span id="delivery-cost">{deliveryCharge > 0 ? `৳${deliveryCharge.toFixed(2)}` : '?'}</span>
        </div>
        <div className="total-row">
          <span>Total Payable</span>
          <span id="total-cost">৳{totalPayable.toFixed(2)}</span>
        </div>

        <div className="coupon-wrapper">
          <div className="input-wrapper">
            <i className="ri-ticket-2-line input-icon"></i>
            <input
              ref={couponInputRef}
              type="text"
              id="coupon"
              className="clean-input"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <label htmlFor="coupon" className="input-label">Coupon Code</label>
          </div>
          <button className="btn-apply">APPLY</button>
        </div>

        <hr className="divider" />

        {/* 3. Payment Method */}
        <div className="section-header">
          <i className="ri-secure-payment-line"></i> Payment Method
        </div>

        {/* Only Cash on Delivery option */}
        <div id="info-cod" className="pay-content">
          <p className="instruction">
            This is a payment in <b>cash on delivery</b> option. You have to pay <b>৳{totalPayable.toFixed(2)}</b> to the rider upon delivery.
          </p>
        </div>
        {/* Pre-paid Delivery content removed */}

        <hr className="divider" />

        {/* 4. Final Confirm */}
        <div className="legal-check">
          <input type="checkbox" id="save" />
          <label htmlFor="save">Save info for next time</label>
        </div>
        <div className="legal-check">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">I agree to the <a href="#" className="link">Terms & Conditions</a></label>
        </div>

        <div className="btn-group">
          <button className="btn-main btn-cancel" onClick={onBackToCart}>Cancel</button>
          <button className="btn-main btn-confirm" onClick={handleConfirmOrder}>Confirm Order</button>
        </div>

      </div>
    </>
  );
};