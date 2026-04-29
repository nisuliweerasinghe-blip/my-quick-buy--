<script setup lang="ts">

import type { Product } from '../types/product';

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const emit = defineEmits(['view-detail', 'add-to-cart']);


const handleCardClick = () => {
  emit('view-detail', props.product);
};


const handleAddToCart = () => {
  emit('add-to-cart', props.product);
};
</script>

<template>
  <div 
    @click="handleCardClick"
    class="group bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
  >
    <div class="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6">
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      
      <span class="absolute top-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shadow-sm">
        {{ product.category }}
      </span>
    </div>

    <div class="flex flex-col flex-1">
      <h3 class="text-slate-800 dark:text-white font-bold text-sm line-clamp-2 mb-2 leading-tight min-h-[40px]">
        {{ product.title }}
      </h3>
      
      <div class="mt-auto flex items-center justify-between pt-2">
        <div>
          <span class="text-xs text-slate-400 block font-medium">Price</span>
          <span class="text-lg font-extrabold text-[#0F172A] dark:text-blue-400">${{ product.price.toFixed(2) }}</span>
        </div>
        
        <button 
          type="button"
          @click.stop="handleAddToCart" 
          class="bg-[#0F172A] dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-slate-200 dark:shadow-none active:scale-95"
          aria-label="Add to cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>