// src/stores/products.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const currentProduct = ref(null)
  
  const authStore = useAuthStore()
  
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${authStore.token}`
  })
  
  const fetchProducts = async (search = '', category = '') => {
    isLoading.value = true
    error.value = null
    
    try {
      let url = 'https://dummyjson.com/products'
      const params = new URLSearchParams()
      
      if (search) params.append('q', search)
      if (category) params.append('category', category)
      
      if (params.toString()) {
        url += `/search?${params.toString()}`
      }
      
      const response = await axios.get(url, {
        headers: getAuthHeaders()
      })
      
      products.value = response.data.products
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch products'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  const fetchProductById = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`, {
        headers: getAuthHeaders()
      })
      
      currentProduct.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch product'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  const addProduct = async (productData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.post('https://dummyjson.com/products/add', productData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        }
      })
      
      products.value.unshift(response.data)
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to add product'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  const updateProduct = async (id, productData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.put(`https://dummyjson.com/products/${id}`, productData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        }
      })
      
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
      
      if (currentProduct.value && currentProduct.value.id === id) {
        currentProduct.value = response.data
      }
      
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update product'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  const deleteProduct = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`, {
        headers: getAuthHeaders()
      })
      
      products.value = products.value.filter(p => p.id !== id)
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete product'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  const categories = computed(() => {
    const allCategories = products.value.map(p => p.category)
    return [...new Set(allCategories)]
  })
  
  return {
    products,
    isLoading,
    error,
    currentProduct,
    categories,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct
  }
})