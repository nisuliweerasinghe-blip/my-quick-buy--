<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import ProductCard from './components/ProductCard.vue';
import { getProducts } from './services/productService';
import type { Product } from './types/product';

const products = ref<Product[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    products.value = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <main class="max-w-7xl mx-auto p-6">
      <h2 class="text-3xl font-bold text-slate-800 mb-8 text-center sm:text-left">
        Trending Products
      </h2>

      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </main>
  </div>
</template>