<script setup lang="ts">
import { useCart } from '../composables/useCart';
const { cartCount } = useCart();
const emit = defineEmits(['search', 'open-cart']); // Added open-cart for clarity

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('search', target.value);
};
</script>

<template>
  <nav class="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-40">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold tracking-tight">
        My <span class="text-blue-400">Quick Buy</span>
      </h1>

      <div class="flex-1 max-w-md mx-8 hidden md:block">
        <input 
          type="text" 
          @input="handleInput"
          placeholder="Search products..." 
          class="w-full bg-slate-800 border-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        />
      </div>

      <div class="flex items-center space-x-6">
        <button class="hover:text-blue-400 transition">Home</button>
        
        <div @click="$emit('open-cart')" class="relative cursor-pointer flex items-center group">
          <span class="hover:text-blue-400 transition-colors">Cart</span>
          <span 
            v-if="cartCount > 0" 
            class="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm"
          >
            {{ cartCount }}
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>