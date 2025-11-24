<template>
  <aside class="w-64 bg-white h-screen shadow-md px-6 py-8 sticky top-0 flex flex-col">
    <!-- Logo Section -->
    <div class="mb-8 flex items-center gap-3">
      <div class="h-10 w-10 rounded-full bg-yellow-300 flex items-center justify-center">E</div>
      <div>
        <div class="font-semibold">E-Commerce</div>
        <div class="text-sm text-gray-500">Admin Panel</div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="space-y-2 flex-1">
      <router-link 
        to="/dashboard" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" 
        :class="$route.path === '/dashboard' ? 'bg-gray-100 text-primary' : 'text-gray-700'"
      >
        <HomeIcon class="h-5 w-5 text-gray-700" />
        <span>Dashboard</span>
      </router-link>

      <router-link 
        to="/products" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" 
        :class="$route.path.startsWith('/products') ? 'bg-gray-100 text-primary' : 'text-gray-700'"
      >
        <Squares2X2Icon class="h-5 w-5 text-gray-700" />
        <span>Products</span>
      </router-link>

      <router-link 
        to="/orders" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" 
        :class="$route.path.startsWith('/orders') ? 'bg-gray-100 text-primary' : 'text-gray-700'"
      >
        <ShoppingCartIcon class="h-5 w-5 text-gray-700" />
        <span>Orders</span>
      </router-link>

      <router-link 
        to="/customers" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" 
        :class="$route.path.startsWith('/customers') ? 'bg-gray-100 text-primary' : 'text-gray-700'"
      >
        <UserGroupIcon class="h-5 w-5 text-gray-700" />
        <span>Customers</span>
      </router-link>
    </nav>

    <!-- Bottom Section -->
    <div class="space-y-2 pt-4 border-t border-gray-200">
      <router-link 
        to="/settings" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" 
        :class="$route.path.startsWith('/settings') ? 'bg-gray-100 text-primary' : 'text-gray-700'"
      >
        <Cog6ToothIcon class="h-5 w-5 text-gray-700" />
        <span>Settings</span>
      </router-link>

      <!-- Logout Button - Same color as "Add New Product" -->
      <button 
        @click="logout" 
        class="w-full flex items-center justify-center gap-2 p-3 rounded-lg primary-bg text-white hover:bg-blue-900 transition-colors mt-2"
      >
        <ArrowRightOnRectangleIcon class="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
// Import SOLID icons instead of outline for filled/dark icons
import {
  HomeIcon,
  Squares2X2Icon,
  ShoppingCartIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/solid'  // Changed from '24/outline' to '24/solid'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>