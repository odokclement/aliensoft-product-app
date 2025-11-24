<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
      <p class="text-gray-600">Create a new product in your inventory.</p>
    </div>

    <!-- Product Form -->
    <div class="max-w-2xl">
      <form
        @submit.prevent="handleSubmit"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <!-- Form Fields -->
        <div class="space-y-6">
          <!-- Title -->
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Title *
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter product title"
            />
          </div>

          <!-- Description -->
          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter product description"
            />
          </div>

          <!-- Category -->
          <div>
            <label
              for="category"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Category *
            </label>
            <input
              id="category"
              v-model="form.category"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter product category"
            />
          </div>

          <!-- Price and Stock -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="price"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Price *
              </label>
              <input
                id="price"
                v-model.number="form.price"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                for="stock"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Stock *
              </label>
              <input
                id="stock"
                v-model.number="form.stock"
                type="number"
                min="0"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="0"
              />
            </div>
          </div>

          <!-- Thumbnail URL -->
          <div>
            <label
              for="thumbnail"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Thumbnail URL
            </label>
            <input
              id="thumbnail"
              v-model="form.thumbnail"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <!-- Preview -->
          <div v-if="form.thumbnail" class="border rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">
              Thumbnail Preview
            </h3>
            <img
              :src="form.thumbnail"
              alt="Thumbnail preview"
              class="h-32 w-32 object-cover rounded"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-4 pt-6 mt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Adding Product...</span>
            <span v-else>Add Product</span>
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 text-red-600 text-sm">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "../stores/products";

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
