import { ref, computed, watch } from 'vue';
import type { Product } from '../types/product';

export interface CartItem extends Product {
  quantity: number;
}


const cart = ref<CartItem[]>(
  JSON.parse(localStorage.getItem('cart') || '[]')
);


watch(cart, (newVal) => {
  localStorage.setItem('cart', JSON.stringify(newVal));
}, { deep: true });

export function useCart() {
  
  const addToCart = (product: Product) => {
    const existing = cart.value.find(item => item.id === product.id);
    if (existing) {
      existing.quantity = Number(existing.quantity) + 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter(item => item.id !== productId);
  };

  const updateQuantity = (productId: number, delta: number) => {
    const item = cart.value.find(i => i.id === productId);
    if (item) {
      const newQty = Number(item.quantity) + delta;
      if (newQty <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = newQty;
      }
    }
  };

  const cartCount = computed(() => 
    cart.value.reduce((total, item) => total + Number(item.quantity), 0)
  );

  const totalPrice = computed(() => 
    cart.value.reduce((sum, item) => sum + (item.price * Number(item.quantity)), 0)
  );

  const clearCart = () => {
    cart.value = [];
  };

  return { 
    cart, 
    addToCart, 
    cartCount, 
    removeFromCart, 
    updateQuantity, 
    totalPrice, 
    clearCart 
  };
}