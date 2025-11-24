<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Simple layout with sidebar and main content -->
    <div class="flex">
      <!-- Sidebar -->
      
      <!-- Main Content -->
      <main class="flex-1 p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Products</h1>
          <p class="text-gray-600">Manage your inventory and view product performance.</p>
        </div>

        <!-- Search and Filter Bar - Exactly like mockup -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <!-- Search -->
            <div class="relative flex-1 sm:flex-initial">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by product name..."
                class="w-full sm:w-64 pl-4 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                @input="handleSearch"
              >
            </div>

            <!-- Category Filter -->
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              @change="handleFilter"
            >
              <option value="">Category</option>
              <option v-for="category in productStore.categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>

            <!-- Stock Status Filter -->
            <select
              v-model="selectedStock"
              class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              @change="handleFilter"
            >
              <option value="">Stock Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          <!-- Add New Product Button -->
          <button
            @click="$router.push('/products/new')"
            class="btn-primary whitespace-nowrap flex items-center gap-2 px-4 py-2"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Product
          </button>
        </div>

        <!-- Products Table - Exactly like mockup -->
        <div class="bg-white rounded border border-gray-200 overflow-hidden">
          <!-- Table Header -->
          <div class="grid grid-cols-4 bg-gray-50 border-b border-gray-200 px-6 py-3 gap-4">
            <div class="text-sm font-medium text-gray-500 uppercase">Product</div>
            <div class="text-sm font-medium text-gray-500 uppercase">Category</div>
            <div class="text-sm font-medium text-gray-500 uppercase">Price</div>
            <div class="text-sm font-medium text-gray-500 uppercase">Stock</div>
          </div>

          <!-- Loading State -->
          <div v-if="productStore.isLoading" class="p-8 text-center">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <p class="mt-2 text-sm text-gray-600">Loading products...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="productStore.error" class="p-8 text-center text-red-600 text-sm">
            {{ productStore.error }}
          </div>

          <!-- Products List -->
          <div v-else>
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="grid grid-cols-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors gap-4"
              @click="$router.push(`/products/${product.id}`)"
            >
              <!-- Product Column -->
              <div class="flex items-start space-x-3">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="h-10 w-10 rounded object-cover flex-shrink-0"
                >
                <div class="min-w-0 flex-1">
                  <div class="text-sm font-medium text-gray-900 mb-1">
                    {{ product.title }}
                  </div>
                  <div class="text-xs text-gray-500 line-clamp-2">
                    {{ product.description }}
                  </div>
                </div>
              </div>

              <!-- Category Column -->
              <div class="flex items-center">
                <span
                  class="text-xs font-medium px-3 py-1 rounded-full capitalize"
                  :class="getCategoryStyle(product.category)"
                >
                  {{ product.category }}
                </span>
              </div>

              <!-- Price Column -->
              <div class="text-sm font-medium text-gray-900 flex items-center">
                ${{ product.price }}
              </div>

              <!-- Stock Column -->
              <div class="flex items-center gap-2">
                <!-- Status Circle -->
                <div
                  class="h-3 w-3 rounded-full flex-shrink-0"
                  :class="getStockCircleColor(product.stock)"
                ></div>
                <!-- Stock Text -->
                <span class="text-sm font-medium">
                  {{ getStockDisplayText(product.stock) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!productStore.isLoading && filteredProducts.length === 0" class="p-8 text-center text-gray-500 text-sm">
            No products found matching your criteria.
          </div>
        </div>

        <!-- Pagination - Exactly like mockup -->
        <div class="mt-4 text-sm text-gray-600">
          Showing {{ filteredProducts.length }} of {{ productStore.products.length }} results
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'

const router = useRouter()
const productStore = useProductsStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStock = ref('')
let searchTimeout = null

// Category color mapping - same category = same color
const categoryColors = {
  'smartphones': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'laptops': { bg: 'bg-green-100', text: 'text-green-800' },
  'fragrances': { bg: 'bg-purple-100', text: 'text-purple-800' },
  'skincare': { bg: 'bg-pink-100', text: 'text-pink-800' },
  'groceries': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'home-decoration': { bg: 'bg-orange-100', text: 'text-orange-800' },
  'furniture': { bg: 'bg-brown-100', text: 'text-brown-800' },
  'tops': { bg: 'bg-red-100', text: 'text-red-800' },
  'womens-dresses': { bg: 'bg-pink-100', text: 'text-pink-800' },
  'womens-shoes': { bg: 'bg-purple-100', text: 'text-purple-800' },
  'mens-shirts': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'mens-shoes': { bg: 'bg-gray-100', text: 'text-gray-800' },
  'mens-watches': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  'womens-watches': { bg: 'bg-rose-100', text: 'text-rose-800' },
  'womens-bags': { bg: 'bg-amber-100', text: 'text-amber-800' },
  'womens-jewellery': { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  'sunglasses': { bg: 'bg-cyan-100', text: 'text-cyan-800' },
  'automotive': { bg: 'bg-slate-100', text: 'text-slate-800' },
  'motorcycle': { bg: 'bg-stone-100', text: 'text-stone-800' },
  'lighting': { bg: 'bg-yellow-100', text: 'text-yellow-800' }
}

// Default color for unknown categories
const defaultCategoryStyle = { bg: 'bg-gray-100', text: 'text-gray-800' }

// Get category style based on category name
const getCategoryStyle = (category) => {
  const style = categoryColors[category] || defaultCategoryStyle
  return `${style.bg} ${style.text}`
}

// Get stock circle color
const getStockCircleColor = (stock) => {
  if (stock === 0) {
    return 'bg-red-500' // Red for out of stock
  } else if (stock <= 50) {
    return 'bg-yellow-500' // Yellow for low stock
  } else {
    return 'bg-green-500' // Green for in stock
  }
}

// Get stock display text
const getStockDisplayText = (stock) => {
  if (stock === 0) {
    return 'Out of Stock'
  } else if (stock <= 50) {
    return `${stock} Low Stock`
  } else {
    return `${stock} in Stock`
  }
}

// Simple debounce implementation
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    productStore.fetchProducts(searchQuery.value)
  }, 300)
}

const handleFilter = () => {
  productStore.fetchProducts(searchQuery.value)
}

// Filter products based on stock status
const filteredProducts = computed(() => {
  let products = productStore.products

  if (selectedStock.value === 'in_stock') {
    products = products.filter(product => product.stock > 50)
  } else if (selectedStock.value === 'low_stock') {
    products = products.filter(product => product.stock > 0 && product.stock <= 50)
  } else if (selectedStock.value === 'out_of_stock') {
    products = products.filter(product => product.stock === 0)
  }

  if (selectedCategory.value) {
    products = products.filter(product => product.category === selectedCategory.value)
  }

  return products
})

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom brown color for furniture category */
.bg-brown-100 { background-color: #f7f3f0; }
.text-brown-800 { color: #5d4037; }

/* Ensure equal column spacing */
.grid-cols-4 > * {
  min-width: 0; /* Prevent content from breaking layout */
}
</style>