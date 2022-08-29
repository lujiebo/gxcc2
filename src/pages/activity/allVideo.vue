<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="item" :is-scroll="false" :current="current" @change="change" bar-width="100" bg-color="#F6F7F8"
			height="100"></u-tabs>
		<view class="u-flex u-flex-wrap space-between u-m-t-30 u-p-lr-40">
			<view class="card card3" v-for="(item,index) in list.videos" @click="toDetail(item.id)">
				<image :src="item.thumb" mode="aspectFill" lazy-load></image>
				<view class="icon-play-circle-line"></view>
				<view class="content">
					<view class="title text-ellipsis-1" v-if="item.belongtype == 0">宣讲活动</view>
					<view class="title text-ellipsis-1" v-if="item.belongtype == 1">运动科普</view>
					<view class="title text-ellipsis-1">{{item.videoname}}</view>
					<view class="gap"></view>
					<view style="margin-top: 15upx;display: flex;justify-content: space-between;">
						<view class="icon-time-line">{{item.duration}}</view>
						<view class="icon-eye-line u-flex"><view class="u-m-l-10">{{item.viewtimes}}</view></view>
					</view>
			
				</view>
			</view>
		</view>
		<u-empty text="暂无数据" mode="data" v-if="(list.videos.length==0) || (!list.videos)" margin-top="100"></u-empty>
		<u-loadmore v-if="(list.videos.length>0) && list.videos" :status="status" margin-top="20"/>
	</view>
</template>

<script>
	import mixin_list from '@/utils/list.js'
	export default {
		mixins: [mixin_list],
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				item: [{
					name: '全部视频'
				}, {
					name: '宣讲视频'
				}, {
					name: '科普视频',
				}],
				current: 0,
				
				list_url: 'activity/videoList',
				// status: 'nomore',
				search_params: {
					order:0,
					type:0
				},
				list:{videos:[]}
			}
		},
		onLoad() {
			this.getlist(true)
		},
		methods: {
			change(index) {
				this.current = index;
				this.search_params.type = index
				this.getlist(true)
			},
			toDetail(id) {
				uni.navigateTo({
					url:'videoDetail?id='+id
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: white;
	}
	

	.card2 {
		position: relative;
		height: auto;
		padding: 26rpx 0 28rpx 0;
		border-bottom: 2rpx solid rgba(232, 233, 236, 1);
	}

	.card2:last-child {
		border-bottom: 0;
	}

	.card2 button {
		position: absolute;
		right: 0;
		top: 90rpx;
		width: 120rpx;
		height: 60rpx;
	}
</style>
