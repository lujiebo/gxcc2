<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bar-width="100" bg-color="#F6F7F8"
			height="100"></u-tabs>
		<view class="u-p-r-40 u-p-l-60">
			<view class="card" :class="current==1?'yiweixiu':''" v-for="(item,index) in data" :key="index"
				@click="toDetail(item.id)">
				<view class="title">{{new Date(parseInt(item.create_time)*1000).toLocaleDateString()}}</view>
				<view class="content">
					<view class="item">
						<view>报修名称</view>
						<view class="text-black">{{item.infrastructure}}</view>
					</view>
					<view class="item">
						<view>报修地址</view>
						<view class="text-black">{{item.schoolname}}</view>
					</view>
					<view class="item">
						<view>报修描述</view>
						<view class="text-black">{{item.description}}</view>
					</view>
					<view class="item u-font-28" v-if="current == 1">
						<view style="color: #00B578;">处理时间</view>
						<view style="color: #00B578;">{{new Date(parseInt(item.finishtime)*1000).toLocaleDateString()}}</view>
					</view>
				</view>

			</view>
		</view>
		<u-empty text="暂无数据" mode="data" v-if="data.length == 0" margin-top="100"></u-empty>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list: [{
					name: '待处理'
				}, {
					name: '已处理'
				}],
				current: 0,
				data: [],
			}
		},
		onUnload() {
			uni.$off('success')
		},
		onLoad() {
			this.getData()
			uni.$on('success', (data) => {
				this.data = []
				this.current = data 
				this.getData()
			})
		},
		methods: {
			change(index) {
				this.data = []
				this.current = index;
				this.getData()
			},
			getData() {
				this.http.post('repair/repairlist', {
					status:this.current
				}, 2).then((data) => {
					this.data = data.list
				})

			},
			async onPullDownRefresh() {
				await this.getData()
				uni.stopPullDownRefresh();
			},
			toDetail(id) {
				uni.navigateTo({
					url: 'baoxiuDetail?id=' + id +'&&type=' + this.current +'&&repair=true'
				})
			},
		}
	}
</script>

<style>
	page {
		padding-bottom: calc(248upx + env(safe-area-inset-bottom));
	}

	.card {
		width: 100%;
		min-height: 280rpx;
		background-color: white;
		border-radius: 8rpx;
		filter: drop-shadow(#F99D18 -20rpx 0);
		margin-top: 30rpx;
		padding: 26rpx 34rpx 16rpx 28rpx;
	}

	.yiweixiu {
		filter: drop-shadow(#00B578 -20rpx 0);
	}

	.card .title {
		padding-bottom: 20rpx;
		font-weight: normal;
		border-bottom: 2rpx dashed rgb(187, 187, 187);
	}

	.card .content {
		margin-top: 24rpx;
	}

	.card .content .item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 16rpx 0;
	}

	.bottom {
		background-color: #E7F1FF;
	}

	.bottom button {
		height: 72rpx;
		border-radius: 36rpx;
		width: 360rpx;
		margin: 0 auto;
	}
</style>
