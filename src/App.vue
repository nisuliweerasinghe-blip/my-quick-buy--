<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import ProductCard from './components/ProductCard.vue';
import CartModal from './components/CartModal.vue';
import ProductDetailModal from './components/ProductDetailModal.vue';
import { getProducts, getCategories } from './services/productService';
import type { Product } from './types/product';

// 1. COMPOSABLE (The single source of truth for your cart)
import { useCart } from './composables/useCart';

// --- State Management ---
const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const isLoading = ref(true);

// Modal UI States
const isCartOpen = ref(false);
const isDetailOpen = ref(false);
const selectedProduct = ref<Product | null>(null);

// 2. EXTRACT CART LOGIC (No local 'cart' ref needed here)
const { cart, addToCart } = useCart();

// --- 3. Data Fetching ---
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

// --- 4. Search & Filter Logic ---
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === '' || p.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// --- 5. Event Handlers ---
const openProductDetail = (product: Product) => {
  selectedProduct.value = product;
  isDetailOpen.value = true;
};

// This function now uses the shared composable function
const handleAddToCart = (product: Product) => {
  addToCart(product);
  console.log("Item added! New total items:", cart.value.length);
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    <Navbar 
      :cartCount="cart.length"
      @search="(q) => searchQuery = q" 
      @open-cart="isCartOpen = true" 
    />

    <Transition name="fade">
      <CartModal 
        v-if="isCartOpen" 
        @close="isCartOpen = false" 
      />
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
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0F172A]"></div>
          <p class="mt-4 text-slate-500 font-medium tracking-wide">Loading your store...</p>
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

        <div v-else class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div class="bg-slate-100 p-6 rounded-full mb-4 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-800">No products found</h3>
          <p class="text-slate-500 mt-1">We couldn't find anything matching your filters.</p>
          <button @click="clearFilters" class="mt-6 px-8 py-3 bg-[#0F172A] text-white rounded-xl font-semibold hover:bg-slate-800 transition-all active:scale-95">
            Reset Filters
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
}
</style>