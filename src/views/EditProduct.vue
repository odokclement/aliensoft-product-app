<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

    <!-- COMPACT HEADER WITH BACK BUTTON -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Back Button -->
        <button
          @click="$router.push('/products')"
          class="flex px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition "
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
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Edit Product</h1>
        <p class="text-sm sm:text-base text-gray-600">Update the product details below.</p>
        
        <!-- Product ID Display -->
        <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <TagIcon class="w-4 h-4" />
          <span>Product ID: {{ productId }}</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !form.title" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-2 text-gray-600">Loading product data...</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-700 text-sm">{{ error }}</p>
      </div>

      <!-- FORM CONTENT (only show when data is loaded) -->
      <div v-if="!loading || form.title">
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
            :class="{ 'border-red-300': errors.title }"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
        </div>

        <!-- Product Description -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Provide a detailed description of the product"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            :class="{ 'border-red-300': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        </div>

        <!-- PRICING & INVENTORY -->
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                v-model.number="form.price"
                placeholder="0.00"
                step="0.01"
                min="0"
                class="w-full bg-white border border-gray-300 rounded-lg pl-7 pr-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                :class="{ 'border-red-300': errors.price }"
              />
            </div>
            <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
          </div>

          <!-- Stock Quantity -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              v-model.number="form.stock"
              placeholder="Enter stock quantity"
              min="0"
              class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              :class="{ 'border-red-300': errors.stock }"
            />
            <p v-if="errors.stock" class="mt-1 text-sm text-red-600">{{ errors.stock }}</p>
          </div>
        </div>

        <!-- Category -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            v-model="form.category"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            :class="{ 'border-red-300': errors.category }"
          >
            <option value="">Select a category</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
            <option value="groceries">Groceries</option>
            <option value="home-decoration">Home Decoration</option>
          </select>
          <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
        </div>

        <!-- Brand -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            v-model="form.brand"
            type="text"
            placeholder="Enter brand name"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <!-- Rating -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <input
            type="number"
            v-model.number="form.rating"
            placeholder="0.0"
            step="0.1"
            min="0"
            max="5"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <!-- Discount Percentage -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
          <input
            type="number"
            v-model.number="form.discountPercentage"
            placeholder="0%"
            step="0.1"
            min="0"
            max="100"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <!-- Status -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="form.availability"
                value="in stock"
                class="text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">In Stock</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="form.availability"
                value="out of stock"
                class="text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">Out of Stock</span>
            </label>
          </div>
        </div>

        <!-- MEDIA -->
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Media</h2>

        <!-- Current Image Preview -->
        <div v-if="form.thumbnail" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Current Image</label>
          <div class="flex items-center gap-4">
            <img 
              :src="form.thumbnail" 
              alt="Product thumbnail" 
              class="w-20 h-20 object-cover rounded-lg border border-gray-200"
              @error="handleImageError"
            />
            <button
              @click="removeImage"
              class="px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              Remove Image
            </button>
          </div>
        </div>

        <!-- Upload area -->
        <div
          @click="triggerFileInput"
          class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <!-- Solid background upload icon with primary color -->
          <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
            <ArrowUpTrayIcon class="w-6 h-6 text-white" />
          </div>

          <p class="text-blue-700 font-medium text-sm">Click to upload</p>
          <p class="text-gray-500 text-xs mt-1">or drag and drop</p>
          <p class="text-gray-400 text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 800×400px)</p>
          
          <!-- Hidden file input -->
          <input
            ref="fileInput"
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            class="hidden"
          />
        </div>

        <!-- Selected file info -->
        <div v-if="selectedFile" class="mt-3 p-3 bg-blue-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <DocumentIcon class="w-4 h-4 text-blue-600" />
              <span class="text-sm text-blue-700">{{ selectedFile.name }}</span>
            </div>
            <button
              @click="removeSelectedFile"
              class="text-blue-600 hover:text-blue-800"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <!-- Delete Button -->
          <button
            @click="handleDelete"
            :disabled="loading"
            class="px-5 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
          >
            <span v-if="loading">Deleting...</span>
            <span v-else>Delete Product</span>
          </button>

          <div class="flex gap-4">
            <button
              @click="$router.push('/products')"
              class="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              @click="handleSubmit"
              :disabled="loading"
              class="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              <CheckIcon v-if="!loading" class="w-4 h-4" />
              <span v-if="loading">Updating...</span>
              <span v-else>Update Product</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductsStore } from "../stores/products";
