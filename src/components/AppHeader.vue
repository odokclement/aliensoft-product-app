<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <h1 class="text-xl font-bold primary-color">Platform Logo</h1>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center space-x-4">
          <router-link
            to="/products"
            class="text-gray-700 hover:text-primary transition-colors"
            active-class="text-primary font-medium"
          >
            Products
          </router-link>
          <button
            @click="handleLogout"
            class="text-gray-700 hover:text-primary transition-colors"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
