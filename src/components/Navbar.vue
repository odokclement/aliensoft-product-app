<template>
  <header
    class="bg-gray-50 px-8 py-6 flex items-center justify-between border-b"
  >
    <div class="text-2xl font-bold">Product Management</div>
    <div class="flex items-center gap-4">
      <input v-model="q" placeholder="Search" class="input-base w-80" />
      <router-link
        to="/products/new"
        class="ml-4 px-4 py-2 rounded-md bg-[var(--primary)] text-white"
        >Add Product</router-link
      >
      <div
        class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"
      >
        U
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
const q = ref("");
// simple local value to show the search box in navbar; actual page search implemented within Products page.
</script>
