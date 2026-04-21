<script setup lang="ts">
import type { Product } from '../types/product';

defineProps<{
  product: Product | null;
}>();

defineEmits(['close']);
</script>

<template>
  <div v-if="product" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-white rounded-[32px] max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
      
      <button @click="$emit('close')" class="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 bg-slate-50 p-12 flex items-center justify-center">
          <img 
            :src="product.thumbnail || (product.images && product.images[0])" 
            :alt="product.title" 
            class="max-h-[300px] w-auto object-contain drop-shadow-xl"
          />
        </div>

        <div class="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <span class="text-blue-600 font-bold uppercase text-xs tracking-widest">{{ product.category }}</span>
          <h2 class="text-3xl font-extrabold text-slate-900 mt-2 leading-tight">{{ product.title }}</h2>
          <p class="text-slate-500 mt-6 leading-relaxed text-sm">
            {{ product.description }}
          </p>
          
          <div class="mt-10 flex items-center justify-between">
            <span class="text-4xl font-black text-slate-900">${{ product.price }}</span>
            <button class="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>