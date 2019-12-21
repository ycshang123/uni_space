<template>
	<view class="container">
		<view class="notice">
			<image src="/static/img/comment.png" class="logo"></image>
			<text>评论</text>
			<text>〉</text>
		</view>
		<view class="notice">
			<image src="../../static/img/agree.png" class="logo"></image>
			<text>赞</text>
			<text>〉</text>
		</view>
		<view class="notice">
			<image src="../../static/img/addfriend.png" class="logo"></image>
			<text>新朋友</text>
			<text>〉</text>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.notice{
		width: 100%;
		height:140upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1px solid #eeeeee;
	}
	.logo{
		width: 10%;
		height: 60%;
	}
	.logo image{
		width: 100%;
		height:100%;
	}
</style>
