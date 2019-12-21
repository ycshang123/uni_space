<template>
	<view class="container">
		<view class="search">
			<navigator url='/pages/imporvefriend/improvefriend'>
				<button class="btn">↓</button>
			</navigator>
			<input type="text" class="search_key" placeholder="搜索好友" v-model="input_keyWords" @input="selectFriend()" />
			<navigator url="/pages/addfriend/addfriend"><button class="btn">＋</button></navigator>
		</view>
		<view class="box" v-for="(friend, index) in friends" :key="index">
			<view class="friend_avatar"><image :src="friend.avatar"></image></view>
	<!-- 	<navigator :url="'/pages/friend_page/friend_page?id='+friend.id"> -->
			<!-- <view class="friend_info"> -->
				<navigator :url="'/pages/friend_page/friend_page?id='+friend.id" class="friend_info">
				<text class="s-title">{{ friend.nickname }}</text>
				<text class="title-small">{{ friend.introduction }}</text>
				</navigator>
		<!-- 	</view> -->
					<view class="logo" @tap="deleteFend(users.id,friend.id)"><text>×</text></view>
		<!-- 	<view class="logo"><text>〉</text></view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selected: 0,
			show: true,
			users: {},
			input_keyWords: '',
			friends: []
		};
	},
	methods: {
		selectAll: function() {
			uni.request({
				url: this.$baseUrl + '/friend/keyword',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
				fromId: this.users.id,
					keyWords: ''
				},
				success: res => {
					this.friends = res.data.data;
					if (res.data.code === 1) {
						console.log(res.data.data);
					} else {
						uni.showToast({
							title: res.data.msg
						});
					}
				}
			});
		},
		selectFriend: function() {
			uni.request({
				url: this.$baseUrl + '/friend/keyword',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
					fromId: this.users.id,
					keyWords: this.input_keyWords
				},
				success: res => {
					if (res.data.code === 1) {
						console.log(res.data.data);
						this.friends = res.data.data;
					}
				}
			});
		},
		deleteFend:function(fromId,toId){
			uni.request({
				url:this.$baseUrl+'/friend/friend',
				method:'DELETE',
				data:{
					fromId:fromId,
					toId:toId,
				},
				success : res =>{
					if(res.data.code ===1){
						uni.showToast({
							title: res.data.msg
						});
					}else{
						uni.showToast({
							title: res.data.msg
						});
					}
				}
			})
		}
	},
	onLoad(){
		// this.selectAll()
		let that = this;
		uni.getStorage({
			key: 'user',
			success: function(res) {
				that.users = res.data;
				console.log(that.users);
				that.selectAll();
			}
		});
	}
};
</script>

<style scoped>
.top_bar {
	width: 100%;
	height: 50upx;
	background: #f5f5f5;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.box {
	width: 100%;
	height: 180upx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #eeeeee;
}
.friend_avatar {
	width: 14%;
	height: 65%;
	margin-left: 5%;
}
.friend_avatar image {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.friend_info {
	width: 70%;
	height: 85%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
}
.icon {
	color: #424242;
}
.search_key {
	width: 80%;
	height: 40upx;
	border-radius: 10px;
	text-align: center;
	border: 1px solid #bdbdbd;
}
.btn {
	width: 10%;
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
</style>
