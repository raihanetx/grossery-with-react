import { pgTable, serial, text, integer, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- PRODUCTS TABLE ---
export const products = pgTable('products', {
  id: text('id').primaryKey(), // We use text IDs like 'prod-001' to match your mock data
  title: text('title').notNull(),
  titleBn: text('title_bn'),
  description: text('description'),
  price: integer('price').notNull(), // Stored as integer (e.g., 80)
  originalPrice: integer('original_price'),
  imageSrc: text('image_src').notNull(),
  imageAlt: text('image_alt'),
  discountText: text('discount_text'),
  stock: integer('stock').default(100),
  category: text('category'),
  features: jsonb('features').$type<string[]>(), // Storing array of strings
  createdAt: timestamp('created_at').defaultNow(),
});

// --- ORDERS TABLE ---
export const orders = pgTable('orders', {
  id: text('id').primaryKey(), // e.g., 'ORD-83729'
  customerName: text('customer_name').notNull(),
  phone: text('phone').notNull(), // Crucial for Guest Checkout tracking
  address: text('address').notNull(),
  status: text('status').notNull().default('Taken'), // Taken, Packed, Processing, Done
  totalAmount: integer('total_amount').notNull(),
  deliveryCharge: integer('delivery_charge').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- ORDER ITEMS TABLE (Linking Orders to Products) ---
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: text('order_id').references(() => orders.id),
  productId: text('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
  priceAtPurchase: integer('price_at_purchase').notNull(), // Snapshot of price
});

// --- RELATIONS ---
export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));