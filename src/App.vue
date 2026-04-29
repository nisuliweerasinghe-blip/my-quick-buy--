<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import ProductCard from './components/ProductCard.vue';
import CartModal from './components/CartModal.vue';
import ProductDetailModal from './components/ProductDetailModal.vue';
import { getProducts, getCategories } from './services/productService';
import type { Product } from './types/product';


import { useCart } from './composables/useCart';
import { useTheme } from './composables/useTheme'; 


const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const isLoading = ref(true);

const isCartOpen = ref(false);
const isDetailOpen = ref(false);
const selectedProduct = ref<Product | null>(null);


const { cartCount, addToCart } = useCart(); 
const { isDark, toggleTheme } = useTheme();


onMounted(async () => {
  try {
    const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
    products.value = prodData;
    categories.value = catData;
  } catch (error) {
    console.error("Error loading application data:", error);
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


const openProductDetail = (product: Product) => {
  selectedProduct.value = product;
  isDetailOpen.value = true;
};

const handleAddToCart = (product: Product) => {

  addToCart(product);
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
};
</script>

<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans antialiased">
    
    <Navbar 
      :cartCount="cartCount" 
      :isDark="isDark"
      @search="(q) => searchQuery = q" 
      @open-cart="isCartOpen = true" 
      @toggle-theme="toggleTheme"
    />

    <Transition name="fade">
      <CartModal v-if="isCartOpen" @close="isCartOpen = false" />
    </Transition>

    <Transition name="fade">
      <ProductDetailModal 
        v-if="isDetailOpen" 
        :product="selectedProduct" 
        @close="isDetailOpen = false"
        @add-to-cart="handleAddToCart"
      />
    </Transition>

    <main class="max-w-[1440px] mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      <aside class="w-full lg:w-72 flex-shrink-0">
        <Sidebar 
          :categories="categories" 
          :selectedCategory="selectedCategory"
          @select-category="(c) => selectedCategory = c"
        />
      </aside>

      <div class="flex-1">
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-32">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 dark:border-white"></div>
          <p class="mt-4 text-slate-500 dark:text-slate-400 font-medium">Loading products...</p>
        </div>

        <div v-else-if="filteredProducts.length > 0" 
             class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <ProductCard 
            v-for="p in filteredProducts" 
            :key="p.id" 
            :product="p" 
            @view-detail="openProductDetail"
            @add-to-cart="handleAddToCart"
          />
        </div>

        <div v-else class="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">No products found</h3>
          <button @click="clearFilters" class="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all active:scale-95">
            Reset Filters
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
html { scroll-behavior: smooth; }
</style>