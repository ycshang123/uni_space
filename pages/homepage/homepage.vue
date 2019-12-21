<template>
	<view class="container">
		
		<view class="d-hom-top">
			<image src="../../static/img/2.jpeg" mode="" class="d-hom-img-avatar"></image>
			<view class="d-hom-nickname group-row-simple">
				<text>抱抱我的猪</text>
			</view>	
			
			<view class="d-hom-gra group-row-around">
				<view><text class="d-hom-gra-l">1</text><text>关注我的人</text></view>
				<view><text class="d-hom-gra-l">69</text><text>我关注的人</text></view>
				<view><text class="d-hom-gra-l">69</text><text>总资产</text></view>
			</view>
		</view>
		
		
		<!-- <view class="d-content">
			<scroll-view class="d-box" scroll-x="true">
			    <view class="d-box-item">A</view>
			    <view class="d-box-item">B</view>
			    <view class="d-box-item">C</view>
			</scroll-view>
		</view> -->
		
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="text-center"></wuc-tab>
		<swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
		  <swiper-item>		    
		  <view class="d-con">
			  <view>
				  
				<view class="d-content">
					<view class="d-content-img">
						<image src="../../static/img/2.jpeg" mode="" class="d-content-img-l"></image>
					</view>
					<view class="d-content-right">
					<view class="d-content-title">
						<text>抱抱我的猪</text>
					</view>
					<view class="d-content-content">
						<text class="d-content-content-l">以往故事的性质都是走喜剧、搞笑路线。但自从漫画第47本德郎医生死后，风格开始转为黑暗、严肃外加些少的喜剧气氛。刊名为蜡笔小新图。</text>
					</view>
					</view>
				</view>	
				
				
			 </view>
					
			</view>
		  </swiper-item>
		  <swiper-item>
		    <view class="bg-white padding margin text-center text-black">
				<view class="d-contentll">
					<view class="d-contentll-top">
						<view class="d-contentll-top-left">
							<image src="../../static/img/2.jpeg" mode="" class="d-contentll-top-left-img"></image>
						</view>
						<view class="d-contentll-top-right">
							<view class="d-contentll-top-right-top group-row-between">
								<text class="d-contentll-top-right-top-nickanme">抱抱我的猪</text>
							</view>
							<view class="d-contentll-top-right-bottom">
								<text class="d-contentll-top-right-bottom-time">时间</text>
							</view>
						</view>
					</view>
					<view class="d-contentll-mid">
						<text class="zan">赞了该内容</text>
					</view>
					<view class="zan-content">
						<view class="zan-title group-row-between group-row-simple">
							<text class="zan-title-text">赞的内容标题</text>
						</view>
						<view class="zan-pic">
							<image src="../../static/img/1.jpg" mode="" class="zan-pic-pic"></image>
						</view>
					</view>
				</view>
			</view>
		  </swiper-item>
		  <swiper-item>
		    <view class="bg-white padding margin text-center text-black">
				<view class="three-box">
					<view class="three-box-top">
						标题文字
					</view>
					<view class="three-box-mid">
						内容样式自定义
					</view>
					<view class="three-box-bottom">
						tips
					</view>
				</view>
				
				
				
			</view>
		  </swiper-item>
		  
		</swiper>
		
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	export default {
	    data() {
	        return {
	          TabCur: 0,
	          tabList: [{ name: '动态' }, { name: '文章' },{ name: '更多' }]
	        }},
			components: {
					WucTab
				},
	    methods: {
	        tabChange(index) {
	            this.TabCur = index;
	        },
			swiperChange(e) {
			    let { current } = e.target;
			    this.TabCur = current;
			}
	    },
		onLoad() {
			
		},
		onReady() {}
	}
</script>

<style scoped>
	.d-hom-top {
		width: 85%;
		margin: 0 auto;
		height: 260upx;
		
	}
	.d-hom-img-avatar {
		width: 23%;
		height: 50%;
		border-radius: 50%;
	}
	.d-hom-nickname {
		width: 98%;
		margin: 0 auto;
		height: 35%;
		font-size: 40upx;
	}
	.d-hom-gra {
		width: 98%;
		margin: 0 auto;
		height: 15%;
		font-size: 30upx;
		border-bottom: 1upx solid #E0E0E0;
	}
	.d-hom-gra-l {
		color: #007AFF;
	}
	/* .d-content {
		width: 100%;	
		height: 500upx;
	}
	.d-box {
		width: 100%;
		height: 100%;
		white-space: nowrap;
	}
	.d-box-item {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: inline-block;
	} */
	.swiper {
	    height: 0 auto;
	}
	swiper {
	    box-sizing: border-box;
	}
	.text-center {
	    text-align: center;
		color: #333333;
		background-color: #ffffff;
	}
	.d-con {
		display: flex;
		justify-content: center;
	}
	.d-content {	
		width: 90%;
		height: 300upx;
		margin: 0 auto;
		display: flex;
		flex-wrap: nowrap;
		border-radius: 10upx;
		border: 1px solid #E0E0E0;
	}
	.d-content-img {
		width: 35%;
		height: 65%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.d-content-img-l {
		width: 50%;
		height: 40%;
		border-radius: 50%;
	}
	.d-content-right {
		width: 80%;
		height: 100%;
	}
	.d-content-title {
		display: flex;
		align-items: center;
		width: 100%;
		height: 30%;
		font-size: 40upx;
	}
	.d-content-content {
		width: 100%;
		height: 50%;
		font-size: 30upx;
	}
	.d-content-content-l {
		font-size: 25upx;
	}
	.d-contentll {
		width: 90%;
		height: 210upx;
		margin: 0 auto;
		border: 1px solid #E0E0E0;
	}
	.d-contentll-top {
		width: 100%;
		height: 30%;
		display: flex;
		flex-wrap: nowrap;
	}
	.d-contentll-mid {
		width: 25%;
		height: 20%;
	}
	.zan-content {
		width: 100%;
		height: 50%;
		background-color: #EEEEEE;
		display: flex;
		flex-wrap: nowrap;
	}
	.d-contentll-top-left {
		width: 18%;
		height: 100%;
	}
	.d-contentll-top-left-img {
		width: 80%;
		height: 100%;
		border-radius: 50%;
	}
	.d-contentll-top-right {
		width: 82%;
		height: 100%;
	}
	.d-contentll-top-right-top {
		width: 50%;
		height: 70%;
	}
	.d-contentll-top-right-bottom {
		width: 10%;
		height: 30%;
	}
	.d-contentll-top-right-top-nickanme {
		width: 90%;
		height: 100%;
	}
	.d-contentll-top-right-bottom-time {
		width: 60%;
		height: 100%;
		font-size: 25upx;
	}
	.zan {
		width: 10%;
		height: 100%;
		font-size: 25upx;
	}
	.zan-title {
		width: 80%;
		height: 100%;
		font-size: 28upx;
	}
	.zan-pic {
		width: 20%;
		height: 100%;
	}
	.zan-pic-pic {
		width: 100%;
		height: 100%;
	}
	.three-box {
		width: 85%;
		height: 200upx;
		border: 1upx solid #E0E0E0;
		margin: 0 auto;
	}
	.three-box-top {
		width: 100%;
		height: 25%;
		/* border-bottom: 1px solid #C8C7CC; */
	}
	.three-box-mid {
		width: 100%;
		height: 50%;
		/* border-bottom: 1px solid #C8C7CC; */
	}
	.three-box-bottom {
		width: 100%;
		height: 25%;
	}
</style>