import { 
  ArrowLeftIcon, 
  ArrowUpTrayIcon, 
  TagIcon, 
  DocumentIcon, 
  XMarkIcon,
  CheckIcon 
} from '@heroicons/vue/24/solid';

const router = useRouter();
const route = useRoute();
const productStore = useProductsStore();

const productId = route.params.id;
const fileInput = ref(null);
const selectedFile = ref(null);

// Initialize form with empty values
const form = ref({
  title: "",
  description: "",
  category: "",
  price: 0,
  stock: 0,
  thumbnail: "",
  brand: "",
  rating: 0,
  discountPercentage: 0,
  availability: "in stock"
});

const loading = ref(false);
const error = ref("");
const errors = ref({});

// Fetch product data when component mounts
onMounted(async () => {
  await fetchProduct();
});

const fetchProduct = async () => {
  try {
    loading.value = true;
    error.value = "";
    
    console.log("Fetching product with ID:", productId);
    
    // Use the fetchProductById function from your store
    const result = await productStore.fetchProductById(productId);
    
    if (result.success && result.data) {
      const product = result.data;
      console.log("Received product data:", product);
      
      // Populate form with product data from DummyJSON API
      form.value = {
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || 0,
        stock: product.stock || 0,
        thumbnail: product.thumbnail || "",
        brand: product.brand || "",
        rating: product.rating || 0,
        discountPercentage: product.discountPercentage || 0,
        availability: product.stock > 0 ? "in stock" : "out of stock"
      };
      console.log("Form populated with:", form.value);
    } else {
      error.value = result.error || "Product not found";
    }
  } catch (err) {
    error.value = "Failed to load product data";
    console.error("Error fetching product:", err);
  } finally {
    loading.value = false;
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    // Create a local URL for preview
    form.value.thumbnail = URL.createObjectURL(file);
  }
};

const removeSelectedFile = () => {
  selectedFile.value = null;
  fileInput.value.value = "";
  // Don't reset thumbnail here as it might be the existing image
};

const removeImage = () => {
  form.value.thumbnail = "";
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const handleImageError = (event) => {
  event.target.style.display = "none";
};

const validateForm = () => {
  errors.value = {};
  
  if (!form.value.title.trim()) {
    errors.value.title = "Product title is required";
  }
  
  if (!form.value.description.trim()) {
    errors.value.description = "Product description is required";
  }
  
  if (form.value.price <= 0) {
    errors.value.price = "Price must be greater than 0";
  }
  
  if (form.value.stock < 0) {
    errors.value.stock = "Stock quantity cannot be negative";
  }
  
  if (!form.value.category) {
    errors.value.category = "Category is required";
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    console.log("Updating product with data:", form.value);
    
    // You'll need to create an updateProduct function in your store
    const result = await productStore.updateProduct(productId, form.value);

    if (result.success) {
      router.push("/products");
    } else {
      error.value = result.error || "Failed to update product";
    }
  } catch (err) {
    error.value = "Failed to update product";
    console.error("Error updating product:", err);
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    // You'll need to create a deleteProduct function in your store
    const result = await productStore.deleteProduct(productId);

    if (result.success) {
      router.push("/products");
    } else {
      error.value = result.error || "Failed to delete product";
    }
  } catch (err) {
    error.value = "Failed to delete product";
    console.error("Error deleting product:", err);
  } finally {
    loading.value = false;
  }
};
</script>