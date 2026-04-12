<script setup lang="ts">
import type { Product } from '../types/product';
import { useCart } from '../composables/useCart'; // Double check this path!

defineProps<{ product: Product }>();
const { addToCart } = useCart();
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
    <img :src="product.thumbnail" class="h-40 w-full object-cover rounded-lg" />
    <h3 class="font-bold mt-2">{{ product.title }}</h3>
    <div class="flex justify-between items-center mt-4">
      <span class="text-blue-600 font-bold">${{ product.price }}</span>
      <button 
        @click="addToCart(product)" 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>