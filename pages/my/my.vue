<template>
	<view class="container">
		<view class="d-my">
			<view class="d-my-left group-row-center">
				<navigator url="/pages/my_info/my_info"><image :src="userDto.avatar" class="d-img"></image></navigator>
			</view>

			<view class="d-my-right">
				<view class="d-my-rightt nowrap">
					<view class="d-my-right-l">
						<view class="d-nickname">{{ userDto.nickname }}</view>
					</view>
					<view class="d-my-right-lll">
						<button @click="open" class="d-button"><dn-icon type="bishangyanjing" size="17"></dn-icon></button>
						<uni-popup ref="popup" type="bottom">
							<view class="d-pop-btn">
								<navigator url="../sign_m/sign_m">
									<button class="d-btn group-row-between">
										退出登录
										<uni-icons type="forward" size="20" style="color: #00ee76"></uni-icons>
									</button>
								</navigator>
					
							</view>
						</uni-popup>
					</view>
				</view>
				<view class="d-my-right-ll">
					<view class="d-my-right-box">
						<view class="d-my-right-box-top">{{ journal }}</view>
						<view class="d-my-right-box-bottom"><text>日志</text></view>
					</view>
					<view class="d-my-right-box">
						<view class="d-my-right-box-top">{{ photo }}</view>
						<view class="d-my-right-box-bottom"><text>照片</text></view>
					</view>
					<view class="d-my-right-box">
						<view class="d-my-right-box-top">{{ friend }}</view>
						<view class="d-my-right-box-bottom"><text>好友</text></view>
					</view>
				</view>
			</view>
		</view>

		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="text-center"></wuc-tab>

		<swiper
			:current="TabCur"
			class="swiper"
			duration="500"
			:circular="true"
			indicator-color="rgba(255,255,255,0)"
			indicator-active-color="rgba(255,255,255,0)"
			@change="swiperChange"
		>
			<swiper-item>
				<view class="dbox mar" v-for="(item, index) in juEs" :key="index" @click="goDetail(item)" :id="key">
					<view class="d-box-title">
						<text>{{ item.title }}</text>
					</view>
					<view class="d-box-content nowrap">
						<view v-html="item.content" class="d-box-content-l"></view>
						<view class="d-box-content-img"><image :src="item.thumbnail" mode="" class="d-box-img"></image></view>
					</view>
					<view class="d-box-bottom">
						<view><dn-icon type="haoping" size="15" color="#696969"></dn-icon></view>
						<view><dn-icon type="xinxi" size="15" color="#696969"></dn-icon></view>
						<view><dn-icon type="collect" size="15" color="#696969"></dn-icon></view>
						<view><dn-icon type="xiala" size="15" color="#696969"></dn-icon></view>
					</view>
				</view>
			</swiper-item>

			<swiper-item>
				<view class="d-photo">
					<view class="pic">
						<navigator url="/pages/photoCreate/photoCreate"><dn-icon type="jia" size="70" color="#c3c3c3"></dn-icon></navigator>
					</view>
					<view class="d-pic" v-for="(pic, index) in pictureNum" :key="index">
						<view class="d-picl"><image :src="pic.cover" mode="" class="d-picl"></image></view>
						<view class="d-pic-name group-row-center">
							<view> {{pic.name}}</view>
						<!-- 	<text v-if="status">{{ pic.name }}</text> -->
						</view>
						<view class="s-box">
							<view class="s-logo">
								<image src="../../static/img/edit.png" v-if="status" @tap="change();updateAlbum(pic.id,pic.name)"></image>
								<image src ='../../static/img/affirm.png' @tap="change"></image>
							</view>
							<view class="s-logo">
								<image src="../../static/img/delete.png" @tap="deleteAlbum(pic.id,index)"></image>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>

			<swiper-item><view class="d-music"></view></swiper-item>
		</swiper>
	</view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import dnIcon from '../../components/dn-icon/dn-icon.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	data() {
		return {
			photoAlbumDto: {
				cover: '',
				introduction: '',
				name: '',
				type: ''
			},
			status:true,
			userDto: {
			},
			friend: '',
			photo: '',
			journal: '',
			journalList: [],
			juEs: [],
			bannercom: {},
			TabCur: 0,
			tabList: [{ name: '日志' }, { name: '相册' }, { name: '音乐' }],
			pictureNum: []
		};
	},
	components: {
		dnIcon,
		WucTab,
		uniPopup
	},
	methods: {
		change(){
			this.status =! this.status;
		},
		getPictureNum() {
			var _self = this;
			uni.request({
				url: this.$baseUrl + '/photoalbum/all',
				method: 'POST',
				data: {
					id: this.userDto.id
				},
				success: res => {
					console.log(res.data.data);
					this.pictureNum = res.data.data;
				}
			});
		},
		creatPhotoalbum(photoAlbumDto) {
			uni.request({
				url: this.$baseUrl + '/photoalbum/apa',
				method: 'POST',
				data: {
					userId: this.userDto.id
				},
				success: res => {
					if (res.data.msg === '成功') {
						uni.showToast({
							title: res.data.msg
						});
					} else {
						uni.showToast({
							title: res.data.msg
						});
					}
				}
			});
		},
		getJuEs() {
			var _self = this;
			uni.request({
				url: this.$baseUrl + '/journal/user/data',
				method: 'POST',
				data: {
					id: this.userDto.id
				},
				success: res => {
					console.log(res.data.data);
					this.juEs = res.data.data;
				}
			});
		},
		tabChange(index) {
			this.TabCur = index;
		},
		swiperChange(e) {
			let { current } = e.target;
			this.TabCur = current;
		},
		open() {
			// 需要在 popup 组件，指定 ref 为 popup
			this.$refs.popup.open();
		},
		goDetail(item) {
			let detail = {
				id: item.id,
				userId: item.userId,
				thumbnail: item.thumbnail,
				createTime: item.createTime,
				comments: item.comments,
				title: item.title,
				avatar: item.avatar,
				nickname: item.nickname,
				likes: item.likes,
				content: item.content
			};
			uni.navigateTo({
				url: '../myj_detail/myj_detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
			});
		},
		userSum: function(userDto) {
			uni.request({
				url: this.$baseUrl + '/user/sum',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
					id: userDto.id
				},
				success: res => {
					if (res.data.code === 1) {
						console.log(res.data.data.friendSum);
						this.friend = res.data.data.friendSum;
						console.log(this.friend);
						this.photo = res.data.data.photoAlbumSum;
						this.journal = res.data.data.journalSum;
					}
				}
			});
		},
		deleteAlbum(id,index){
			this.pictureNum.splice(index,1,false)
			uni.request({
				url:this.$baseUrl+'/photoalbum/dpa',
				method:'DELETE',
				data:{
					id:id,
					userId:this.userDto.id,
				},
				success: res=>{
					console.log('aaa')
					console.log(res.data.msg)
				}
			})
			
		},
		updateAlbum(id,name){
			uni.request({
				url:this.$baseUrl+'/photoalbum/upa',
				method:'PUT',
				data:{
					id:id,
					name:name,
					userId:this.userDto.id,
				},
				success:res =>{
					console.log(res.data.msg)
					}
			})
		}
	},
	onLoad() {
		let that = this;
		uni.getStorage({
			key: 'user',
			success: function(res) {
				that.userDto = res.data;
				console.log(that.userDto);
				that.userSum(that.userDto);
				that.getJuEs();
				that.getPictureNum();
			}
		});
	}
};
</script>

