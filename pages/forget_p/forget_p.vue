<template>
	<view class="container">
		<view class="sy-input-box box-height-h">
			<label>{{ mobileTip }}</label>
			<input type="text" class="sy-input" placeholder="手机号" v-model="userDto.name" maxlength="11" @input="checkPhone()" />
			<view class="group-row-center">
				<input type="text" class="sy-input-small" placeholder="验证码" maxlength="6" v-model="verifyCode" />
				<button class="btn" @tap="getVerifyCode()" :disabled="status">获取验证码</button>
			</view>
			<label>{{UpassWordTip}}</label>
			<input type="password" class="sy-input title-sub" v-model="userDto.password" placeholder="8-16为字符,包含大小写字母和数字" @input="checkPassword()"/>
			<input type="password" class="sy-input title-sub" v-model="re_password" placeholder="再次确认密码" />
		</view>
		<label>{{ passWordTip }}</label>
		<button class="btn-big" style="margin-top: 10%;" @tap="froget(userDto)" :disabled="re_status">确认</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			seconds: 60,
			codeBtn: {
				text: '获取验证码',
				count: this.seconds
			},
			userDto: {
				name: '',
				password: ''
			},
			verifyCode: '',
			re_password: '',
			passWordTip: '',
			mobileTip: '',
			UpassWordTip:'',
			re_status:true,
			status: true
		};
	},
	onLoad() {},
	methods: {
		checkPhone() {
			var phone = this.userDto.name;
			if (!/^1[3456789]\d{9}$/.test(phone)) {
				this.mobileTip = '手机格式不正确';
				this.status = true;
				return false;
			} else {
				this.mobileTip = '';
				this.status = false;
			}
		},
		checkPassword(){
			var password = this.userDto.password;
			if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(password)){
				this.UpassWordTip ='密码格式不正确';
				this.re_status = true
			}else{
				this.UpassWordTip='',
				this.re_status = false
				
			}
		},
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
		getVerifyCode: function() {
			uni.request({
				url: this.$baseUrl + '/sms?mobile=' + this.userDto.name,
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					mobile: this.userDto.name
				},
				success: res => {
					if (res.data.code === 1) {
						uni.showToast({
							title: '验证码发送成功'
						});
						this.sendCode()
					} else {
						uni.showModal({
							title: '验证码发送失败'
						});
					}
				}
			});
		},
		froget: function(userDto) {
			if (this.re_password != this.userDto.password) {
				this.passWordTip = '两次密码输入不同，请重新输入密码';
				(this.re_password = ''), (this.userDto.password = '');
			} else {
				uni.request({
					url: this.$baseUrl + '/user/userPassword',
					method: 'PUT',
					header: {
						'content-type': 'application/json'
					},
					data: {
						name: this.userDto.name,
						password: this.userDto.password,
						verifyCode: this.verifyCode
					},
					success: res => {
						if (res.data.code === 1) {
							uni.showToast({
								title: '密码修改成功'
							});
							uni.navigateTo({
								url: '../sign_a/sign_a'
							});
						}
					}
				});
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
