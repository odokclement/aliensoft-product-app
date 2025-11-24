import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)


// restore auth session early so router guards can use it
import { useAuthStore } from './stores/auth'
const auth = useAuthStore(pinia)
auth.restoreSession()


app.mount('#app')
