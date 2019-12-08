<template>
	<view class="container">
		<view class="sy-input-box box-height-c">
			<label>{{ mobileTip }}</label>
			<input type="text" class="sy-input" placeholder="手机号" maxlength="11" v-model="userDto.name" required="required" @focus="clearTip()" />
			<view class="group-row-center">
				<input type="text" class="sy-input-small" placeholder="验证码" maxlength="6" v-model="userDto.verifyCode" required="required" />
				<button class="btn" @tap="checkPhone()" :disabled="status">{{codeBtn.text}}</button>
			</view>
			<view class="text-end title-sub">
				<navigator url="/pages/register/register"><text>还没账号去注册</text></navigator>
			</view>
		</view>
		<button class="btn-big" @tap="signIn(userDto)" :disabled="LoginStatus">登录</button>
		<view class="text">
			<navigator url="/pages/sign_a/sign_a"><text>其他方式登录</text></navigator>
		</view>
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
			userDto: {
				name: '',
				verifyCode: ''
			},
			LoginStatus:true,
			status: false
		};
	},
	methods: {
		sendCode: function() {
			console.log('111');
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
		clearTip(){
			this.mobileTip = '';
			this.status = false;
			this.LoginStatus =false;
		},
		getVerifyCode: function() {
			uni.request({
				url: this.$baseUrl + '/sms',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					mobile: userDto.name
				},
				success: res => {
					this.user = res.data.data;
					if (res.data.code === 1) {
						uni.showToast({
							title: '验证码发送成功'
						});
						(codes = res.data.data),
						 console.log(codes);
						mymobile = this.userDto.name;
						this.sendCode()
					} else {
						uni.showModal({
							title: '验证码发送失败'
						});
					}
				}
			});
		},
		signIn(userDto) {
			uni.request({
				url: this.$baseUrl + '/user/sign_in',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
					name: userDto.name,
					verifyCode: userDto.verifyCode
				},
				success: res => {
					if (res.data.code === 1) {
						uni.showToast({
							title: res.data.msg
						}),
							uni.navigateTo({
								url: '/pages/my_info/my_info?user=' + encodeURIComponent(JSON.stringify(this.user))
							});
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						});
					}
				}
			});
		},
		checkPhone() {
			var phone = this.userDto.name;
			if (!/^1[3456789]\d{9}$/.test(phone) ) {
				this.mobileTip = '手机格式不正确';
				this.status = true;
				this.LoginStatus = true;
			} else {
				this.mobileTip = '';
				this.getVerifyCode()
				this.status = false;
				
			}
		}
		
	}
};
</script>

<style scoped>
label {
	color: #f44336;
	text-align: center;
	font-size: 12px;
}
</style>
