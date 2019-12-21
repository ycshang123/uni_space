<template>
	<view class="container">
		<view class="d-text">
			<view class="d-title">相册名称</view>
			<input type="text" class="d-content" v-model="albumtitle" @focus="clear()"/>
		</view>
		<view class="d-text">
			<view class="d-title">相册简介</view>
			<input type="text" class="d-content" v-model="content" @focus="clear()" />
		</view>
		<label>{{Tip}}</label>
		<sunui-upoos :upImgConfig="upImgOos" @onUpImg="upOosData" @onImgDel="delImgInfo" ref="uImage"></sunui-upoos>
		
		<button class="s-btn" @tap="addphotoAlbum">创建相册</button>	
		
		
	</view>
</template>

<script>
	var aliyunImg;
	import avatar from '../../components/yq-avatar/yq-avatar.vue';
	export default{
		components: {
			avatar
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'user',
				success: function(res) {
					that.userDto = res.data;
				}
			});
		} ,
		data() {
			return {
			photoAlbumDto:{},
			userDto:{},
			content:'',
			albumtitle:'',
			Tip:'',
			};
		},
		methods: {  
			clear(){
				this.Tip='';
			},
		addphotoAlbum(photoAlbumDto){
			if(this.albumtitle ==''){
				this.Tip ='相册名不能为空'
			}else{
				photoAlbumDto = this.photoAlbumDto;
				uni.request({
					url:this.$baseUrl+'/photoalbum/apa',
					method:"POST",
					data:{
						userId:this.userDto.id,
						introduction:this.content,
						name:this.albumtitle,
					},
					success : res =>{
						if(res.data.code ===1){
							uni.showToast({
								title:res.data.msg
							})
							uni.navigateTo({
								url:'/pages/addPhoto/addPhoto'
							}),
							uni.setStorage({
								key:'id',
								data:res.data.data.id
							})
						}else{
							uni.showToast({
								title:res.data.res
							})
						}
					}
				})
				
			}
		}
		},
	}
</script>

<style scoped>
	.d-text{
		width:100%;
		height: 100upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #C1CDC1;
	}
	.d-title{
		width: 30%;
		font-size: 16px;
		color: #8B7765;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.d-content{
		width: 60%;
		
	}
</style>
