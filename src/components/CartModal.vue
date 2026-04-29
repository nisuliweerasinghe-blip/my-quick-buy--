<script setup lang="ts">
import { useCart } from '../composables/useCart';


const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

const emit = defineEmits(['close']);

const handleCheckout = () => {
  if (cart.value.length === 0) return;

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
    <div class="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col relative animate-in slide-in-from-right duration-300 transition-colors">
      
      <div class="flex justify-between items-center mb-6 border-b dark:border-slate-800 pb-4">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          Your Cart
          <span class="text-sm font-normal text-slate-500 dark:text-slate-400">({{ cart.length }} items)</span>
        </h2>
        <button 
          @click="$emit('close')" 
          class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          ✕
        </button>
      </div>

      <div class="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center h-64 text-center">
          <div class="text-6xl mb-4 opacity-20">🛒</div>
          <p class="text-slate-500 dark:text-slate-400 mb-6">Your cart is feeling a bit light.</p>
          <button 
            @click="$emit('close')" 
            class="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Back to shopping
          </button>
        </div>

        <div v-else class="space-y-6">
          <div 
            v-for="item in cart" 
            :key="item.id" 
            class="flex gap-4 group bg-slate-50/50 dark:bg-slate-800/50 p-3 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-colors"
          >
            <div class="w-20 h-20 bg-white rounded-xl p-2 border border-slate-100 dark:border-slate-700 flex-shrink-0 flex items-center justify-center">
               <img 
                :src="item.thumbnail" 
                :alt="item.title" 
                class="max-w-full max-h-full object-contain" 
              />
            </div>
            
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm line-clamp-2 leading-tight">{{ item.title }}</h4>
                <button 
                  @click="removeFromCart(item.id)" 
                  class="text-slate-300 hover:text-red-500 transition-colors ml-2"
                >
                  <span class="text-[10px] font-bold uppercase">Remove</span>
                </button>
              </div>
              
              <p class="text-blue-600 dark:text-blue-400 font-extrabold mt-1">${{ item.price.toFixed(2) }}</p>
              
              <div class="flex items-center gap-4 mt-3">
                <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
                  <button 
                    @click="updateQuantity(item.id, -1)" 
                    class="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-r border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300"
                  >
                    −
                  </button>
                  <span class="px-4 py-1 text-sm font-bold w-10 text-center text-slate-800 dark:text-slate-100">
                    {{ item.quantity }}
                  </span>
                  <button 
                    @click="updateQuantity(item.id, 1)" 
                    class="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-l border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cart.length > 0" class="mt-6 border-t dark:border-slate-800 pt-6 bg-white dark:bg-slate-900">
        <div class="flex justify-between items-center mb-2">
          <span class="text-slate-500 dark:text-slate-400">Subtotal</span>
          <span class="text-slate-800 dark:text-slate-200 font-bold">${{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center mb-6">
          <span class="text-slate-500 dark:text-slate-400 text-sm">Shipping</span>
          <span class="text-green-600 dark:text-green-400 text-xs font-black uppercase tracking-widest">Free</span>
        </div>
        
        <div class="flex justify-between text-2xl font-black mb-6 text-slate-900 dark:text-white border-t dark:border-slate-800 pt-4">
          <span>Total:</span>
          <span>${{ totalPrice.toFixed(2) }}</span>
        </div>
        
        <button 
          @click="handleCheckout"
          class="w-full bg-[#0F172A] dark:bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none"
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


.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.animate-in {
  animation: slideIn 0.3s ease-out;
}
</style>