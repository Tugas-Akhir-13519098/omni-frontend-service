export type ProductData = {
  id: string;
  name: string;
  price: number;
  weight: number;
  stock: number;
  image: string;
  description: string;
  tokopedia_product_id: number;
  shopee_product_id: number;
};

export type OrderData = {
  id: string;
  tokopedia_order_id: number;
  shopee_order_id: number;
  customer: Customer;
  order_status: string;
  products: OrderProduct[];
  created_at: string;
};

type Customer = {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_district: string;
  customer_city: string;
  customer_province: string;
  customer_country: string;
  customer_postal_code: string;
};

type OrderProduct = {
  order_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
};
