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

// Powerful Filtering Logic
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

        <div v-else class="text-center py-20 bg-white rounded-xl shadow-sm">
          <p class="text-gray-500 text-xl">No products match your criteria.</p>
        </div>
      </div>
    </main>
  </div>
</template>