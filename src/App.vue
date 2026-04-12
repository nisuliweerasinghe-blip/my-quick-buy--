<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue'; // New Import
import ProductCard from './components/ProductCard.vue';
import { getProducts, getCategories } from './services/productService';
import type { Product } from './types/product';

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const isLoading = ref(true);

onMounted(async () => {
  try {
    const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
    products.value = prodData;
    categories.value = catData;
  } finally {
    isLoading.value = false;
  }
});

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === '' || p.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar @search="(q) => searchQuery = q" />
    
    <main class="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      <Sidebar 
        :categories="categories" 
        :selectedCategory="selectedCategory"
        @select-category="(c) => selectedCategory = c"
      />

      <div class="flex-1">
        <div v-if="isLoading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <div v-else-if="filteredProducts.length > 0" 
             class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
        </div>

        <div v-else class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
          <div class="bg-slate-100 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-800">No products found</h3>
          <p class="text-slate-500">Try adjusting your search or category filters.</p>
          <button @click="searchQuery = ''; selectedCategory = ''" class="mt-4 text-blue-600 font-semibold hover:underline">
            Clear all filters
          </button>
        </div>
      </div> </main>
  </div>
</template>