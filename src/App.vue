<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Only show sidebar when authenticated, not on login page, and not on view product page -->
    <div
      v-if="
        authStore.isAuthenticated &&
        $route.path !== '/login' &&
        !$route.path.startsWith('/products/')
      "
      class="flex"
    >
      <Sidebar />
      <main class="flex-1">
        <router-view />
      </main>
    </div>
    <!-- Full page for login, view product, and other non-authenticated pages -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth";
import Sidebar from "./components/Sidebar.vue";

const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  authStore.restoreSession();
});

// Optional: Watch for route changes to handle sidebar visibility
watch(
  () => route.path,
  (newPath) => {
    // You can add additional logic here if needed
    console.log("Route changed to:", newPath);
  }
);
</script>
