<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="tabItem" :is-scroll="false" :current="tab" @change="change1" bar-width="100"
			bg-color="#F6F7F8" height="100"></u-tabs>
		<view class="flex space-between u-m-t-30 u-p-lr-40 u-flex-wrap">
			<view class="tag" :class="current==inx?'tagIndex':''" v-for="(i,inx) in curItem" @click="change2(inx)">{{i.name}}</view>
		</view>
			<!-- <u-tabs :list="curItem"
			  :is-scroll="false" 
			  :current="current" 
			  @change="change2" 
			  :show-bar="false"
			  height="100"></u-tabs> -->
		<view class="u-p-lr-40">

			<view class="card card2" v-for="(item,index) in list.activitys" @click="tab==0?toActivity(item.id):toHistory(item.id)">
				<image style="width: 210rpx;height: 140rpx;" :src="item.firstcover" mode="aspectFill" lazy-load></image>
				<view class="content">
					<view class="title text-ellipsis-1">{{item.activityname}}</view>
					<view class="title font-normal" v-if="item.type == 1">{{item.enrollcount}}/{{item.needpeople}}人
					</view>
					<view class="title font-normal text-ellipsis-1" style="width: 70%;"
						v-if="item.type == 2 ||item.type == 3">{{item.organization}}</view>
					<view style="width: 300rpx;">
						<view class="text-ellipsis-1">{{item.starttime}}</view>
						<view class="text-ellipsis-1">{{item.schoolname}}</view>
					</view>
					<button v-if="tab == 0">{{item.type == 1?'加入':'预约'}}</button>
				</view>
			</view>
		</view>
		<u-empty text="暂无数据" mode="data" v-if="(list.activitys.length==0) || (!list.activitys)" margin-top="100">
		</u-empty>
		<u-loadmore v-if="(list.activitys.length>0) && list.activitys" :status="status" margin-top="20" />
	</view>
</template>

<script>
	import mixin_list from '@/utils/list.js'
	export default {
		mixins: [mixin_list],
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list_url: 'activity/activityListTotal',
				// status: 'nomore',
				search_params: {
					// order: 0,
					type: 0,
					time:0,
				},
				tabItem: [{
						name: '近期活动'
					},
					{
						name: '历史活动'
					}
				],
				tab:0,
				curItem: [{
					name: '全部'
				}, {
					name: '组队活动'
				}, {
					name: '宣讲活动',
				}, {
					name: '运动科普',
				}],
				current: 0,
				list: {
					activitys: []
				}
			}
		},
		onLoad() {
			this.getlist(true)
		},
		methods: {
			change1(index) {
				this.list.activitys = []
				this.tab = index;
				this.search_params.time = index
				this.getlist(true)
			},
			change2(index) {
				this.list.activitys = []
				this.current = index;
				this.search_params.type = index
				this.getlist(true)
			},
			toActivity(id) {
				uni.navigateTo({
					url: '../volunteer/volunteerDetail?id=' + id
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
	.tag{
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
	.tag:last-child{
		
	}
	.tagIndex {
		background-color:  rgba(66, 143, 252, 0.2);
		color:  rgba(66, 143, 252, 1);
	}
</style>
