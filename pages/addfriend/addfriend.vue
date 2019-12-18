<template>
	<view class="container">
		<view class="search">
			<input type="text" class="search_key" placeholder="搜索好友" v-model="input_keyWords" />
			<button class="btn" @tap="search()">🔍搜索</button>
		</view>
		<text class="title-sub">推荐更多好友</text>
		<scroll-view scroll-x="true" class="recommend">
			<view  class="recommd_f yv-shadow" v-for="(recommend, index) in recommends" :key="index">
				<view class="recommd_f_text">
					<view class="text">
					<image class="s-avatar" :src="recommend.avatar"></image>
					<text class="title-sub">{{ recommend.nickname }}</text>	
					</view>
					<view class="s-btn">
						<button class="s-btn" @tap="addFriend(users.id, recommend.id)">{{btn}}</button>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="result" v-for="(friend, index) in friends" :key="index">
			<view class="left">
				<image class="s-avatar-big" :src="friend.avatar"></image>
				<view class="label">
					<text>{{ friend.nickname }}</text>
					<text class="title-small">{{ friend.address }}</text>
				</view>
			</view>
			<view class="right"><button class="s-btn" @tap="addFriend(users.id, friend.id)">添加</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			input_keyWords: '',
			status:false,
			btn:'添加',
			users:{},
			friends: [],
			recommends: []
		};
	},
	onLoad: function() {
		var that = this;
		uni.getStorage({
			key: 'user',
			success: function(res) {
				that.users = res.data;
				console.log(that.users);
				that.recommendFriend();
			}
		});
	},
	methods: {
		search: function() {
			uni.request({
				url: this.$baseUrl + '/friend/keywords',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
					fromId: this.users.id,
					keyWords: this.input_keyWords
				},
				success: res => {
					if (res.data.code ===1 ) {
						console.log(res.data.data);
						this.friends = res.data.data;
					}else{
						uni.showToast({
							title:res.data.msg
						})
					}
				}
			});
		},
		recommendFriend: function() {
			uni.request({
				url: this.$baseUrl + '/friend/recommend',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
					fromId: this.users.id
				},
				success: res => {
					console.log(res.data.data);
					if (res.data.code === 1) {
						this.recommends = res.data.data;
					}
				}
			});
		},
		addFriend(fromId, toId) {
			uni.request({
				url: this.$baseUrl + '/friend/friend',
				method: 'POST',
				data: {
					fromId: toId,
					toId:fromId
				},
				success: res => {
					if (res.data.msg ==='成功') {
						uni.showToast({
							title: res.data.msg
						});
					
					} else {
						uni.showToast({
							title:res.data.msg
						})
					}
				}
			});
		}
	}
};
</script>
<style scoped>
	
	
scroll-view {
	white-space: nowrap;
}
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
	justify-content: center;
	align-items: center;
}
.recommend {
	width: 100%;
	height: 360upx;
	
}
.yv-shadow {
	box-shadow: 2px 5px 10px #aaa;
}
.result {
	width: 100%;
	height: 200upx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #e0e0e0;
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

.recommd_f {
	width: 300upx;
	height: 320upx;
	border-radius: 10px;
	display: inline-block;
	margin: 20upx;
}
.recommd_f_text{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin: 10px;
}
.search_key {
	width: 60%;
	height: 40upx;
	border-radius: 10px;
	text-align: center;
	border: 1px solid #bdbdbd;
}
.btn {
	width: 30%;
	height: 60upx;
	border-radius: 20upx;
	background: #e1f5fe;
	color: #4fc3f7;
	display: flex;
	justify-content: center;
	align-items: center;
}
.search {
	width: 100%;
	display: flex;
	height: 80upx;
	justify-content: space-around;
	align-items: center;
}
.s-avatar {
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
	border: 1px solid #000000;
}
.s-avatar img {
	width: 100%;
	height: 100%;
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
</style>
