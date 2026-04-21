<script setup lang="ts">
// Requirement 2: No "Any" - Using strict TypeScript
import ProductCard from './ProductCard.vue';
import type { Product } from '../types/product';

// Requirement: Define props strictly
interface Props {
  products: Product[];
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <ProductCard 
      v-for="product in products" 
      :key="product.id" 
      :product="product" 
    />
  </div>
</template>

<style scoped>
/* Optional: Adds a smooth fade-in effect when items are filtered */
.grid {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>