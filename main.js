import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'http://b2722934f3.wicp.vip:13701/api'
  // Vue.prototype.$baseUrl = 'http://localhost:8080/api'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
