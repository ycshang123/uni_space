<template>
	<view class="container">
		<view class="d-index-box">
			<view class="d-index-box-title group-row-between nowrap">
				<text>{{banner.title}}</text>
				<uni-icons type="more" size="30" style="color: #BBBBBB"></uni-icons>
			</view>
			<view class="d-index-box-lll group-row-between">
				<view class="d-icon-l">
					{{banner.likes}}
					<uni-icons type="star-filled" size="20" style="color: #BBBBBB"></uni-icons>
					{{banner.comments}}
					<uni-icons type="chatbubble" size="20" style="color: #BBBBBB"></uni-icons>
					<uni-icons type="compose" size="20" style="color: #BBBBBB"></uni-icons>
					<text>分别为点赞数，评论数，分享</text>
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
				<text>{{banner.content}}</text>
			</view>
			<view class="d-index-box-llllll group-row-between">
				<view></view>
				<text>{{banner.createTime}}</text>
			</view>
			<view class="d-index-box-l">
				<text>所有评论</text>
			</view>
			<view class="d-comment">
				<view class="d-comment-top">
					<view class="d-comment-top-ava">
						<image :src="bannercom.avatar" mode="" class="d-contentll-top-avaimg"></image>
					</view>
					<view class="d-comment-top-right">
						<view class="d-comment-top-right-top">
							{{bannercom.nickname}}
						</view>
						<view class="d-comment-top-right-bottom">
							{{bannercom.content}}
						</view>
					</view>
				</view>
				<view class="d-comment-bottom">
					{{bannercom.createTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

	export default {
		data() {
			return {
				banner: {},
				bannercom:{}
			}
		},
		components: {uniIcons},
		methods: {
			getDetail() {
				    uni.request({
				        url: 'http://localhost:8080/api/journal/user/journaldetail/' + this.banner.id,
						method:'POST'
				    })
				},
			getComments(){
					uni.request({
						url:'http://localhost:8080/api/journal/user/comment/'+ this.bannercom.journalId,
						method:'POST'
					})
				}
			},
			
			onLoad(event) {
			    // 目前在某些平台参数会被主动 decode，暂时这样处理。
			    try {
			        this.banner = JSON.parse(decodeURIComponent(event.detailDate));
					this.bannercom = JSON.parse(decodeURIComponent(event.detailDate));
			    } catch (error) {
			        this.banner = JSON.parse(event.detailDate);
					this.bannercom = JSON.parse(event.detailDate);
			    }
			
			    this.getDetail();
				this.getComments();
			    uni.setNavigationBarTitle({
			        title: this.banner.title,
					title: this.bannercom.title,
			    });
			},
	}
</script>

<style>
	.d-comment {
		width: 95%;
		height: 300upx;
		background-color: #EF9A9A;
	}
	.d-comment-top {
		width: 100%;
		height: 40%;
		border: 1px solid #007AFF;
	}
	.d-comment-bottom {
		width: 90%;
		height: 60%;
		border: 1px solid #8D6E63;
	}
	.d-comment-top-ava {
		width: 25%;
		height: 100%;
		border: 1px solid #DD524D;
	}
	.d-comment-top-right {
		width: 75%;
		height: 100%;
		border: 1px solid #FF5053;
	}
	.d-comment-top-right-top {
		width: 100%;
		height: 30%;
		border: 1px solid #808080;
	}
	.d-comment-top-right-bottom {
		width: 100%;
		height: 70%;
		border: 1px solid #FF0000;
	}
	.d-contentll-top-avaimg{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.d-content {
		width: 100%;	
		height: 300upx;
		border: 1px solid #8D6E63;
	}
	.d-box {
		width: 100%;
		height: 100%;
		white-space: nowrap;
		border: 1px solid #8D6E63;
	}
	.d-box-item {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: inline-block;
	}
	.d-index-box {
		width: 95%;
		height: 1000upx;
		margin: 0 auto;
		border: 1px solid #8D6E63;
	}
	.d-index-box-l {
		width: 100%;
		height: 8%;
		margin: 0 auto;
		border: 1px solid #8D6E63;
	}
	.d-index-box-ll {
		width: 100%;
		height: 30%;
		border: 1px solid #8D6E63;
		margin: 0 auto;
	}
	.d-index-box-lll {
		width: 100%;
		height: 10%;
		margin: 0 auto;
	}
	.d-index-box-llll {
		width: 100%;
		height: 7%;
		margin: 0 auto;
		border: 1px solid #8D6E63;
	}
	.d-index-box-title {
		width: 100%;
		height: 15%;
		margin: 0 auto;
		border: 1px solid #8D6E63;
	}
	.d-index-box-llllll {
		width: 100%;
		height: 7%;
		margin: 0 auto;
		border: 1px solid #8D6E63;
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
