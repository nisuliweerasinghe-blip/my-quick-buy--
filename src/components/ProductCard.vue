<script setup lang="ts">
import type { Product } from '../types/product';

defineProps<{
  product: Product
}>();
</script>

<template>
  <div class="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
    <div v-if="product.discountPercentage" class="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
      -{{ Math.round(product.discountPercentage) }}%
    </div>

    <div class="relative h-56 overflow-hidden bg-slate-100">
      <img :src="product.thumbnail" :alt="product.title" 
           class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <h2 class="font-bold text-slate-800 text-lg line-clamp-1 flex-1">{{ product.title }}</h2>
        <span class="flex items-center text-amber-500 text-sm font-medium ml-2">
          ★ {{ product.rating }}
        </span>
      </div>
      
      <p class="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">{{ product.description }}</p>

      <div class="flex items-center justify-between mt-auto">
        <div class="flex flex-col">
          <span class="text-2xl font-black text-slate-900">${{ product.price }}</span>
          <span class="text-xs text-slate-400 line-through">
            ${{ (product.price * (1 + product.discountPercentage/100)).toFixed(2) }}
          </span>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors shadow-lg shadow-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>