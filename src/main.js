/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-inner-declarations */

// Vue imports
import { createApp } from 'vue'
import App from './App.vue'






import routes from './routes/routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'



createApp(App).use(routes).mount('#app')