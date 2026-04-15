import { ref, computed, watch } from 'vue';
import type { Product } from '../types/product';
import type { CartItem } from '../types/cart';

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

 
  watch(cart, (newVal) => {
    localStorage.setItem('cart', JSON.stringify(newVal));
  }, { deep: true });

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter(item => item.id !== productId);
  };

  const updateQuantity = (productId: number, delta: number) => {
    const item = cart.value.find(i => i.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) removeFromCart(productId);
    }
  };

  const totalPrice = computed(() => 
    cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  const clearCart = () => {
    cart.value = [];
  };

  return { cart, addToCart, cartCount, removeFromCart, updateQuantity, totalPrice, clearCart };
}