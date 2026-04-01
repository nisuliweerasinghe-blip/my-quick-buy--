<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import ProductCard from './components/ProductCard.vue';
import { ref } from 'vue';
import type { Product } from './types/product';

// Mock data for Day 2 to test the design
const testProduct = ref<Product>({
  id: 1,
  title: "Test Product",
  description: "This is a sample description to test the card layout.",
  price: 99.99,
  thumbnail: "https://via.placeholder.com/150",
  category: "test",
  brand: "test-brand",
  images: [],
  rating: 4.5,
  stock: 10
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main class="max-w-7xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Featured Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard :product="testProduct" />
      </div>
    </main>
  </div>
</template>