import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

library.add(fas)
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon).component('vue-date-picker', VueDatePicker)

app.use(router)

app.mount('#app')
