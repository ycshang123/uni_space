<template>
    <view class="container">
                <scroll-view class="box" scroll-x="true" scroll-left="50upx">
                    <view class="box-item">A</view>
                    <view class="box-item">B</view>
                    <view class="box-item">C</view>
                </scroll-view>
				<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
				<swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
				  <swiper-item>
				    <div class="bg-white padding margin text-center text-black">gfbbbbbbbbbbbbbbbbbbbbbbbbb</div>
				  </swiper-item>
				  <swiper-item>
				    <div class="bg-white padding margin text-center text-black">fvjjsxgfhbffhggggggggggggggg</div>
				  </swiper-item>
				  <swiper-item>
				    <div class="bg-white padding margin text-center text-black">ffffffffffffffffffffffffffffffffffffffffff</div>
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

<style>
	swiper {
	    box-sizing: border-box;
	}
	.box {
		width: 100%;
		height: 200rpx;
		white-space: nowrap;
		border: 1px solid red;
		box-sizing: border-box;
	}
	.box-item {
		width: 100%;
		height: 100%;
		border: 2rpx solid green;
		box-sizing: border-box;
		display: inline-block;
	}
	.swiper {
	    height: 140upx;
	}
</style>
