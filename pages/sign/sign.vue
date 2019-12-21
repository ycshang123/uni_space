<template>
	<view class="container">
		<view class="text-box">
			<input type="text"  class="text" placeholder="手机号/邮箱/用户名"/>
			<input type="password"  class="text" placeholder="登录密码"/>
		</view>
		<view>
			<button class="btn">登录</button>
		</view>
		<view class="logo">
			<text>快速注册</text>
			<text>忘记密码</text>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	*{
		margin: 0 auto;
	}
	.container{
		width: 100%;
		height: 600upx;
	}
	.text-box{
		width: 80%;
		height: 400upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20%;
		text-align: center;
		margin-top:40% ;
	}
	.text{
		width:80%;
		height: 60upx;
		border-bottom: 1px solid #eeeeee ;
	}
	.btn{
		background-color: #424242;
		width: 80%;
		color: #e0e0e0;
		font-size: 16px;
	}
	.logo{
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		color: #9e9e9e;
		font-size: 16px;
		margin: 5%;
	}
</style>
