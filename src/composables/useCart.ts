import { ref, computed, watch } from 'vue';
import type { Product } from '../types/product';
import type { CartItem } from '../types/cart';

// This sits OUTSIDE the function so it's shared globally
const cart = ref<CartItem[]>(
  JSON.parse(localStorage.getItem('cart') || '[]')
);

export function useCart() {
  const addToCart = (product: Product) => {
    const existing = cart.value.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
  };

  const cartCount = computed(() => 
    cart.value.reduce((total, item) => total + item.quantity, 0)
  );

  // Sync to LocalStorage whenever the cart changes
  watch(cart, (newVal) => {
    localStorage.setItem('cart', JSON.stringify(newVal));
  }, { deep: true });

  return { cart, addToCart, cartCount };
}