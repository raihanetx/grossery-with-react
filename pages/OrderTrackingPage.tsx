import React, { useState } from 'react';
import { OrderConfirmationData } from '../types/order';

interface OrderTrackingPageProps {
  onTrack: (orderId: string, phone: string) => void;
  isLoading: boolean;
  error: string | null;
  foundOrder: OrderConfirmationData | null;
  onCloseResult: () => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ 
  onTrack, 
  isLoading, 
  error, 
  foundOrder, 
  onCloseResult 
}) => {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && phone) {
      onTrack(orderId, phone);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-map-pin-time-line text-3xl text-primary"></i>
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Track Your Order</h2>
          <p className="text-gray-500 text-sm">Enter your Order ID and Phone Number to check the current status of your delivery.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="orderId" className="block text-xs font-bold text-gray-500 uppercase mb-2">Order ID</label>
            <div className="relative">
              <i className="ri-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                id="orderId"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-orange-100 transition-all"
                placeholder="e.g. ORD-83729"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="trackPhone" className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone Number</label>
            <div className="relative">
              <i className="ri-smartphone-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="tel"
                id="trackPhone"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-orange-100 transition-all"
                placeholder="e.g. 01700000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2">
              <i className="ri-error-warning-fill"></i> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-dark text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <i className="ri-loader-4-line animate-spin text-xl"></i> Finding Order...
              </>
            ) : (
              <>
                Track Order <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Card Modal (Reusing structure similar to OrderConfirmationCard but simplified or passed down) */}
      {/* For now, the App.tsx handles showing the actual ConfirmationCard if found */}
    </div>
  );
};