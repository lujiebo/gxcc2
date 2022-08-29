<template>
	<view class="searchArea">
		<view class="title-area">
			<view class="title">为您推荐</view>
		</view>
		<view class="u-flex u-flex-wrap u-row-between">
			<view class="card" v-for="(item,index) in video" @click="nav(item.id)">
				<image :src="item.thumb" mode="aspectFill" lazy-load></image>
				<view class="title text-ellipsis-1" style="width: 320upx;text-align: center;">{{item.videoname}}</view>
				<view class="label icon-fire text-ellipsis-1"><span style="margin-left: 5rpx;">{{item.viewtimes}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'recommend',
		props: {
			type: {
				type: Number,
				default: 1 //2.redirect
			},
		},
		data() {
			return {
				video: []
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.http.post('activity/videoList', {
					type: 0, //0:热门活动 1：组队活动 2：宣讲活动 3：运动科普
					pageNo: 1,
					pageSize: 4,
					order: 1 ///0:常规 1：随机  热门活动传1 随机推荐
				}, 2).then((data) => {
					this.video = data.videos
				})
			},
			nav(id) {
				if (this.type == 2) {
					uni.redirectTo({
						url: '/pages/activity/videoDetail?id=' + id
					})
				} else {
					uni.navigateTo({
						url: '/pages/activity/videoDetail?id=' + id
					})
				}

			}
		}
	}
</script>

<style>
	.title-area .title {
		font-size: 28upx;
	}
	.elder .title-area .title {
		font-size: 40rpx;
	}

	.searchArea .card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40upx;
	}

	.searchArea .card .label {
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

	.searchArea .card image {
		width: 320upx;
		height: 190upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
	}
</style>
