<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <!-- MAIN CONTENT -->
      <main class="flex-1">
        <!-- TOP HEADER BAR -->
        <div class="bg-white border-b border-gray-200 px-8 py-4">
          <div class="flex items-center justify-between">
            <!-- LEFT SIDE: Logo + Title -->
            <div class="flex items-center gap-3">
              <!-- App Icon -->
              <div class="grid grid-cols-2 gap-0.5">
                <div class="w-3.5 h-3.5 bg-blue-900 rounded"></div>
                <div class="w-3.5 h-3.5 bg-blue-900 rounded"></div>
                <div class="w-3.5 h-3.5 bg-blue-900 rounded"></div>
                <div class="w-3.5 h-3.5 bg-blue-900 rounded"></div>
              </div>
              <span class="text-lg font-semibold text-gray-900">
                Product Management
              </span>
            </div>

            <!-- RIGHT SIDE -->
            <div class="flex items-center gap-4">
              <!-- Search Box -->
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search"
                  class="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 bg-gray-100 text-gray-600 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <!-- Add Product Button -->
              <button
                @click="$router.push('/products/new')"
                class="px-4 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition"
              >
                Add Product
              </button>

              <!-- Notification Bell -->
              <button class="p-2 rounded-lg hover:bg-gray-100 transition">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <!-- User Avatar -->
              <div class="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center border">
                <span class="text-sm font-medium text-gray-600">U</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-8">
          <!-- BREADCRUMB -->
          <nav class="mb-6">
            <ol class="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <router-link to="/products" class="hover:text-primary">
                  Products
                </router-link>
              </li>
              <li class="flex items-center">
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <li class="text-gray-900 font-medium">{{ product?.title }}</li>
            </ol>
          </nav>

          <!-- LOADING -->
          <div v-if="productStore.isLoading" class="text-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
            ></div>
            <p class="mt-4 text-gray-600">Loading product details...</p>
          </div>

          <!-- ERROR -->
          <div
            v-else-if="productStore.error"
            class="text-center py-12 text-red-600"
          >
            {{ productStore.error }}
          </div>

          <!-- PRODUCT CONTENT -->
          <div
            v-else-if="product"
            class="bg-white rounded-lg border border-gray-200 p-8"
          >
            <!-- Product Layout - Image on left, title/description on right -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <!-- LEFT COLUMN - Product Image -->
              <div class="flex justify-center">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-full max-w-md h-96 object-cover rounded-lg"
                >
              </div>

              <!-- RIGHT COLUMN - Product Title, Description and Details -->
              <div class="space-y-6">
                <!-- Title and Description -->
                <div>
                  <h1 class="text-3xl font-bold text-gray-900 mb-3">
                    {{ product.title }}
                  </h1>
                  <p class="text-gray-600 text-lg mb-6">
                    {{ product.description }}
                  </p>
                  <button
                    @click="handleEdit"
                    class="inline-flex items-center gap-2 px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-50 transition-colors"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Edit Product
                  </button>
                </div>

                <!-- Price and Category Table -->
                <div>
                  <table class="w-full border-collapse">
                    <thead>
                      <tr>
                        <th class="text-left text-sm font-medium text-gray-500 pb-2">Price</th>
                        <th class="text-left text-sm font-medium text-gray-500 pb-2">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-2xl font-bold text-gray-900 py-2">${{ product.price }}</td>
                        <td class="text-lg text-gray-700 capitalize py-2">{{ product.category }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Stock -->
                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-2">Stock</h3>
                  <div class="flex items-center gap-4">
                    <span class="text-lg font-medium text-green-600">In Stock</span>
                    <span class="text-lg text-gray-700">{{ product.stock }} units</span>
                  </div>
                </div>

                <!-- Horizontal Line -->
                <div class="border-t border-gray-200 my-6"></div>

                <!-- Description -->
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-4">Description</h3>
                  <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
                </div>
              </div>
            </div>

            <!-- REVIEWS -->
            <div class="border-t border-gray-200 pt-10">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Customer Reviews
              </h2>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <!-- Rating Summary -->
                <div class="text-center">
                  <div class="text-5xl font-bold text-gray-900 mb-2">
                    {{ product.rating }}
                  </div>

                  <div class="flex justify-center mb-2">
                    <div class="flex">
                      <span
                        v-for="n in 5"
                        :key="n"
                        class="text-yellow-400 text-xl"
                      >
                        <svg
                          :class="[
                            'h-6 w-6',
                            n <= Math.floor(product.rating) ? 'fill-current' :
                            n === Math.ceil(product.rating) && product.rating % 1 !== 0 ? 'fill-current opacity-50' :
                            'fill-none stroke-current'
                          ]"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div class="text-sm text-gray-600">Based on {{ Math.floor(product.rating * 24) }} reviews</div>
                </div>

                <!-- Rating Breakdown -->
                <div class="lg:col-span-2">
                  <div class="space-y-2">
                    <!-- 5 Stars -->
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-600 w-4">5</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          style="width: 75%"
                        ></div>
                      </div>
                      <span class="text-sm text-gray-600 w-8">75%</span>
                    </div>
                    <!-- 4 Stars -->
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-600 w-4">4</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          style="width: 15%"
                        ></div>
                      </div>
                      <span class="text-sm text-gray-600 w-8">15%</span>
                    </div>
                    <!-- 3 Stars -->
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-600 w-4">3</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          style="width: 5%"
                        ></div>
                      </div>
                      <span class="text-sm text-gray-600 w-8">5%</span>
                    </div>
                    <!-- 2 Stars -->
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-600 w-4">2</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          style="width: 3%"
                        ></div>
                      </div>
                      <span class="text-sm text-gray-600 w-8">3%</span>
                    </div>
                    <!-- 1 Star -->
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-600 w-4">1</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          style="width: 2%"
                        ></div>
                      </div>
                      <span class="text-sm text-gray-600 w-8">2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ACTIONS -->
            <div class="flex gap-4 pt-10 mt-10 border-t border-gray-200">
              <button
                @click="$router.back()"
                class="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Back to Products
              </button>

              <button
                @click="handleDelete"
                class="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "../stores/products";

const route = useRoute();
const router = useRouter();
const productStore = useProductsStore();

const productId = computed(() => route.params.id);
const product = computed(() => productStore.currentProduct);

const handleEdit = () => {
  // Navigate to edit page
  router.push(`/products/${productId.value}/edit`);
};

const handleDelete = async () => {
  if (confirm("Are you sure you want to delete this product?")) {
    const result = await productStore.deleteProduct(productId.value);

    if (result.success) {
      router.push("/products");
    } else {
      alert("Failed to delete product: " + result.error);
    }
  }
};

onMounted(() => {
  productStore.fetchProductById(productId.value);
});
</script>