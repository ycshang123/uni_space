<template>
	<view class="container">
		<view class="v-bar">
			<text>取消</text>
			<text>发表</text>
		</view>
		<textarea placeholder="说说今天发生的新鲜事吧" maxlength="-1" auto-height="true"></textarea>
		<view class="photo">
			<view class="img"></view>
			<view class="addphoto" @tap="showActionSheet">
				<image src="../../static/img/photo.png"></image>
				<text>照片</text>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return{
			userDto:{}
		};
	},
	methods:{
		
},
onLoad(){
		let that = this;
		uni.getStorage({
			key: 'user',
			success: function(res) {
				that.userDto = res.data;
				console.log(that.userDto);
			}
		});
}
}
</script>

<style scoped>
textarea {
	width: 100%;
}
.photo {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.img {
	width: 30%;
	height: 180upx;
	border: 1px solid #000000;
}
.addphoto {
	width: 30%;
	height: 180upx;
	border: 1px solid #000000;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #9e9e9e;
	background-color: #fafafa;
}
.addphoto image {
	width: 40%;
	height: 60%;
}
</style>
