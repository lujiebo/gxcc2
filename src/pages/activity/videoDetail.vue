<template>
	<view v-if="data" :class="uiStyle=='normal'?'':'elder'">
		<video :src="data.play_url" :autoplay="true" :poster="data.thumb"></video>
		<view class="title u-p-40">{{data.videoname}}</view>
		<view class="u-flex" style="color: #B3B1B2;">
			<view class="u-flex-col align-center" style="width: 33.3%;">
				<view>时长</view>
				<view class="u-m-t-20">
					<span class="font-bold u-font-32 text-black">
						{{data.duration}}
					</span>
				</view>
			</view>
			<view class="rightLine"></view>
			<view class="u-flex-col align-center" style="width: 33.3%;">
				<view>已看人数</view>
				<view class="u-m-t-20"><span class="font-bold u-font-32 text-black">{{data.viewtimes}}</span>人</view>
			</view>
			<view class="rightLine"></view>
			<view class="u-flex-col align-center" style="width: 33.3%;" @click="shoucang(data.collect)">
				<view>{{data.collect?'已收藏':'收藏'}}</view>
				<view class="icon-star-line u-m-t-20 u-font-32" v-if="!data.collect"></view>
				<view class="icon-star-fill u-m-t-20 u-font-32" style="color:#FEA72B"  v-if="data.collect"></view>
			</view>
		</view>
		<view class="card u-p-lr-40">
			<view class="title u-m-t-60 u-m-b-28 u-font-32">课程介绍</view>
			<view class="content">{{data.introduce?data.introduce:'暂无介绍'}}</view>
			<recommend :type="2"></recommend>
		</view>
	</view>
</template>

<script>
	import recommend from '../../component/recommend.vue'
	export default {
		components:{
			recommend
		},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id:null,
				data:null
			}
		},
		onLoad(option) {
			if(option.id) {
				this.id = option.id
				this.getData()
			}
		},
		methods: {
			getData(){
				this.http.post('activity/videoDetail',{
					id:this.id
				},2).then((data)=>{
					this.data = data.video
				})
			},
			shoucang(collect) {
				if(collect == 0) {
					this.http.post('activity/collect',{
						id:this.id
					},2).then(()=>{
						this.data.collect = 1
					})
				} else if(collect == 1) {
					this.http.post('activity/uncollect',{
						id:this.id
					},2).then(()=>{
						this.data.collect = 0
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	video {
		width: 100%;
		height: 400rpx;
	}
	
	.rightLine{
		height: 28rpx;
		border: 2rpx solid rgba(211, 211, 211, 1);
	}
	
	
	.tj {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40upx;
	}
	
	.tj .label {
		position: absolute;
		width: 110upx;
		height: 48upx;
		border-radius: 20upx 0px 20upx 0px;
		background-color: #00000060;
		top: 0;
		left: 0;
		color: white;
		padding: 10upx;
		font-size: 24upx;
	}
	
	.tj image {
		width: 320upx;
		height: 190upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
	}
</style>
