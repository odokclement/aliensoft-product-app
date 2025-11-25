import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: "/aliensoft-product-app/",
  plugins: [vue()],
  server: {
    port: 3000,
  },
})
