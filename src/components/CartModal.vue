<script setup lang="ts">
import { useCart } from '../composables/useCart';

// Using the shared composable logic
const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

const emit = defineEmits(['close']);

const handleCheckout = () => {
  if (cart.value.length === 0) return;

  // Use a simple confirmation for the checkout flow
  const confirmPurchase = confirm(`Your total is $${totalPrice.value.toFixed(2)}. Confirm purchase?`);
  
  if (confirmPurchase) {
    alert('Order Placed! Thank you for shopping with My Quick Buy.');
    clearCart();
    emit('close');
  }
};
</script>

<template>
  <div 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-end"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col relative animate-in slide-in-from-right duration-300">
      
      <div class="flex justify-between items-center mb-6 border-b pb-4">
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-2">
          Your Cart
          <span class="text-sm font-normal text-slate-500">({{ cart.length }} items)</span>
        </h2>
        <button 
          @click="$emit('close')" 
          class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      </div>

      <div class="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center h-64 text-center">
          <div class="text-6xl mb-4 opacity-20">🛒</div>
          <p class="text-slate-500 mb-6">Your cart is feeling a bit light.</p>
          <button 
            @click="$emit('close')" 
            class="text-blue-600 font-bold hover:underline"
          >
            Back to shopping
          </button>
        </div>

        <div v-else class="space-y-6">
          <div 
            v-for="item in cart" 
            :key="item.id" 
            class="flex gap-4 group bg-slate-50/50 p-3 rounded-2xl border border-transparent hover:border-slate-100 transition-colors"
          >
            <img 
              :src="item.thumbnail" 
              :alt="item.title" 
              class="w-20 h-20 object-contain rounded-xl bg-white border border-slate-100" 
            />
            
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <h4 class="font-bold text-slate-800 text-sm line-clamp-2 leading-tight">{{ item.title }}</h4>
                <button 
                  @click="removeFromCart(item.id)" 
                  class="text-slate-300 hover:text-red-500 transition-colors ml-2"
                >
                  <span class="text-[10px] font-bold uppercase">Remove</span>
                </button>
              </div>
              
              <p class="text-blue-600 font-extrabold mt-1">${{ item.price.toFixed(2) }}</p>
              
              <div class="flex items-center gap-4 mt-3">
                <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button 
                    @click="updateQuantity(item.id, -1)" 
                    class="px-3 py-1 hover:bg-slate-50 transition-colors border-r border-slate-200 font-bold text-slate-600"
                  >
                    −
                  </button>
                  <span class="px-4 py-1 text-sm font-bold w-10 text-center text-slate-800">
                    {{ item.quantity }}
                  </span>
                  <button 
                    @click="updateQuantity(item.id, 1)" 
                    class="px-3 py-1 hover:bg-slate-50 transition-colors border-l border-slate-200 font-bold text-slate-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cart.length > 0" class="mt-6 border-t pt-6 bg-white">
        <div class="flex justify-between items-center mb-2">
          <span class="text-slate-500">Subtotal</span>
          <span class="text-slate-800 font-bold">${{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center mb-6">
          <span class="text-slate-500 text-sm">Shipping</span>
          <span class="text-green-600 text-xs font-black uppercase tracking-widest">Free</span>
        </div>
        
        <div class="flex justify-between text-2xl font-black mb-6 text-slate-900 border-t pt-4">
          <span>Total:</span>
          <span>${{ totalPrice.toFixed(2) }}</span>
        </div>
        
        <button 
          @click="handleCheckout"
          class="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
        >
          Checkout Now
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

/* Ensure the slide-in matches Tailwind's animate-in if you haven't configured it in tailwind.config.js */
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.animate-in {
  animation: slideIn 0.3s ease-out;
}
</style>