<template>
	<view class="container">
		<view class="sy-input-box">
			<label>{{mobileTip}}</label>
			<input type="number" placeholder="请输入手机号" class="sy-input" v-model="userDto.mobile" required="required" maxlength="11" @focus="clearTip()" />
			<view class="yan nowrap">
				<input type="text" placeholder="输入验证码" class=" sy-input-small" v-model="userDto.verifyCode" required="required" />
				<button class="btn" @tap="checkPhone()" :disabled="status">{{codeBtn.text}}</button>
			</view>
			<label>{{UpassWordTip}}</label>
			<input type="password" placeholder="8-16为字符,包含大小写字母和数字"  @input="checkPassword()" class="sy-input title-sub" v-model="userDto.password" />
			<input type="password" placeholder="请确认密码" class="sy-input title-sub" v-model="re_password" @focus="clearTip()" />
			<label>{{passWordTip}}</label>
		</view>
		<button class="r-button" @tap="signUp()">注册</button>
	</view>
</template>

<script>
	var codes,mymobile;
	import uniCountdown from '../../components/uni-countdown/uni-countdown.vue'
export default {
	comments:{
		uniCountdown
	},
	data() {
		return {
			seconds: 60,
			codeBtn: {
				text: '获取验证码',
				count: this.seconds
			},
			passWordTip:'',
			re_password: '',
			status: true,
			mobileTip:'',
			userDto:{
			mobile: '',
			verifyCode: '',
			UpassWordTip: '',
			password:''	
			}
			
		};
	},
	onLoad() {},
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
		checkPassword(){
			var password = this.userDto.password;
			if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(password)){
				this.UpassWordTip ='密码格式不正确'
			}else{
				this.UpassWordTip=''
			}
		},
		getVerifyCode: function() {
			uni.request({
				url: this.$baseUrl + '/sms',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					mobile: this.userDto.mobile
				},
				success: res => {
					console.log(res.data.data);
					if (res.data.code === 1) {
						uni.showToast({
							title: '验证码已发送'
						});
						codes = res.data.code
						mymobile = this.userDto.name
						this.sendCode()
					} else {
						uni.showToast({
							title: '验证码发送失败'
						});
					}
				}
			});
		},
		checkPhone(){
			var phone =this.userDto.mobile
			    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
					this.mobileTip ='手机格式不正确';
					this.status = true;
			        return false; 
			    } else{
					this.mobileTip =''; 
					this.status = false;
					this.getVerifyCode()
				}
		},
		clearTip(){
			this.mobileTip = '';
			this.passWordTip ='';
			this.status = false;
		},
		signUp: function(userDto) {
			if(this.re_password !=this.userDto.password){
				this.passWordTip ='两次密码输入不同，请重新输入密码'; 
				this.re_password = '',
				this.userDto.password =''
			}else{
			uni.request({
				url: this.$baseUrl + '/user/sign_up',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data:{
					name:this.userDto.mobile,
					verifyCode:this.userDto.verifyCode,
					password:this.userDto.password
				},
				success: res => {
					 if(res.data.code === 1){
						uni.showModal({
							title: '提示',
							content: '注册成功'
						}); 
						uni.navigateTo({
							url: '../sign_a/sign_a'
						});
					}else{
						uni.showModal({
							title: '提示',
							content: res.data.msg
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
.sy-input-box {
	height: 500upx;
	margin-top: 18%;
}
.yan {
	width: 100%;
}
label{
	color: #f44336;
	text-align: center;
	font-size: 12px;
}
</style>
