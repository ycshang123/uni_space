<template>
	<view class="container">
		
		<view class="d-hom-top">
			<image src="../../static/img/1.jpg" mode="" class="d-hom-img-avatar"></image>
			<view class="d-hom-nickname group-row-simple">
				<text>等待那么漫长</text>
			</view>	
			
			<view class="d-hom-gra group-row-around">
				<view><text class="d-hom-gra-l">1</text><text>关注我的人</text></view>
				<view><text class="d-hom-gra-l">69</text><text>我关注的人</text></view>
				<view><text class="d-hom-gra-l">69</text><text>总资产</text></view>
			</view>
		</view>
		
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		<swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
		  <swiper-item>		    
				<view class="d-content">
					<view class="d-content-img">
						<image src="../../static/img/1.jpg" mode="" class="d-content-img-l"></image>
					</view>
					<view class="d-content-right">
					<view class="d-content-title">
						<text>蜡笔小新</text>
					</view>
					<view class="d-content-content">
						<text class="d-content-content-l">以往故事的性质都是走喜剧、搞笑路线。但自从漫画第47本德郎医生死后，风格开始转为黑暗、严肃外加些少的喜剧气氛。刊名为蜡笔小新，小新是主角的名字，蜡笔是幼稚园小朋友常用的绘图用具，以表示作品是描述幼稚园时期的小新。此外，漫画29卷和31卷中有升上小学1年级的小新，名称为“铅笔小新”。</text>
					</view>
					</view>
				</view>
					
					
					<view class="d-content">
						<view class="d-content-img">
							<image src="../../static/img/1.jpg" mode="" class="d-content-img-l"></image>
						</view>
						<view class="d-content-right">
						<view class="d-content-title">
							<text>蜡笔小新</text>
						</view>
						<view class="d-content-content">
							<text class="d-content-content-l">以往故事的性质都是走喜剧、搞笑路线。但自从漫画第47本德郎医生死后，风格开始转为黑暗、严肃外加些少的喜剧气氛。刊名为蜡笔小新，小新是主角的名字，蜡笔是幼稚园小朋友常用的绘图用具，以表示作品是描述幼稚园时期的小新。此外，漫画29卷和31卷中有升上小学1年级的小新，名称为“铅笔小新”。</text>
						</view>
						</view>
					</view>		
					
					
					<view class="d-content">
						<view class="d-content-img">
							<image src="../../static/img/1.jpg" mode="" class="d-content-img-l"></image>
						</view>
						<view class="d-content-right">
						<view class="d-content-title">
							<text>蜡笔小新</text>
						</view>
						<view class="d-content-content">
							<text class="d-content-content-l">以往故事的性质都是走喜剧、搞笑路线。但自从漫画第47本德郎医生死后，风格开始转为黑暗、严肃外加些少的喜剧气氛。刊名为蜡笔小新，小新是主角的名字，蜡笔是幼稚园小朋友常用的绘图用具，以表示作品是描述幼稚园时期的小新。此外，漫画29卷和31卷中有升上小学1年级的小新，名称为“铅笔小新”。</text>
						</view>
						</view>
					</view>		
					
					
					<view class="d-content">
						<view class="d-content-img">
							<image src="../../static/img/1.jpg" mode="" class="d-content-img-l"></image>
						</view>
						<view class="d-content-right">
						<view class="d-content-title">
							<text>蜡笔小新</text>
						</view>
						<view class="d-content-content">
							<text class="d-content-content-l">以往故事的性质都是走喜剧、搞笑路线。但自从漫画第47本德郎医生死后，风格开始转为黑暗、严肃外加些少的喜剧气氛。刊名为蜡笔小新，小新是主角的名字，蜡笔是幼稚园小朋友常用的绘图用具，以表示作品是描述幼稚园时期的小新。此外，漫画29卷和31卷中有升上小学1年级的小新，名称为“铅笔小新”。</text>
						</view>
						</view>
					</view>		
		  </swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	          TabCur: 0,
	          tabList: [{ name: '动态' }, { name: '文章' },{ name: '更多' }]
	        }},
	    
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
	.swiper {
	    height: 140upx;
	}
	swiper {
	    box-sizing: border-box;
	}
	.d-content {
		width: 90%;
		height: 200upx;
	}
	.d-content-img {
		width: 20%;
		height: 100%;
		background-color: #F1F1F1;
	}
	.d-content-img-l {
		width: 25%;
		height: 100%;
		border-radius: 50%;
	}
	.d-content-right {
		width: 80%;
		height: 100%;
		background-color: #C8C7CC;
	}
	.d-content-title {
		width: 100%;
		height: 30%;
		background-color: #008000;
	}
	.d-content-content {
		width: 100%;
		height: 70%;
		background-color: #424242;
	}
	.d-content-content-l {
		font-size: 20upx;
	}
</style>
