import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import AmplifyVue from '@aws-amplify/ui-vue'

library.add(fas)
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(AmplifyVue)
app.use(router)

app.mount('#app')
