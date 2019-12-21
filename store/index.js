import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		login: false,
		openid: null,
		testvuex: false,
		loginProvider: "",
		colorIndex: 0,
		colorList: ['#FF0000','#00FF00','#0000FF']
	},
	mutations: {
		login(state,provider) {
			console.log(state)
			state.login = true;
			state.loginProvider = provider;
			console.log(provider)
		},
		logout(state) {
			state.login = false;
			state.openid = null;
		},
		setOpenid(state,openid) {
			state.openid = openid
		},
		setTestTrue(state) {
			state.testvuex = true
		},
		setTestFalse(state) {
			state.testvuex = false
		},
		setColorIndex(state,index) {
			state.colorIndex = index
		}
	},
	getter:{
		currentColor(state) {
			return state.colorList[state.colorIndex]
		}
	},
	actions: {
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve,reject) => {
				if(state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function (){
								// 模拟异步请求服务器获取openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid +']');
								commit('setOpenid',openid)
								resolve(openid)
							},1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败,将无法长长使用开放接口等服务',err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store