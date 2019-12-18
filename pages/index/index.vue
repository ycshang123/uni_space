<template>
	<view class="container">
		<view class="d-index-box mar" v-for="(item,index) in listData" :key="index">
			
			<view class="d-index-box-l nowrap group-row-between">
				<view class="d-nick-l nowrap group-row-simple">
					<image :src="item.avatar" mode="" class="d-nick"></image>
					<view class="d-text group-row-simple">
						<text class="d-text-color">{{item.nickname}}</text>
					</view>
				</view>
					<dn-icon type="tiaozhuan" size="17" color="#696969"></dn-icon>
				
			</view>
			
			<view class="d-index-box-title" @click="goDetail(item)" :id="key">
				<text>{{item.title}}</text>
			</view>
			
			<view class="d-content">
				
				
				<view v-html="item.content" class="d-content-l"></view>
			</view>
			<view class="d-index-box-ll">
				<scroll-view class="d-box" scroll-x="true">
				     <view class="d-box-item">
						<image :src="item.thumbnail" mode="" class="d-box-item-img"></image>
					</view>
				</scroll-view>
			</view>
			
			
			<view class="d-index-box-lll">
					<view>
						<view class="d-change" @click="changeColor(index)"><dn-icon type="haoping" size="20" :style="{ color:color[index] ? 'red' :'' }">dsvbh</dn-icon></view>
					</view>
					<view>
					<dn-icon type="xinxi" size="20" color="#696969"></dn-icon>
					</view>
					<view>
					<dn-icon type="collect" size="20" color="#696969"></dn-icon>
					</view>
					<view>
					<dn-icon type="fenxiang" size="20" color="#696969"></dn-icon>
					</view>
			</view>	
		</view>
		
	</view>
</template>

