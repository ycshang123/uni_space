<template>
	<view class="container">
		<view class="a">
			<view class="b">性别</view>
			<view class="c">
				<picker @change="bindPickerChange" :value="index" :range="constellationList">
					<view>{{constellationList[index]}}</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// title: 'picker',
	
			constellationList:['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天枰座','射手座','摩羯座','水瓶座','双鱼座'],
			index:0,	
			}
			},
			methods:{
				bindPickerChange:function(e) {
					this.index = e.target.value
				}
		}
	}
</script>

<style>
	.a{
		width: 100%;
		height: 200upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.b{
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.c{
		width: 70%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
