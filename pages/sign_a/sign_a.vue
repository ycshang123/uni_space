<template>
	<view class="container">
		<view class="sy-input-box box-height-a">
			<label>{{mobileTip}}</label>
			<input type="number" placeholder="请输入手机号/账号/邮箱" class="sy-input" v-model="queryDto.name" maxlength="11" />
			<view class="nowrap sy-center"><input type="password" placeholder="请输入密码" class="sy-input" v-model="queryDto.password" /></view>
			<view class="select group-row-between">
				<navigator url="/pages/register/register"><text class="title-sub">快速注册</text></navigator>
				 <navigator url="/pages/forget_p/forget_p"><text class="title-sub">找回密码</text></navigator>
			</view>
			<button class="r-button" @tap="signIn(queryDto)" :disabled="queryDto.name == null || queryDto.password == null">登录</button></navigator>
	</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mobileTip:'',
			queryDto: {
				name: '',
				password: ''
			},
			user:[]
		};
	},
	onLoad() {},
	methods: {
		signIn: function(queryDto) {
			if (this.queryDto.name == '' || this.queryDto.password == '') {
				this.mobileTip = '信息不完备'
			} else {
			uni.request({
				url: this.$baseUrl + '/user/signin',
				method: 'POST',
				data: {
					equalsString: queryDto.name,
					password: queryDto.password
				},
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					console.log(res.data.data);
					if (res.data.code === 1) {
						uni.showToast({
							title: '登录成功'
						});
						uni.switchTab({
							url:'/pages/index/index'
						})
						uni.setStorage({
							key: 'user',
							data: res.data.data,
							success: function() {
								console.log('success');
							}
						});
					} else {
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
.r-button {
	width: 100%;
}
.sy-input-box {
	margin-top: 25%;
}
.sy-input {
	height: 110upx;
}
button::after {
	border: none;
}
.select {
	margin-top: 10%;
	margin: 0 auto;
	width: 90%;
}
</style>