<script>
	import dnIcon from '../../components/dn-icon/dn-icon.vue'
	export default {
	    components: {
			dnIcon
			},
			data() {
				return {
					//点赞创建时间
					likeStatus: [],
					//点赞的数量
					likes: [],
					//是否已经点赞 true or false
					color: [],
					date: new Date(),
					userDto:{},
					id:1,
					journalId:1,
					listData:[],
					banner:{},
					// bannercom: {}
				};
			},
			methods: {
				//点赞换色
				changeColor(index) {
					//已经点赞
					if (this.color[index]) {
						//改变数组状态为false
						this.color.splice(index, 1, false);
						//点赞数减一
						this.likes.splice(index, 1, this.likes[index] - 1);
					} else {
						//改变数组状态为true
						this.color.splice(index, 1, true);
						//点赞数减一
						this.likes.splice(index, 1, this.likes[index] + 1);
					}
				},
				// 点赞的方法
				thumbUp(journalId) {
					// alert(journalId)
					// this.likeStatus[index] = this.formatDateTime();
					// this.changeColor(index);
					// console.log(this.likeStatus[index]);
					this.axios({
						method: 'put',
						url: this.GLOBAL.baseUrl + '/journal/user/journal/addlike',
						data: JSON.stringify({
							journalId: journalId,
							userId: JSON.parse(localStorage.getItem('user')).id
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(res => {});
				},
				// 取消点赞的方法
				thumDown(journalId) {
					// alert(journalId)
					// this.likeStatus[index] = null;
					// this.changeColor(index);
					// console.log(this.likeStatus[index]);
					this.axios({
						method: 'delete',
						url: this.GLOBAL.baseUrl + '/journal/user/journal/cancellike',
						data: JSON.stringify({
							journalId: journalId,
							userId: JSON.parse(localStorage.getItem('user')).id
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(res => {});
				},
				tapPopup(e){
					uni.showToast({
						title:e.title,
						icon:'none'
					})
				},
				taptext(e,index){
					this.x = e.touches[0].clientX
					this.y = e.touches[0].clientY
					
					this[`value${index}`] = !this[`value${index}`]
				},
				
				getBanner() {
					let data= {
						id:this.userDto.id,
					};
				    uni.request({
				        url: this.$baseUrl+'/journal/user/journaldetail/'+this.userDto.id,
						method:'POST',
				        success: (data) => {
				            uni.stopPullDownRefresh();
				            if (data.statusCode == 200) {
				                this.banner = data.data;
				            }
				        },
				        fail: (data, code) => {
				            console.log('fail' + JSON.stringify(data));
				        }
				    })
				},
				getList(){
					var _self = this;
					uni.request({
						url: this.$baseUrl + '/journal/index/data',
						method:'POST',
						data:{
							id:this.userDto.id,
						},
						success: (res) => {
							//请求成功后将日志列表数据赋值给listData
							console.log(res.data.data)
							this.listData = res.data.data
							
						}
					});
				},
				goDetail(item){
					let detail = {
						id:item.id,
						userId:item.userId,
						thumbnail:item.thumbnail,
						createTime:item.createTime,
						comments:item.comments,
						title:item.title,
						avatar:item.avatar,
						nickname:item.nickname,
						likes:item.likes,
						content:item.content
					}
				    uni.navigateTo({
						url: "../j_detail/j_detail?detailDate=" + encodeURIComponent(JSON.stringify(detail))
				    })
				},
			},
			onLoad() {
				let that = this;
				uni.getStorage({
					key: 'user',
					success: function(res) {
						that.userDto = res.data;
						console.log(that.userDto);
						that.getList();
						that.getBanner();
					}
				});
			}
		
	}	
</script>

<style>
	.d-change {
		background-color: #FFFFFF;
	}
	.red {
		background-color: #FF0000;
	}
	.d-content-l {
		height: 90%;
		overflow: hidden;
	}
	.d-icon-l {
		width: 80%;
	}
	.d-text-color {
		color: #F4A460;
	}
	.d-like-l {
		width: 100%;
		height: 100%;
	}
	.d-comment-ll {
		width: 100%;
		height: 100%;
	}
	.d-like {
		width: 20%;
		height: 100%;
		
	}
	.d-comment-l {
		width: 20%;
		height: 100%;
		
	}
	.d-content{
		width: 90%;
		height: 20%;
		color: 	#7A8B8B;
		margin: 0 auto;
		font-size: 13px;
		text-indent: calc(5%);
	}
	.d-fen-btn {
		width: 20%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}
	.mar {
		margin: 0 auto;
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
	}
	.d-box-item-img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.d-index-box {
		width: 100%;
		height: 700upx;
		margin-top: 4%;
		border: 1px solid #C8C7CC;
		background-color: #FFFFFF;
	}
	.d-index-box-l {
		width: 90%;
		height: 15%;
		margin: 0 auto;
	}
	.d-index-box-ll {
		width: 80%;
		height: 40%;
		border-radius: 10px;
		margin: 0 auto;
	}
	.d-index-box-lll {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 90%;
		height: 10%;
		margin: 0 auto;
	}
	.d-index-box-llll {
		width: 99%;
		height: 7%;
		margin: 0 auto;
	}
	.d-index-box-title {
		width: 90%;
		height: 15%;
		font-size: 42upx;
		font-weight: 550;
		color:#6C7B8B;
		margin:0 auto;
	}
	.d-index-box-llllll {
		width: 98%;
		height: 8%;
		margin: 0 auto;
		font-size: 30upx;
	}
	
	.d-nick-l {
		width: 80%;
		height: 100%;
	}
	.d-ri {
		margin-left: 3%;
	}
	.d-nick {
		width: 70upx;
		height: 70upx;
		margin: 0 auto;
		border-radius: 50%;
	}
	.d-nickl {
		width: 60upx;
		height: 80%;
		border-radius: 50%;
	}
	.d-text {
		width: 80%;
		height: 100%;
		font-size: 37upx;
	}
	.d-cover {
		width: 100%;
		height: 100%
	}
	.d-create {
		font-size: 30upx;
	}
</style>
