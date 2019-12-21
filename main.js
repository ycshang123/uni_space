import Vue from 'vue'
import App from './App'
import store from './store'
import sunUiBasic from './components/sunui-upimg/sunui-upimg-basic.vue'
import sunUiOos from './components/sunui-upimg/sunui-upimg-alioos.vue'
import sunUiCos from './components/sunui-upimg/sunui-upimg-tencent.vue'
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'http://localhost:8080/api'


Vue.component('sunui-upbasic',sunUiBasic)
Vue.component('sunui-upoos',sunUiOos)


App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
