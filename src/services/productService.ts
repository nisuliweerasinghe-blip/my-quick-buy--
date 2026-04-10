import type { Product } from '../types/product';

const API_URL = 'https://dummyjson.com/products';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.products; 
};