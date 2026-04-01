<script setup lang="ts">
import type { Product } from '../types/product';

defineProps<{
  product: Product
}>();
</script>

<template>
  <div class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h2 class="font-bold text-lg truncate">{{ product.title }}</h2>
      <p class="text-gray-600 text-sm h-10 overflow-hidden">{{ product.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-blue-600 font-bold">${{ product.price }}</span>
        <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>