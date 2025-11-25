// src/stores/auth.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("authToken") || "");
  const user = ref(null);

  // Initialize user from localStorage
  const initUser = () => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        user.value = JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      user.value = null;
    }
  };

  // Initialize on store creation
  initUser();

  const isAuthenticated = computed(() => !!token.value);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        credentials
      );

      token.value = response.data.token;
      user.value = response.data;

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Invalid credentials. Please try again.",
      };
    }
  };

  const logout = () => {
    token.value = "";
    user.value = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const restoreSession = () => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        token.value = savedToken;
        user.value = JSON.parse(savedUser);
      } catch (error) {
        console.error("Error restoring session:", error);
        logout();
      }
    }
  };

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    restoreSession,
  };
});
