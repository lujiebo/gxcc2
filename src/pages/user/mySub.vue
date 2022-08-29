<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="change" bar-width="100" bg-color="#F6F7F8"
			height="100"></u-tabs>
		<view class="u-p-lr-40">
			<view class="card" v-for="(item,index) in list.activity" @click="toDetail(item.id)">
				<image :src="item.firstcover" mode="aspectFill" lazy-load></image>
				<view class="u-p-20">
					<view class="title text-ellipsis-1">{{item.activityname}}</view>
					<view class="u-flex u-m-tb-15" style="align-items: baseline;">
						<view class="content text-ellipsis-1">活动时间:{{item.starttime}}至{{item.endtime}}</view>
					</view>
					<view class="u-flex u-m-tb-15" style="align-items: baseline;">
						<view class="content text-ellipsis-1">活动地址:{{item.address}}</view>
					</view>
					<view class="u-flex u-m-t-25 u-m-b-10 text-grey-content u-font-24">
						<view class="icon-database-2-line">+<span style="color: rgb(247,71,9);">{{item.score}}</span>分
						</view>
						<view class="icon-map-pin-user-line u-m-l-50">{{item.enrollcount}}人已参加</view>
					</view>
				</view>
			</view>
		</view>
		
		<u-empty text="暂无数据" mode="data" v-if="(list.activity.length==0) || (!list.activity)" margin-top="100"></u-empty>
		<u-loadmore v-if="(list.activity.length>0) && list.activity" :status="status" margin-top="20"/>
	</view>
</template>

<script>
	import mixin_list from '@/utils/list.js'
	export default {
		mixins: [mixin_list],
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				tabList: [{
					name: '进行中'
				}, {
					name: '已结束'
				}],
				current: 0,
				data: [],
				
				list_url: 'activity/activityList',
				// status: 'nomore',
				search_params: {
				},
				list:{activity:[]}
			}
		},
		onLoad() {
			this.getData()
			uni.$on('mySubUpdate', () => {
				this.getData()
			})
		},
		onUnload() {
			uni.$off('mySubUpdate')
		},
		methods: {
			change(index) {
				this.current = index;
				this.data = []
				this.getData()
			},

			getData() {
				if (this.current == 0) {
					this.list_url = 'activity/activityList'
				} else if (this.current == 1) {
					this.list_url = 'activity/activityListHistory'
				}
				
				this.getlist(true)

				// this.http.post(url, {}, 2).then((data) => {
				// 	this.data = data.activity
				// })
			},
			toDetail(id) {
				if (this.current == 0) {
					uni.navigateTo({
						url: '../volunteer/volunteerDetail?id=' + id + '&&isEdit=true'
					})
				} else {
					uni.navigateTo({
						url: '../activity/historyDetail?id='+id
					})
				}

			},
			// async onPullDownRefresh() {
			// 	await this.getData()
			// 	uni.stopPullDownRefresh();
			// },
		}
	}
</script>

<style>
	page {
		background-color: white;
		/* padding-bottom: calc(248rpx + env(safe-area-inset-bottom)); */
	}

	.card {
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.16);
		border-radius: 0 0 10rpx 10rpx;
		margin-top: 40rpx;
	}

	.card image {
		width: 100%;
		height: 260rpx;
		border-radius: 10rpx 10rpx 0 0;
		/* background-color: #cccccc; */
	}
</style>
