import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.config.globalProperties.$window = window
app.config.globalProperties.$circle = 50
app.mount('#app')
