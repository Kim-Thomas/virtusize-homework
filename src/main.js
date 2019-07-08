import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSocks, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faUserSecret, faSocks, faQuestionCircle, faSignOutAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
