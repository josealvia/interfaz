import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import icons from './fontawesome'

library.add(icons);

createApp(App)
    .component('fa', FontAwesomeIcon)
    .use(store)
    .use(router)
    .mount('#app')
