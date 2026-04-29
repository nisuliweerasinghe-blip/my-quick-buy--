<script setup lang="ts">
import { ref, watch } from 'vue';


defineProps<{
  cartCount: number,
  isDark: boolean
}>();

const emit = defineEmits(['search', 'open-cart', 'toggle-theme']);

const localSearchQuery = ref('');


watch(localSearchQuery, (newQuery) => {
  emit('search', newQuery);
});
</script>

<template>
  <nav class="bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-4 shadow-lg sticky top-0 z-50 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      <div class="text-2xl font-bold tracking-tight cursor-pointer" @click="localSearchQuery = ''">
        <span class="text-blue-600 dark:text-blue-400">My Quick Buy</span> 
      </div>
      
      <div class="w-full md:w-1/3 lg:w-1/2 relative">
        <input 
          v-model="localSearchQuery"
          type="text" 
          placeholder="Search for products..." 
          class="w-full px-4 py-2 rounded-xl text-slate-900 bg-slate-100 dark:bg-white border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all pl-10"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div class="flex items-center gap-4 md:gap-6">
        <button 
          @click="$emit('toggle-theme')" 
          class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Toggle Dark Mode"
        >
          <span v-if="isDark" class="flex items-center justify-center text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
            </svg>
          </span>
          <span v-else class="flex items-center justify-center text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </span>
        </button>

        <button 
          @click="$emit('open-cart')" 
          class="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-slate-600 dark:text-white group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          <span 
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-slate-950"
          >
            {{ cartCount }}
          </span>
        </button>

        <div class="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hidden md:block"></div>
      </div>
    </div>
  </nav>
</template>