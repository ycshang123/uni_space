<template>
	<view class="container">
		<view class="result" v-for="(friend, index) in friends" :key="index">
			<view class="left">
				<image class="s-avatar-big" :src="friend.avatar"></image>
				<view class="label">
					<text>{{ friend.nickname }}</text>
					<text>{{ friend.address }}</text>
				</view>
			</view>
			<view class="right">
				<button class="s-btn" @tap="agree(friend.id)">同意</button>
				<button class="s-btn" @tap="reject(friend.id)">拒绝</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onLoad() {
		var that = this;
		uni.getStorage({
			key: 'user',
			success: function(res) {
				that.users = res.data;
				console.log(that.users);
				that.improveFriend();
			}
		});
	},
	data() {
		return {
			users:{},
			friends: []
		};
	},
	methods:{
		improveFriend: function() {
			uni.request({
				url: this.$baseUrl + '/friend/application',
				method: 'POST',
				data: {
					toId: this.users.id
				},
				success: res => {
					if (res.data.code === 1) {
						console.log(res.data.data)
						this.friends = res.data.data;
					} else {
						uni.showToast({
							title: res.data.msg
						});
					}
				}
			});
		},
		agree:function(fromId, toId){
			uni.request({
				url:this.$baseUrl+'/friend/confirm',
				method:'PUT',
				data:{
					fromId: this.users.id,
					toId: toId
				},
				success:res =>{
					if(res.data.code === 1){
						uni.showToast({
							title:res.data.msg
						})
					}else{
						uni.showToast({
							title:res.data.msg
						})
					}
				}
			})
		},
		reject:function(fromId, toId){
			uni.request({
				url:this.$baseUrl+'/friend/reject',
				method:'DELETE',
				data:{
					fromId:fromId,
					toId:toId
				},
				success: res =>{
				if(res.data.code === 1){
					uni.showToast({
						title:res.data.msg
					})
				}else{
					uni.showToast({
						title:res.data.msg
					})
				}
				}
			})
		}
	}
	
};
</script>

<style scoped>
.left {
	width: 70%;
	height: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.right {
	width: 30%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.result {
	width: 100%;
	height: 200upx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #e0e0e0;
}
.s-avatar-big {
	width: 20%;
	height: 60%;
	border-radius: 50px;
}
.s-avatar-big img {
	width: 100%;
	height: 100%;
}
.s-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60upx;
	background: #f5f5f5;
	color: #ef6c00;
}
.label {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
</style>
