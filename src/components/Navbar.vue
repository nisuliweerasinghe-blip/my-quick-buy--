<script setup lang="ts">
import { ref, watch } from 'vue';

// 1. ADDED: Define 'cartCount' as a prop so App.vue can send the real number
defineProps<{
  cartCount: number
}>();

// Define the events this component can send to App.vue
const emit = defineEmits(['search', 'open-cart']);

const localSearchQuery = ref('');

// Watch for changes in the input and tell the parent (App.vue)
watch(localSearchQuery, (newQuery) => {
  emit('search', newQuery);
});
</script>

<template>
  <nav class="bg-[#0F172A] text-white p-4 shadow-lg sticky top-0 z-50">
    <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      <div class="text-2xl font-bold tracking-tight cursor-pointer" @click="localSearchQuery = ''">
        <span class="text-blue-400">My Quick Buy</span> 
      </div>
      
      <div class="w-full md:w-1/3 lg:w-1/2 relative">
        <input 
          v-model="localSearchQuery"
          type="text" 
          placeholder="Search for products..." 
          class="w-full px-4 py-2 rounded-xl text-slate-900 bg-white border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all pl-10"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div class="flex items-center gap-6">
        <button 
          @click="$emit('open-cart')" 
          class="relative p-2 hover:bg-slate-800 rounded-full transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          <span 
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0F172A]"
          >
            {{ cartCount }}
          </span>
        </button>

        <div class="h-10 w-10 rounded-full bg-slate-700 border border-slate-600 hidden md:block"></div>
      </div>
    </div>
  </nav>
</template>