<template>
	<view class="container">
		<view class="v-bar">
			<navigator url="/pages/my/my"><text>取消</text></navigator>
			<text @tap="updateUserData(userDto)">确定</text>
		</view>
		<view class="s-avatar">
			<view class="s-avatar-row"><image :src="userDto.avatar" @tap="showActionSheet()"></image></view>
		</view>
		<view class="s-text">
			<view class="s-box">
				<view class="s-title group-row-center"><text class="title-sub ">昵称</text></view>
				<view class="s-content s-column">
					<input class="s-input s-font" v-model="userDto.nickname" v-if="statusName" />
					<text v-else class="s-font">{{ userDto.nickname }}</text>
				</view>
				<view class="s-title"><image src="../../static/img/edit.png" @tap="changeName()"></image></view>
			</view>
			<view class="s-box">
				<view class="s-title group-row-center"><text class="title-sub ">简介</text></view>
				<view class="s-content s-column">
					<textarea class="s-input s-font" v-model="userDto.introduction" v-if="statusInfo" />
					<text v-else class="s-font">{{ userDto.introduction }}</text>
				</view>
				<view class="s-title"><image src="../../static/img/edit.png" @tap="changeInfo()"></image></view>
			</view>
			<view class="s-box">
				<view class="s-title group-row-center"><text class="title-sub ">城市</text></view>
				<view class="s-content s-column">
					<input class="s-input s-font" v-model="userDto.address" v-if="statusCity" />
					<text v-else class="s-font">{{ userDto.address }}</text>
				</view>
				<view class="s-title"><image src="../../static/img/edit.png" @tap="changeCity()"></image></view>
			</view>
			<view class="s-box">
				<view class="s-title group-row-center"><text class="title-sub ">性别</text></view>
				<view class="s-content s-column">
					<picker @change="bindSexChange" :value="index" :range="sexList" class="s-font">
						<view>{{sexList[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="s-box">
				<view class="s-title group-row-center"><text class="title-sub ">星座</text></view>
				<view class="s-content s-column ">
					<picker @change="bindStartChange" :value="index" :range="constellationList" class="s-font">
						<view>{{ constellationList[index] }}</view>
					</picker>
				</view>
			</view>
			<view class="s-box">
				<view class="s-title group-row-center"><text class="title-sub ">生日</text></view>
				<view class="s-content s-column">
					<picker mode="date" :value="date" @change="bindDateChange" class="s-font">
						<view>{{ date}}</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var aliyunImg;
// import avatar from '../../components/yq-avatar/yq-avatar.vue';
export default {
	data() {
		return {
			userDto: {},
			personal: {},
			constellationList: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天枰座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
			sexList: ['男', '女', '保密'],
			index: 0,
			date:0,
			statusName: false,
			statusInfo: false,
			statusCity: false,
			statusGender: false
		};
	},
	 
	onLoad() {
		// this.selectUser(this.userDto);
		let that = this;
		uni.getStorage({
		key:'user',
		success: function(res) {
		that.personal = res.data;
		console.log(that.personal)
		that.selectUser(that.userDto);
			}
		});
	},
	methods: {
		showActionSheet: function() {
			var _this = this;
			uni.showActionSheet({
				itemList: ['拍照', '从相册选择'],
				success: function(res) {
					console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					//选择的是拍照功能
					if (res.tapIndex == 0) {
						uni.chooseImage({
							count: 1,
							sourceType: ['camera'],
							success: function(res) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePaths[0],
									success: function() {
										console.log('save success');
										uni.uploadFile({
											url: this.$baseUrl + '/img',
											filePath: res.tempFilePaths[0],
											name: 'file',
											formData: {},
											success: uploadFileRes => {
												console.log(uploadFileRes.data.data);
												_this.userDto.avatar = uploadFileRes.data.data;
												_this.userAvatar(_this.userDto);
											}
										});
									}
								});
							}
						});
					}
					//从相册选择
					if (res.tapIndex == 1) {
						uni.chooseImage({
							count: 1,
							sizeType: ['original', 'compressed'],
							sourceType: ['album'],
							success: function(res) {
								console.log('选中图片:' + JSON.stringify(res.tempFilePaths));
								uni.uploadFile({
									// header:{
									// 	'content-type':'application/json'
									// },
									url: 'http://2p7173d335.zicp.vip:41065/api/img',
									filePath: res.tempFilePaths[0],
									name: 'file',
									formData: {},
									success: uploadFileRes => {
										console.log(uploadFileRes.data);
										let data = {
											code: 1,
											msg: '',
											data: ''
										};
										data = JSON.parse(uploadFileRes.data);
										console.log(data.data[0]);
										_this.userDto.avatar = data.data[0];
										_this.userAvatar(_this.userDto);
									}
								});
							}
						});
					}
				}
			});
		},
		userAvatar: function(userDto) {
			uni.request({
				url: this.$baseUrl + '/user/avatar',
				method: 'PUT',
				data: {
					id: userDto.id,
					avatar: userDto.avatar
				},
				success: res => {
					if (res.data.code === 1) {
					} else {
						uni.showToast({
							title: '头像修改失败'
						});
					}
				}
			});
		},
		updateUserData: function(userDto) {
			userDto = this.userDto;
			uni.request({
				url: this.$baseUrl + '/user/data',
				method: 'PUT',
				header: {
					'content-type': 'application/json'
				},
				data: {
					id: userDto.id,
					address: userDto.address,
					nickname: userDto.nickname,
					introduction: userDto.introduction,
					birthday: userDto.birthday,
					constellation: userDto.constellation,
					gender: userDto.gender
				},
				success: res => {
					if (res.data.code === 1) {
						uni.showToast({
							title: '信息修改成功'
						});
					}
				}
			});
		},
		selectUser: function(userDto) {
			userDto = this.personal;
			uni.request({
				url: this.$baseUrl + '/user/id',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
					id: this.personal.id
				},
				success: res => {
					console.log(this.personal.id);
					if (res.data.code === 1) {
						console.log(res.data.data);
						this.userDto = res.data.data;
						console.log(this.userDto);
					}
				}
			});
		},
		bindStartChange: function(e) {
			(this.index = e.target.value), (this.userDto.constellation = this.index);
		},
		
		bindSexChange:function(e) {
			this.index = e.target.value;
			this.userDto.gender = this.index;
		
		},
		bindDateChange:function(e) {
			this.date = e.target.value;
			this.userDto.birthday = this.date;
		
		},
		changeName() {
			this.statusName = !this.statusName;
		},
		changeInfo() {
			this.statusInfo = !this.statusInfo;
		},
		changeCity() {
			this.statusCity = !this.statusCity;
		},
	}
};
</script>

<style scoped>
.s-avatar {
	width: 100%;
	height: 200upx;
	background: #f4f3de;
	display: flex;
	justify-content: center;
	align-items: center;
}
.s-text {
	width: 100%;
	margin: 0 auto;
	/* height: 800upx; */
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.s-box {
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #777777;
}
.s-title {
	width: 15%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.s-title image {
	width: 50%;
	height: 20%;
}
.s-content {
	width: 70%;
	height: 100%;
}
.s-input {
	width: 100%;
	height: 45px;
	border: 1px solid #777777;
	border-radius: 10px;
}
.s-btn-big {
	display: flex;
	width: 700upx;
	height: 120upx;
	justify-content: space-between;
	border-bottom: #4cd964;
	align-items: center;
}
.s-nickname {
	margin-left: 20px;
}

.s-avatar-row {
	width: 25%;
	height: 65%;
	border-radius: 50%;
}
.s-avatar-row image {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.s-font{
	font-size: 18px;
	font-color: #322D11;
}
</style>