<style>
	.s-box{
		width: 100%;
		height: 10%;
		display: flex;
	}
.s-logo{
	display: flex;
	align-items: center;
	justify-content: space-around;
    width: 50%;
	height: 100%;
}
.s-logo image{
	width: 40%;
	height: 80%;
}
.pic {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 45%;
	height: 360upx;
}
.d-createphoto {
	box-shadow: 3px 3px 3px 3px #e8f6f0;
	width: 50%;
	height: 320upx;
}
.d-my-rightt {
	width: 90%;
	height: 50%;
}
.d-my-right {
	width: 100%;
	height: 100%;
}
.d-photo {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	margin-top: 20upx;
}

.d-pic {
	box-shadow: 3px 3px 3px 3px #e8f6f0;
	width: 45%;
	height: 400upx;
/* 	margin: 10px; */
	
}
.d-picl {
	width: 100%;
	height: 75%;
}
.d-picl image {
	width: 100%;
	height: 100%;
	border-radius: 10upx;
}
.d-pic-name {
	width: 100%;
	height: 15%;
	display: flex;
	align-items: center;
	font-size: 30upx;
}
.mar {
	margin: 0 auto;
}
.d-image-l {
	display: flex;
	width: 100%;
	height: 500upx;
	background-color: #c0c0c0;
}
.d-image {
	flex: 0 0 33.33%;
	height: 50%;
}
.d-image-ll {
	width: 100%;
	height: 100%;
}
.d-my {
	width: 90%;
	height: 180upx;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: 0 auto;
}
.d-my-left {
	width: 28%;
	height: 100%;
	flex-wrap: wrap;
}
.d-my-right {
	width: 72%;
	height: 100%;
	margin: 0 auto;
}
.d-my-right-l {
	text-align: center;
	width: 50%;
	height: 100%;
	font-size: 47upx;
	display: flex;
	align-items: center;
}
.d-my-right-ll {
	width: 90%;
	height: 50%;
	font-size: 35upx;
	display: flex;
	justify-content: center;
}
.d-my-right-lll {
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.d-nickname {
	color: #696969;
	width: 100%;
	height: 100%;
	font-size: 47upx;
}
.d-intro {
	width: 95%;
	height: 50%;
	color: #696969;
	display: flex;
	align-items: center;
	margin: 0 auto;
	font-size: 37upx;
}
.d-img {
	width: 130upx;
	height: 130upx;
	border-radius: 50%;
}
.d-my-my {
	width: 100%;
	height: 450upx;
	display: flex;
	flex-wrap: wrap;
}
.d-my-my-box {
	width: 33%;
	height: 50%;
	font-size: 35upx;
}
.d-list {
	width: 100%;
	height: 300upx;
	background-color: #007aff;
	margin: 0 auto;
}
.ui-table {
	float: left;
	width: calc(100% - 64px);
	background-color: #ffffff;
	border-top: 5px solid #efeff4;
	padding: 0 32px;
}
.ui-table > view {
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid #c3c3c3;
}
.ui-table > view > span {
	float: left;
	font-size: 35upx;
}
.ui-table > view > i {
	float: right;
}
.d-between {
	display: flex;
	justify-content: space-between;
}
.d-my-right-box {
	width: 33%;
	height: 90%;
	text-align: center;
}
.d-button {
	width: 50upx;
	height: 50upx;
	background-color: #ffe1ff;
	display: flex;
	float: right;
	justify-content: center;
	align-items: center;
}
.d-pop-btn {
	width: 100%;
	height: 570upx;
}
.d-btn {
	width: 100%;
	height: 20%;
}
.swiper {
	height: 20000upx;
}
swiper {
	box-sizing: border-box;
}
.text-center {
	height: 50%;
	text-align: center;
	color: #5677fc;
}
.dbox {
	width: 85%;
	height: 400upx;
	box-shadow: 3px 3px 3px 3px #e8e8e8;
	border-radius: 5%;
	margin-top: 4%;
}
.d-box-title {
	width: 100%;
	height: 22%;
	margin: 0 auto;
	font-size: 35upx;
	font-weight: 550;
	color: #4f4f4f;
	display: flex;
	align-items: center;
}
.d-box-content {
	width: 100%;
	height: 60%;
	margin: 0 auto;
	font-size: 29upx;
	text-indent: calc(5%);
	color: #8b8682;
}
.d-box-bottom {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 90%;
	height: 18%;
	margin: 0 auto;
}
.d-box-content-l {
	width: 68%;
	height: 80%;
	overflow: hidden;
}
.d-box-content-img {
	width: 26%;
	height: 100%;
}
.d-box-img {
	width: 100%;
	height: 100%;
}
.d-box-bottom-icon {
	font-size: 30upx;
	color: #8b8682;
}
.d-three {
	width: 33.3%;
	height: 100%;
	margin: 0 auto;
}
</style>
