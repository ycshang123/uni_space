<template>
	<view class="container">
		<view class="marl">
		<view class="d-index-box">
			<view class="d-index-box-title group-row-between nowrap">
				<text class="d-title group-row-simple">{{banner.title}}</text>
<!-- 					<dn-icon type="fenxiang" size="18" color="#696969"></dn-icon>
 -->			</view>
			<view class="d-index-box-l">
				<view class="group-row-between">
					<view class="group-row-simple">
						<image :src="banner.avatar" mode="" class="d-nick"></image>
						<text class="d-nickname-colo">{{banner.nickname}}</text>
					</view>
					<text class="d-create-time">{{banner.createTime}}</text>
				</view>
			</view>
			<view class="d-index-box-ll group-row-center">
				<image :src="banner.thumbnail" mode="" class="d-box"></image>
			</view>
			<view class="d-index-box-ll group-row-simple">
				<view v-html="banner.content"></view>
			</view>
			<view class="d-index-box-lll">
				<view>
					<dn-icon type="haoping" size="20" color="#BBBBBB"></dn-icon>
				</view>
				<view>
					<dn-icon type="collect" size="20" color="#BBBBBB"></dn-icon>
				</view>
				<view>
					<dn-icon type="fenxiang" size="20" color="#BBBBBB"></dn-icon>
				</view>
			</view>
			<uni-evaluate :list-data="evaluateData" :rate="rateData"/>
		</view>
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
		},
			onLoad(event) {
			    // 目前在某些平台参数会被主动 decode，暂时这样处理。
			    try {
			        this.banner = JSON.parse(decodeURIComponent(event.detailDate));
			    } catch (error) {
			        this.banner = JSON.parse(event.detailDate);
			    }
			    this.getDetail();
			    uni.setNavigationBarTitle({
			        title: this.banner.title,
			    });
			},
	}
</script>

<style> 
	.marl {
		margin: 0 auto;
	}
	.d-title {
		font-size: 38upx;
		color: #668B8B;
		font-weight: 550;
	}
	.d-nickname-colo {
		width: 100%;
		margin-left: 5%;
		font-size: 30upx;
		color: #F4A460;
	}
	.d-create-time{
		font-size: 25upx;
		color: #B5B5B5;
	}
	.d-contentll-top-avaimg{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.d-content {
		width: 100%;	
		overflow: hidden;
		height: 300upx;
	}
	.d-index-box {
		width: 93%;
		box-shadow: 1px 1px 1px 1px #E8E8E8;
		/* border: 1px solid #CFCFCF; */
		height: 0 auto;
		margin-top: 2%;
		margin: 0 auto;
	}
	.d-index-box-l {
		width: 96%;
		/* height: 15%; */
		margin: 0 auto;
	}
	.d-index-box-ll {
		width: 95%;
		height: 40%;
		border-radius: 10px;
		font-size: 15px;
		color: #7A8B8B;
		margin: 0 auto;
		margin-top: 21upx;
		overflow: hidden;
	}
	.d-index-box-lll {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0 auto;
	}
	.d-index-box-llll {
		width: 100%;
		height: 7%;
		margin: 0 auto;
	}
	.d-index-box-title {
		width: 98%;
		height: 10%;
		font-size: 20px;
		color: #2F4F4F;
		margin: 0 auto;
	}
	.d-index-box-llllll {
		width: 100%;
		height: 8%;
		margin: 0 auto;
	}
	.d-nick {
		width: 80upx;
		height: 70upx;
		border-radius: 50%;
	}
	.d-cover {
		width: 100%;
		height: 100%
	}
</style>
