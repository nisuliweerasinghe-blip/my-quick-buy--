<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import ProductCard from './components/ProductCard.vue';
import CartModal from './components/CartModal.vue'; // Day 6 New Import
import { getProducts, getCategories } from './services/productService';
import type { Product } from './types/product';

// --- State Management ---
const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const isLoading = ref(true);
const isCartOpen = ref(false); // Day 6 New State

// --- Data Fetching ---
onMounted(async () => {
  try {
    const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
    products.value = prodData;
    categories.value = catData;
  } finally {
    isLoading.value = false;
  }
});

// --- Logic ---
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
    <Navbar 
      @search="(q) => searchQuery = q" 
      @open-cart="isCartOpen = true" 
    />
    
    <CartModal v-if="isCartOpen" @close="isCartOpen = false" />
    
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

        <div v-else class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <h3 class="text-xl font-bold text-slate-800">No products found</h3>
          <button @click="searchQuery = ''; selectedCategory = ''" class="mt-4 text-blue-600 font-semibold hover:underline">
            Clear all filters
          </button>
        </div>
      </div>
    </main>
  </div>
</template>