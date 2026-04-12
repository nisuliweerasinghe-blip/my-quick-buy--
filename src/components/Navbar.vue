<script setup lang="ts">
import { useCart } from '../composables/useCart';
const { cartCount } = useCart();
const emit = defineEmits(['search']);
// ... keep your handleInput function ...
</script>

<template>
  <nav class="bg-slate-900 text-white p-4 shadow-lg">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">My Quick Buy</h1>
      
      <div class="flex items-center space-x-4">
        <button class="hover:text-blue-400">Home</button>
        <div class="relative">
          <span class="hover:text-blue-400 cursor-pointer">Cart</span>
          <span v-if="cartCount > 0" class="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">
            {{ cartCount }}
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>