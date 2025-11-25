<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

    <!-- COMPACT HEADER WITH BACK BUTTON -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Back Button -->
        <button
          @click="$router.push('/products')"
          class=" flex px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition "
        >
          <ArrowLeftIcon class="w-5 h-5" />
          <span class="hidden sm:inline">Back to Products</span>
        </button>
      </div>
    </div>

    <!-- MAIN FORM CARD -->
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 max-w-4xl mx-auto">

      <!-- PAGE HEADER INSIDE CARD -->
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p class="text-sm sm:text-base text-gray-600">Enter the details below to add a new item to your inventory.</p>
      </div>

      <!-- PRODUCT INFORMATION -->
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Product Information</h2>

      <!-- Product Title -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Enter product title"
          class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      <!-- Product Description -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Provide a detailed description of the product"
          class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        ></textarea>
      </div>

      <!-- PRICING & INVENTORY -->
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            v-model.number="form.price"
            placeholder="$ 0.00"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <!-- Stock Quantity -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
          <input
            type="number"
            v-model.number="form.stock"
            placeholder="Enter stock quantity"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Category -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          v-model="form.category"
          class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          <option value="">Select a category</option>
          <option value="apparel">Apparel</option>
          <option value="electronics">Electronics</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      <!-- MEDIA -->
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Media</h2>

      <!-- Upload area -->
      <div
        class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <!-- Solid background upload icon with primary color -->
        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
          <ArrowUpTrayIcon class="w-6 h-6 text-white" />
        </div>

        <p class="text-blue-700 font-medium text-sm">Click to upload</p>
        <p class="text-gray-500 text-xs mt-1">or drag and drop</p>
        <p class="text-gray-400 text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 800×400px)</p>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          @click="$router.push('/products')"
          class="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          @click="handleSubmit"
          :disabled="loading"
          class="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <span v-if="loading">Saving...</span>
          <span v-else>Save Product</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "../stores/products";
import { ArrowLeftIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const productStore = useProductsStore();

const form = ref({
  title: "",
  description: "",
  category: "",
  price: 0,
  stock: 0,
  thumbnail: "",
});

const loading = ref(false);
const error = ref("");

const handleImageError = (event) => {
  event.target.style.display = "none";
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";

  try {
    const result = await productStore.addProduct(form.value);

    if (result.success) {
      router.push("/products");
    } else {
      error.value = result.error;
    }
  } catch (err) {
    error.value = "Failed to add product";
  } finally {
    loading.value = false;
  }
};
</script>