<template>
	<view class="container">
	<view class="s-region">当前选择城市</view>
	<view class="s-region">
		<picker mode="region" :value="region">
			<view class="s-region">{{region}}</view>
		</picker>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				region:''
			}
		}
	}
</script>

<style scoped>
	.s-region{
		width: 100%;
		height: 60upx;
	}
</style>
