// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App'
import router from './router'

import '../node_modules/jquery/src/jquery'
import '../node_modules/popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap'

Vue.component('Loading', Loading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
