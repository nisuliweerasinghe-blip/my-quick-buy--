<script setup lang="ts">
defineProps<{
  categories: string[],
  selectedCategory: string
}>();

const emit = defineEmits(['selectCategory']);
</script>

<template>
  <aside class="w-full lg:w-64 bg-white p-6 rounded-xl shadow-sm h-fit">
    <h3 class="font-bold text-slate-800 mb-4 text-lg">Categories</h3>
    <ul class="space-y-2">
      <li>
        <button 
          @click="emit('selectCategory', '')"
          :class="selectedCategory === '' ? 'text-blue-600 font-bold' : 'text-gray-600'"
          class="capitalize hover:text-blue-500 transition text-sm"
        >
          All Products
        </button>
      </li>
      <li v-for="cat in categories" :key="cat">
        <button 
          @click="emit('selectCategory', cat)"
          :class="selectedCategory === cat ? 'text-blue-600 font-bold' : 'text-gray-600'"
          class="capitalize hover:text-blue-500 transition text-sm"
        >
          {{ cat.replace('-', ' ') }}
        </button>
      </li>
    </ul>
  </aside>
</template>