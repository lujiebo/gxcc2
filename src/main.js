import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import uView from "uview-ui";
Vue.use(uView);

import http from 'utils/http.js'
Vue.prototype.http = http

import location from 'utils/location.js'
Vue.prototype.location = location

Vue.prototype.$onLaunched = new Promise(resolve => {
  Vue.prototype.$isResolve = resolve
})

const app = new Vue({
  ...App
})
app.$mount()
