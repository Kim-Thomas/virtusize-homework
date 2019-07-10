import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
// Font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSocks, faQuestionCircle, faSignOutAlt, faPen, faEye, faEyeSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Vue Toasted
import Toasted from 'vue-toasted'
let toasted_options = {
  theme: 'bubble',
  position: 'bottom-right',
  duration: 3000
}
Vue.use(Toasted, toasted_options)

library.add(faUserSecret, faSocks, faQuestionCircle, faSignOutAlt, faPen, faEye, faEyeSlash, faCheckCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

window.$ = window.jQuery = require('jquery')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
