// src/stores/auth.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("authToken") || "");
  const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

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
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
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

    if (savedToken) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
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
