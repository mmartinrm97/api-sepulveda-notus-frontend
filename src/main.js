import { createApp } from 'vue'

import { createPinia } from "pinia";
import router from './routes/router'

//styles
import "@fortawesome/fontawesome-free/css/all.min.css"
import './assets/styles/index.css'

//GridJs

import App from './App.vue'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')



