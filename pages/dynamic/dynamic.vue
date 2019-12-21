<template>
	<view class="container">
		<view class="s-text">
			<input type="text"  placeholder="日志标题" class="s-input" v-model="title"/>
			<textarea placeholder="分享新鲜事......" maxlength="-1" v-model="content"></textarea>
		</view>
		<sunui-upoos :upImgConfig="upImgOos" @onUpImg="upOosData" @onImgDel="delImgInfo" ref="uImage"></sunui-upoos>
		<button class="s-btn" @tap="getUpImgInfoOos">发表</button>
	</view>
</template>

<script>
var aliyunImg;
import avatar from '../../components/yq-avatar/yq-avatar.vue';
export default {
	onLoad() {
		let that = this;
		uni.getStorage({
			key: 'user',
			success: function(res) {
				that.userDto = res.data;
			}
		});
	} ,
	components: {
		avatar
	},
	data() {
		return {
		userDto:{},
		content:'',
		title:'',
			oosArr: [],
			// 阿里云oos相关配置
			upImgOos: {
				aliConfig: {
					// 阿里云oos上传key_secret(后端传)
					AccessKeySecret: '5iB8rf4vSVl4HmqWOMPIOkAgzmPvI8',
					// 阿里云oos上传key_id(后端传)
					OSSAccessKeyId: 'LTAI4wU5hODbg7FX',
					// 阿里云oos上传目录(必须存在)
					oosDirectory: 'uniapp',
					// 阿里云上传url
					url: 'http://sunui-uniapp.oss-cn-beijing.aliyuncs.com/'
				},
				// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
				notli: true,
				// 图片数量
				count: 9,
				// 上传图片背景修改
				upBgColor: '#E8A400',
				// 上传icon图标颜色修改(仅限于iconfont)
				upIconColor: '#eee',
				// 上传svg图标名称
				upSvgIconName: 'icon-certificate'
			}
		};
	},
	methods: {
		uImageTap() {
			this.$refs.uImage.uploadimage(this.upImgOos);
		},
		// 删除图片 -2019/05/12(本地图片进行删除)
		async delImgInfo(e) {
			console.log('你删除的图片地址为:', e, this.oosArr.splice(e.index, 1));
		},
		// 阿里云
		async upOosData(e) {
			// 上传图片数组
			let arrImg = [];
			for (let i = 0, len = e.length; i < len; i++) {
				try {
					if (e[i].path_server != '') {
						await arrImg.push(e[i].path_server.split(','));
					}
				} catch (err) {
					console.log('上传失败...');
				}
			}
			// 图片信息保存到data数组
			this.oosArr = arrImg;

			// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
			if (arrImg.length == this.upImgOos.count) {
				uni.showToast({
					title: `上传成功`,
					icon: 'none'
				});
			}
		},
		// 获取上传图片阿里云
		getUpImgInfoOos() {
			console.log('阿里云转成一维数组:', this.oosArr.join().split(','));
			this. addUserJournal()
		},
          addUserJournal(){
			  uni.request({
			  	url:this.$baseUrl+'/journal/user/journal/mobilejournal',
				method:'PUT',
				data:{
					userId:this.userDto.id,
					content:this.content,
					title:this.title,
					urls:this.oosArr.join().split(',')
							},
				
				success : res =>{
					if(res.data.code ===1){
						uni.showToast({
							title:'发表成功'
						})
					}
				}
			  })
		  },	
	},
	
};
</script>

<style>

.s-text{
	width:100%;

}
.s-btn{
	width: 100%;
	background:#3498DB;
	color: #FFFFFF;
}
.s-input{
	width: 100%;
	height: 80upx;
	 border-bottom:1px solid #CCCCCC;
}
</style>