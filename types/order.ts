import { Product } from './product';
import { CartItem } from './cart'; // Import CartItem

export interface OrderConfirmationData {
  orderId: string;
  status: 'Taken' | 'Packed' | 'Processing' | 'Done' | 'Cancelled';
  customerName: string;
  shippingAddress: string;
  estimatedDelivery: string;
  items: CartItem[]; // Changed from product: Product and quantity: number
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  totalPayable: number;
  paymentMethod: string;
}

export interface OrderTrackingRequest {
  orderId: string;
  phoneNumber: string;
}