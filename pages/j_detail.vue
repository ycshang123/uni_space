<template>
	<view class="container">
		<view class="d-index-box">
			<view class="d-index-box-title group-row-between nowrap">
				<text>{{banner.title}}</text>
					<dn-icon type="fenxiang" size="20" color="#696969"></dn-icon>
			</view>
			<view class="d-index-box-l">
				<view class="group-row-between group-row-simple">
					<view class="group-row-simple">
						<image :src="banner.thumbnail" mode="" class="d-nick"></image>
						<text>{{banner.nickname}}</text>
					</view>
					<text>{{banner.createTime}}</text>
				</view>
			</view>
			<view class="d-index-box-ll">
				<scroll-view class="d-box" scroll-x="true">
				    <view class="d-box-item">
						<image src="../../static/advert.jpg" mode=""></image>
					</view>
				    <view class="d-box-item">
						<image src="../../static/img/1.jpg" mode=""></image>
					</view>
				    <view class="d-box-item">
						<image src="../../static/img/2.jpeg" mode=""></image>
					</view>
				</scroll-view>
			</view>
			<view class="d-index-box-ll group-row-simple">
				<view v-html="banner.content"></view>
			</view>
			<view class="d-index-box-lll group-row-between">
				<view class="d-icon-l">
					<dn-icon type="haoping" size="20" color="#BBBBBB"></dn-icon>
					<dn-icon type="fenxiang" size="20" color="#696969"></dn-icon>
				</view>
				<dn-icon type="collect" size="20" color="#BBBBBB"></dn-icon>
			</view>
			<uni-evaluate :list-data="evaluateData" :rate="rateData"/>
		</view>
	</view>
</template>

<script>
	import evaluateData from '../../common/list.js';
	import uniEvaluate from '../../components/xiujun-evaluate/uni-evaluate.vue';
	import dnIcon from '../../components/dn-icon/dn-icon.vue'
	export default {
	    components: {
			uniEvaluate,
			dnIcon
			},
		data() {
			return {
				banner: {},
				// bannercom:{},
				evaluateData:evaluateData,
				rateData:4.6
				}
			},
		methods:{
			getDetail() {
			    uni.request({
			        url: this.$baseUrl+'/journal/user/journaldetail/' + this.banner.id,
					method:'POST'
			    })
			},
			// getComments(){
			// 	uni.request({
			// 		url:this.$baseUrl+'/journal/user/comment/'+ this.bannercom.journalId,
			// 		method:'POST'
			// 	})
			// }
		},
			onLoad(event) {
			    // 目前在某些平台参数会被主动 decode，暂时这样处理。
			    try {
			        this.banner = JSON.parse(decodeURIComponent(event.detailDate));
					// this.bannercom = JSON.parse(decodeURIComponent(event.detailDate));
			    } catch (error) {
			        this.banner = JSON.parse(event.detailDate);
					// this.bannercom = JSON.parse(event.detailDate);
			    }
			
			    this.getDetail();
				// this.getComments();
			    uni.setNavigationBarTitle({
			        title: this.banner.title,
					// title: this.bannercom.title,
			    });
			},
	}
</script>

<style>
	.d-contentll-top-avaimg{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.d-content {
		width: 100%;	
		height: 300upx;
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
		background-color: #5677FC;
	}
	.d-index-box {
		width: 95%;
		height: 1000upx;
		margin: 0 auto;
	}
	.d-index-box-l {
		width: 100%;
		height: 15%;
		margin: 0 auto;
		border: 1px solid #000000;
	}
	.d-index-box-ll {
		width: 100%;
		height: 50%;
		margin: 0 auto;
		border: 1px solid #8D6E63;
	}
	.d-index-box-lll {
		width: 100%;
		height: 10%;
		margin: 0 auto;
		border: 1px solid #4CD964;
	}
	.d-index-box-llll {
		width: 100%;
		height: 7%;
		margin: 0 auto;
		border: 1px solid #5677FC;
	}
	.d-index-box-title {
		width: 100%;
		height: 10%;
		margin: 0 auto;
		border: 1px solid #8D6E63;
	}
	.d-index-box-llllll {
		width: 100%;
		height: 8%;
		margin: 0 auto;
		border: 1px solid #9FA8DA;
		
	}
	.d-nick {
		width: 80upx;
		height: 80upx;
		margin: 0 auto;
		border-radius: 50%;
	}
	.d-cover {
		width: 100%;
		height: 100%
	}
</style>
