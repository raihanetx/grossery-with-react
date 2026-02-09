import React from 'react';
import { OrderConfirmationData } from '../types/order';

interface OrderConfirmationCardProps {
  order: OrderConfirmationData;
  onClose: () => void;
}

export const OrderConfirmationCard: React.FC<OrderConfirmationCardProps> = ({ order, onClose }) => {
  const getProgressBarWidth = (status: OrderConfirmationData['status']) => {
    switch (status) {
      case 'Taken': return '0%';
      case 'Packed': return '33%';
      case 'Processing': return '66%';
      case 'Done': return '100%';
      default: return '0%';
    }
  };

  const getDotClass = (dotStatus: 'Taken' | 'Packed' | 'Processing' | 'Done') => {
    const statuses = ['Taken', 'Packed', 'Processing', 'Done'];
    const currentIndex = statuses.indexOf(order.status);
    const dotIndex = statuses.indexOf(dotStatus);

    if (dotIndex < currentIndex) {
      return 'bg-active'; // Already passed
    } else if (dotIndex === currentIndex) {
      return 'border-2 border-active bg-white ring-2 ring-active/20'; // Current status
    }
    return 'bg-ink/10'; // Future status
  };

  return (
    <div className="fixed inset-0 bg-gray-100 p-6 flex items-center justify-center z-50 overflow-auto py-10 md:py-6">
      <div className="w-full max-w-[340px] bg-white rounded-[5px] border border-ink/20 flex flex-col overflow-hidden shadow-sm relative font-print text-ink">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-ink/40 hover:text-ink transition-colors z-10"
          aria-label="Close Order Confirmation"
        >
          <i className="ri-close-line text-lg"></i>
        </button>

        {/* SECTION 1: QR & ORDER INFO */}
        <div className="px-6 pt-7 pb-3 flex items-start gap-4">
          <div className="relative">
            <div className="absolute -top-[2px] -left-[2px] w-2 h-2 border-t-2 border-l-2 border-ink"></div>
            <div className="absolute -top-[2px] -right-[2px] w-2 h-2 border-t-2 border-r-2 border-ink"></div>
            <div className="absolute -bottom-[2px] -left-[2px] w-2 h-2 border-b-2 border-l-2 border-ink"></div>
            <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 border-b-2 border-r-2 border-ink"></div>

            <div className="w-14 h-14 bg-white p-1">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Order:${order.orderId}&color=111827`}
                className="w-full h-full object-contain"
                alt="Order QR"
              />
            </div>
          </div>

          <div className="flex flex-col pt-1">
            <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest mb-0.5">Order History</span>
            <h2 className="text-sm font-bold tracking-tight uppercase">ID: #{order.orderId}</h2>

            <div className="flex items-center gap-1.5 mt-2 text-active">
              <i className="ph-bold ph-circle-notch text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">{order.status}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: ORANGE PROGRESS BAR */}
        <div className="px-6 py-5">
          <div className="relative flex items-center justify-between z-0">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-ink/10 -z-10 rounded-full"></div>
            <div className="absolute top-1/2 left-0 h-[2px] bg-active -z-10 rounded-full transition-all duration-500 ease-in-out" style={{ width: getProgressBarWidth(order.status) }}></div>

            <div className="bg-white pr-1"><div className={`w-2.5 h-2.5 rounded-full ${getDotClass('Taken')}`}></div></div>
            <div className="bg-white px-1"><div className={`w-2.5 h-2.5 rounded-full ${getDotClass('Packed')}`}></div></div>
            <div className="bg-white px-1">
              <div className={`w-2.5 h-2.5 rounded-full ${getDotClass('Processing')}`}></div>
            </div>
            <div className="bg-white pl-1"><div className={`w-2.5 h-2.5 rounded-full ${getDotClass('Done')}`}></div></div>
          </div>
          <div className="flex justify-between text-[9px] font-bold mt-2 uppercase text-ink/40">
            <span className={order.status === 'Taken' ? 'text-ink/80' : ''}>Taken</span>
            <span className={order.status === 'Packed' ? 'text-ink/80' : ''}>Packed</span>
            <span className={order.status === 'Processing' ? 'text-active' : ''}>Process</span>
            <span className={order.status === 'Done' ? 'text-ink/80' : ''}>Done</span>
          </div>
        </div>

        {/* SECTION 3: DELIVERY INFO */}
        <div className="px-6 pb-6 pt-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <i className="ph-fill ph-map-pin text-sm text-ink/30 mt-0.5"></i>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest mb-1">Shipping Details</span>
                <span className="text-xs font-bold text-ink uppercase">{order.customerName}</span>
                <span className="text-xs font-bold text-ink/60 mt-0.5 leading-snug uppercase">{order.shippingAddress}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <i className="ph-fill ph-timer text-sm text-active"></i>
              <span className="text-xs font-bold text-active uppercase tracking-tight">Est: {order.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: PRODUCT LIST (Light Background for Contrast) */}
        <div className="px-6 py-5 space-y-4 border-t border-dashed border-ink/10 bg-gray-50/50">
          {order.items.map(item => (
            <div className="flex items-center gap-3" key={item.id}>
              <div className="w-10 h-10 rounded-[3px] bg-white flex-shrink-0 overflow-hidden border border-ink/10 p-[2px]">
                <img
                  src={item.imageSrc}
                  className="w-full h-full object-cover rounded-[2px] grayscale opacity-80"
                  alt={item.imageAlt}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold tracking-tight uppercase text-ink">{item.title} ({item.options[0].unit})</p>
                <p className="text-[9px] text-ink/40 mt-0.5 uppercase">Qty: {item.quantity} {item.quantity > 1 ? 'Packs' : 'Pack'}</p>
              </div>
              <span className="text-xs font-bold text-ink">৳{(parseFloat(item.price.replace('৳', '')) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* SECTION 5: CALCULATION & SUMMARY */}
        <div className="px-6 pb-8 pt-5 border-t border-dashed border-ink/20">
          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-ink/40 uppercase">Sub-Total</span>
              <span className="text-ink">৳{order.subtotal.toFixed(2)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-ink/40 uppercase tracking-tighter">Discount (SAVE50)</span>
                <span className="text-ink">-৳{order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-ink/40 uppercase">Delivery</span>
              <span className="text-ink">৳{order.deliveryCharge.toFixed(2)}</span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-ink/10 mb-5"></div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-ink/80">Payable Amount</span>
              <span className="text-[10px] font-bold text-ink/40 uppercase mt-1">({order.paymentMethod})</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold tracking-tighter text-ink">৳{order.totalPayable.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};