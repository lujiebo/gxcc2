<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="tabItem" :is-scroll="false" :current="tab" @change="change1" bar-width="100" bg-color="#F6F7F8"
			height="100"></u-tabs>
		<view class="u-p-lr-40">

			<view class="card card2" v-for="(item,index) in list.list"
				@click="tab==0?toCourseDetail(item.id):toHistory(item.id)">
				<image style="width: 210rpx;height: 140rpx;" :src="item.courseware_img_path" mode="aspectFill"
					lazy-load></image>
				<view class="content">
					<view class="title text-ellipsis-1">{{item.courseware_name}}</view>
					<view style="width: 300rpx;">
						<view class="text-ellipsis-1">{{item.date}}</view>
						<view class="text-ellipsis-1">{{item.time_section_name}}</view>
						<view class="text-ellipsis-1">{{item.site_name}}</view>

					</view>
					<button v-if="tab == 0 && isApply">报名</button>
				</view>
			</view>
		</view>
		<u-empty text="暂无数据" mode="data" v-if="(list.list.length==0) || (!list.list)" margin-top="100">
		</u-empty>
		<u-loadmore v-if="(list.list.length>0) && list.list" :status="status" margin-top="20" />
	</view>
</template>

<script>
	import mixin_list from '@/utils/list1.js'
	export default {
		mixins: [mixin_list],
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list_url: '/api/course',
				// status: 'nomore',
				search_params: {
				},
				formate:true, //返回值转换
				tabItem: [{
						name: '近期课程'
					},
					{
						name: '历史课程'
					}
				],
				tab: 0,
				current: 0,
				list: {
					list: []
				},
				isApply: false
			}
		},
		onLoad() {
			this.getlist(true)
			let user = uni.getStorageSync('user')

			if (user.type == 102) {
				this.isApply = true
			}

		},
		methods: {
			change1(index) {
				this.list.list = []
				this.tab = index;
				
				if (index == 1) //历史课程
					this.search_params.history = 1
				else
					delete this.search_params.history
				console.log(this.search_params)

				this.getlist(true)
			},
			toCourseDetail(id) {
				uni.navigateTo({
					url: 'courseDetail?id=' + id
				})
			},
			toHistory(id) {
				uni.navigateTo({
					url: 'historyDetail?id=' + id
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


	.elder .card2 image {
		height: 220rpx !important;
	}

	.elder .tag {
		font-size: 36rpx;
	}

	.tag {
		background-color: #F6F7F8;
		font-size: 24rpx;
		color: black;
		padding: 10rpx 35rpx;
		/* width: 25%; */
		margin-right: 20rpx;
		font-weight: normal;
		margin: 0;
		margin-bottom: 20rpx;
	}

	.tag:last-child {}

	.tagIndex {
		background-color: rgba(66, 143, 252, 0.2);
		color: rgba(66, 143, 252, 1);
	}
</style>
