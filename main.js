import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 杨阳花生壳
// Vue.prototype.$baseUrl = 'http://2p7173d335.zicp.vip:41065/api'
// //王林花生壳
Vue.prototype.$baseUrl = 'http://27173347hq.wicp.vip:17583/api'
// Vue.prototype.$baseUrl ='http://116.62.227.32:8080/api'
 // Vue.prototype.$baseUrl = 'http://localhost:8080/api'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
