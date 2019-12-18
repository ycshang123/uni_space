<template>
	<view class="container">
				<view class="d-my">
					<view class="d-my-left group-row-center">
						<navigator url="/pages/my_info/my_info"><image :src="userDto.avatar" class="d-img"></image></navigator>
					</view>
					<view class="d-my-right">
						<view class="d-my-right-box">
							<view class="d-my-right-box-top">{{userDto.journalSum}}</view>
							<view class="d-my-right-box-bottom"><text>日志</text></view>
						</view>
						<view class="d-my-right-box">
							<view class="d-my-right-box-top">{{userDto.photoAlbumSum}}</view>
							<view class="d-my-right-box-bottom"><text>照片</text></view>
						</view>
						<view class="d-my-right-box">
							<view class="d-my-right-box-top">{{userDto.friendSum}}</view>
							<view class="d-my-right-box-bottom"><text>好友</text></view>
						</view>
					</view>
					<view class="d-nickname">{{userDto.nickname}}</view>
					<view class="d-intro">
						<text>个人简介:{{userDto.introduction}}</text>
					</view>
				</view>
		
		
		<button @click="open" class="d-button"><uni-icons type="bars" size="20" style="color: #ffa07a"></uni-icons></button>
		<uni-popup ref="popup" type="bottom">
			<view class="d-pop-btn">
			<navigator url="../mehaotian-shake/mehaotian-shake">
				<button class="d-btn group-row-between">摇一摇<uni-icons type="forward" size="20" style="color: #00ee76"></uni-icons></button>
				</navigator>
			<navigator url="../mehaotian-shake/mehaotian-shake">
				<button class="d-btn group-row-between">互动<uni-icons type="forward" size="20" style="color: #00ee76"></uni-icons></button>
				</navigator>
			<navigator url="../mehaotian-shake/mehaotian-shake">
				<button class="d-btn group-row-between">反馈<uni-icons type="forward" size="20" style="color: #00ee76"></uni-icons></button>
				</navigator>
			<navigator url="../mehaotian-shake/mehaotian-shake">
				<button class="d-btn group-row-between">设置<uni-icons type="forward" size="20" style="color: #00ee76"></uni-icons></button>
				</navigator>
			<navigator url="../mehaotian-shake/mehaotian-shake">
				<button class="d-btn group-row-between">关于<uni-icons type="forward" size="20" style="color: #00ee76"></uni-icons></button>
				</navigator>
		</view>
		</uni-popup>
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="text-center"></wuc-tab>
		
		<swiper :current="TabCur" class="swiper" duration="500" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
			  <swiper-item>
			  				 <view class="dbox mar" v-for="(item,index) in juEs" :key="index" @click="goDetail(item)" :id="key">
			  				 	<view class="d-box-title">
			  				 		<text>{{item.title}}</text>
			  				 	</view>
			  					<view class="d-box-content nowrap">
			  						<view v-html="item.content" class="d-box-content-l">
			  						</view>
			  						<view class="d-box-content-img">
			  							<image :src="item.thumbnail" mode="" class="d-box-img"></image>
			  						</view>
			  					</view>
			  					<view class="d-box-bottom nowrap group-row-between">
			  						<view class="d-box-bottom-icon">
			  							{{item.likes}}
										<dn-icon type="fenxiang" size="20" color="#696969"></dn-icon>
			  							<view @click="getComments(item)">{{item.comments}}</view>
										<dn-icon type="fenxiang" size="20" color="#696969"></dn-icon>
			  						</view>
										<dn-icon type="fenxiang" size="20" color="#696969"></dn-icon>
			  					</view>
			  				 </view>
			  </swiper-item>
		
			  <swiper-item>
				  <view class="d-photo">
					  <view class="d-left">
						<view class="d-pic" v-for="(pic,index) in pictureNum" :key="index">
							<view class="d-picl">
							<image :src="pic.cover" mode="" class="d-picl"></image>
							</view>
							<view class="d-pic-name group-row-center" >
								<text>{{pic.name}}</text>
							</view>
						</view>  
					  </view>
					 <view class="d-right">
						  <view class="d-picll" v-for="(pic,index) in juEs" :key="index">
						  	<view class="d-picl">
						  	<image :src="pic.thumbnail" mode="" class="d-picl"></image>
						  	</view>
						  	<view class="d-pic-name">
						  		<text>{{pic.title}}</text>
						  	</view>
						  </view>
					  </view>
				  </view>
			  </swiper-item>
			  			  
			  <swiper-item>
				 <view class="d-music">
					 
				 </view>
			  </swiper-item>
		 
		 </swiper>
		 
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import dnIcon from '../../components/dn-icon/dn-icon.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				userDto:{},
				id:'',
				// journalId:1,
				friend:'',
				photo:'',
				journal:'',
				journalList:[],
				juEs:[],
				bannercom: {},
				TabCur: 0,
				tabList: [{ name: '日志' }, { name: '相册' },{ name: '音乐' }],
				pictureNum:[]
				}
			},
	    components: {
			dnIcon,
			WucTab,
			uniPopup
		},
		methods:{
			getPictureNum(){
				var _self = this;
				uni.request({
					url:this.$baseUrl + '/photoalbum/all',
					method:'POST',
					data:{
						id:this.userDto.id,
					},
					success: (res) => {
						console.log(res.data.data)
						this.pictureNum = res.data.data
					}
				});
			},
			// getBannercom() {
			// 	let data = {
			// 		journalId:this.journalId
			// 	};
			// 	uni.request({
			// 		url:this.$baseUrl+'/journal/user/comment/1',
			// 		method:'POST',
			// 		success: (data) => {
			// 			uni.stopPullDownRefresh();
			// 			if (data.statusCode == 200) {
			// 				this.bannercom = data.data;
			// 			}
			// 		},
			// 		fail: (data, code) => {
			// 		    console.log('fail' + JSON.stringify(data));
			// 		}
			// 	})
			// },
			getBanner() {
				let data= {
					id:this.userDto.id
				};
			    uni.request({
			        url: this.$baseUrl+'/journal/user/journaldetail/'+this.juEs.id,
					method:'POST',
			        success: (data) => {
			            uni.stopPullDownRefresh();
			            if (data.statusCode == 200) {
			                this.banner = data.data;
			            }
			        },
			        fail: (data, code) => {
			            console.log('fail' + JSON.stringify(data));
			        }
			    })
			},
			getJuEs(){
				var _self = this;
				uni.request({
					url:this.$baseUrl + '/journal/user/data',
					method:'POST',
					data:{
						id:this.id,
					},
					success: (res) => {
						console.log(res.data.data)
						this.juEs = res.data.data
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
			open(){
			        // 需要在 popup 组件，指定 ref 为 popup
			         this.$refs.popup.open()
			},
			goDetail(item){
				let detail = {
					id:item.id,
					userId:item.userId,
					thumbnail:item.thumbnail,
					createTime:item.createTime,
					comments:item.comments,
					title:item.title,
					avatar:item.avatar,
					nickname:item.nickname,
					likes:item.likes,
					content:item.content
				}
			    uni.navigateTo({
					url: "../myj_detail/myj_detail?detailDate=" + encodeURIComponent(JSON.stringify(detail))
			    })
			},
			userSum: function(userDto) {
						uni.request({
							url: this.$baseUrl + '/user/sum',
							method: 'POST',
							header: {
								'content-type': 'application/json'
							},
							data: {
								id: this.id
							},
							success: res => {
								if (res.data.code === 1) {
									console.log(res.data.data)
									this.userDto = res.data.data;
									this.friend = res.data.data.friendSum;
									console.log(this.friend)
									this.photo = res.data.data.photoAlbumSum;
									this.journal = res.data.data.journalSum;
								}
							}
						});
					},
			getComments(item){
						let comments = {
							id:item.id,
							content:item.content,
							createTime:item.createTime,
							userId:item.userId,
							nickname:item.nickname,
							avatar:item.avatar
						}
						url: "../myj_detail/myj_detail?detailDate=" + encodeURIComponent(JSON.stringify(comments))
					},
					
		},
	 onLoad: function (option){
			console.log(option.id);
			this.id = option.id;
			console.log(this.id)
			this.userSum()
			
		}
	}
</script>

<style>
	.d-photo{
		width: 100%;
		display: flex;
	}
	.d-left{
		width: 50%;
	}
	.d-right{
		width: 50%;
	}
	.d-pic {
		width: 95%;
		height: 400upx;
		margin: 10upx;
	}
	.d-picll {
		width: 95%;
		height: 500upx;
		margin: 10upx;
	}
	.d-picl {
		width: 100%;
		height:70%;
	}
	.d-picl image{
		width: 100%;
		height: 100%;
	}
	.d-pic-name {
		width: 100%;
		height: 30%;
		
	}
	.mar {
		margin: 0 auto;
	}
	.d-image-l {
		display: flex;
		width: 100%;
		height: 500upx;
		background-color: #C0C0C0;
	}
	.d-image{
		flex: 0 0 33.33%;
		height: 50%;
	}
	.d-image-ll {
		width: 100%;
		height: 100%;
	}
	.d-my {
		width: 100%;
		height: 200upx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.d-my-left {
		width: 30%;
		height: 100%;
		flex-wrap: wrap;
	}
	.d-my-right {
		width: 70%;
		height: 70%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.d-nickname {
		height: 60upx;
		width: 90%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		color: #363636;
	}
	.d-intro {
		width: 95%;
		height: 60upx;
		color: #696969;
		display: flex;
		align-items: center;
		margin: 0 auto;
	}
	.d-nickname-l {
		font-size: 44upx;
	}
	.d-intro-l {
		font-size: 32upx;
	}
	.d-img {
		width: 150upx;
		height: 150upx;
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
		background-color: #007AFF;
		margin: 0 auto;
	}
	.ui-table{
		float: left;
		width: calc( 100% - 64px );
		background-color: #FFFFFF;
		border-top: 5px solid #EFEFF4;
		padding: 0 32px;
	}
	.ui-table>view{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #c3c3c3;
	}
	.ui-table>view>span{
		float: left;
		font-size: 35upx;
	}
	.ui-table>view>i{
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
		height: 80upx;
		width: 80upx;
		background-color: #FFFFFF;
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
		height: 300upx;
	}
	swiper{
	    box-sizing: border-box;
	}
	.text-center {
		height: 200upx;
	    text-align: center;
		color: #333333;
	}
	.dbox {
		width: 85%;
		height: 200upx;
		border-bottom: 1px solid #BBBBBB;
		margin-top: 4%;
	}
	.d-box-title {
		width: 100%;
		height: 22%;
		margin: 0 auto;
		font-size: 34upx;
		color: #4F4F4F;
	}
	.d-box-content {
		width: 100%;
		height: 60%;
		margin: 0 auto;
		font-size: 29upx;
		color: #8B8682;
	}
	.d-box-bottom {
		width: 95%;
		height: 18%;
		margin: 0 auto;
	}
	.d-box-content-l {
		width: 70%;
		height: 60%;
		overflow: hidden;
	}
	.d-box-content-img {
		width: 30%;
		height: 100%;
	}
	.d-box-img {
		width: 100%;
		height: 100%;
	}
	.d-box-bottom-icon {
		font-size: 30upx;
		color: #8B8682;
	}
</style>
