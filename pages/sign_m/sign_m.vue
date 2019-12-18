<template>
	<view class="container">
		<view class="sy-input-box box-height-c">
			<label>{{ mobileTip }}</label>
			<input type="text" class="sy-input" placeholder="手机号" maxlength="11" v-model="queryDto.name" @focus="clearTip()" />
			<view class="group-row-center">
				<input type="text" class="sy-input-small" placeholder="验证码" maxlength="6" v-model="queryDto.verifyCode" required="required" />
				<button class="btn" @tap="checkPhone()" :disabled="status">{{ codeBtn.text }}</button>
			</view>
			<view class="group-row-between title-sub">
				<navigator url="/pages/sign_a/sign_a"><text class="title-sub">其他方式登录</text></navigator>
				<navigator url="/pages/register/register"><text>还没账号去注册</text></navigator>
			</view>
		</view>
		<button class="btn-big" @tap="signIn(queryDto)" >登录</button>
	</view>
</template>

<script>
var codes;
var mymobile;
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
export default {
	comments: {
		uniCountdown
	},
	data() {
		return {
			seconds: 60,
			codeBtn: {
				text: '获取验证码',
				count: this.seconds
			},
			mobileTip: '',
			queryDto:{
				name:'',
				password:''	
			},
			LoginStatus: true,
			status: false
		};
	},
	methods: {
		sendCode: function() {
			this.codeBtn.waitingCode = true;
			this.codeBtn.count = this.seconds;
			this.codeBtn.text = this.codeBtn.count + 's';
			let countdown = setInterval(() => {
				this.codeBtn.count--;
				this.codeBtn.text = this.codeBtn.count + 's';
				this.status = true;
				if (this.codeBtn.count < 0) {
					clearInterval(countdown);
					this.codeBtn.text = '重新发送';
					this.status = false;
				}
			}, 1000);
		},
		clearTip() {
			this.mobileTip = '';
			this.status = false;
			this.LoginStatus = false;
		},
	getVerifyCode: function() {
		uni.request({
			url: this.$baseUrl + '/sms',
			method: 'POST',
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			data: {
				mobile: this.queryDto.name
			},
			success: res => {
				console.log(res.data.data);
				if (res.data.code === 1) {
					uni.showToast({
						title: '验证码已发送'
					});
					codes = res.data.code
					mymobile = this.queryDto.name
					this.sendCode()
				} else {
					uni.showToast({
						title: '验证码发送失败'
					});
				}
			}
		});
	},
		signIn(queryDto) {
			if (this.queryDto.name == '' || this.queryDto.verifyCode == '') {
				this.mobileTip = '信息不完备'
			} else {
				uni.request({
					url: this.$baseUrl + '/user/signin',
					method: 'POST',
					header: {
						'content-type': 'application/json'
					},
					data: {
						equalsString: queryDto.name,
						keyWords: queryDto.verifyCode
					},
					success: res => {
						if (res.data.code === 1) {
							uni.showToast({
								title: res.data.msg
							}),
							
							uni.setStorage({
								key:'user',
								data:res.data.data,
								success:function(){
									console.log('success')
								}
							}),
							uni.switchTab({
								url:'/pages/index/index'
							})
							
						} else {
							uni.showModal({
								title: '提示',
								content: res.data.msg
							});
						}
					}
				});
			}
		},
		checkPhone() {
			var phone = this.queryDto.name;
			if (!/^1[3456789]\d{9}$/.test(phone)) {
				this.mobileTip = '手机格式不正确';
				this.status = true;
				this.LoginStatus = true;
			} else {
				this.mobileTip = '';
				this.getVerifyCode();
				this.status = false;
			}
		}
	},
};
</script>

<style scoped>

</style>
