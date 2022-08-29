<template>
	<view class="all" :class="uiStyle=='normal'?'':'elder'">
		<view class="top" @click="nav(1)">
			<view class="title">预约场地</view>
			<view class="u-m-tb-10">健康在于锻炼</view>
			<button>立即前往</button>
			<image src="../../static/activity.png"></image>
			<view class="icon-Rightbutton-fill"></view>
		</view>
		<view class="u-flex space-between u-m-t-36">
			<view class="item" @click="nav(2)">
				<view class="title">我要组队</view>
				<view class="content">打造<span style="color:#FF6A2A">团队</span>健身圈</view>
				<button class="btn-orange">立即前往</button>
				<view class="icon-Rightbutton-fill"></view>
				<view class="icon-horn"></view>
			</view>
			<view class="item item2" @click="nav(3)">
				<view class="title">我要科普</view>
				<view class="content">助力<span style="color:#FF6A2A">科学</span>健身</view>
				<button>立即前往</button>
				<view class="icon-Rightbutton-fill"></view>
				<view class="icon-bookmark"></view>
			</view>
		</view>
		<view class="tabBar1">
			<view class="u-flex u-m-t-30 space-between">
				<!-- <view style="width: 100%;">
					<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bar-width="100">
					</u-tabs>
				</view> -->
				<view class="title">热门活动</view>
				<view class="text-blue other" @click="nav(4)">查看全部</view>
			</view>
			<view class="card card2" v-for="(item,index) in activity" @click="toActivity(item.id)">
				<image style="width: 210rpx;height: 140rpx;" :src="item.cover[0].url" mode="aspectFill" lazy-load>
				</image>
				<view class="content">
					<view class="title text-ellipsis-1">{{item.activityname}}</view>
					<view class="title font-normal" v-if="item.type == 1">{{item.enrollcount}}/{{item.needpeople}}人
					</view>
					<view class="title font-normal text-ellipsis-1" style="width: 70%;" v-if="item.type == 2 ||item.type == 3">{{item.organization}}</view>
					<view style="width: 300rpx;">
						<view class="text-ellipsis-1">{{item.starttime}}</view>
						<view class="text-ellipsis-1 u-m-t-5">{{item.schoolname}}</view>
					</view>
					<button>{{item.type == 1?'加入':'预约'}}</button>
				</view>
			</view>

			<u-empty text="暂无数据" mode="data" v-if="(activity.length==0) || (!activity)" margin-top="20"></u-empty>


		</view>
		<view class="tabBar2">
			<view class="u-flex u-m-t-30 space-between">
				<!-- <view style="width: 100%;">
					<u-tabs :list="list2" :is-scroll="false" :current="current2" @change="change2" bar-width="100">
					</u-tabs>
				</view> -->
				<view class="title">热门视频</view>
				<view class="text-blue other" @click="nav(5)">查看全部</view>
			</view>

			<view class="u-flex u-flex-wrap space-between u-m-t-30">
				<view class="card card3" v-for="(item,index) in video" @click="toViedeoDetail(item.id)">
					<image :src="item.thumb" mode="aspectFill" lazy-load>
					</image>
					<view class="icon-play-circle-line"></view>
					<view class="content">
						<view class="title text-ellipsis-1" v-if="item.belongtype == 0">宣讲活动</view>
						<view class="title text-ellipsis-1" v-if="item.belongtype == 1">运动科普</view>
						<view class="title text-ellipsis-1">{{item.videoname}}</view>
						<view class="gap"></view>
						<view style="margin-top: 15upx;display: flex;justify-content: space-between;">
							<view class="icon-time-line">{{item.duration}}</view>
							<view class="icon-eye-line u-flex">
								<view class="u-m-l-10">{{item.viewtimes}}</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<u-empty text="暂无数据" mode="data" v-if="(video.length==0) || (!video)" margin-top="20"></u-empty>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list: [{
					name: '热门活动'
				}, {
					name: '组队活动'
				}, {
					name: '宣讲活动',
				}, {
					name: '运动科普',
				}],
				current: 0,
				activity: [],
				list2: [{
					name: '热门视频'
				}, {
					name: '宣讲视频'
				}, {
					name: '科普视频',
				}],
				current2: 0,
				video: []
			}
		},
		onLoad() {
			this.getActivity()
			this.getVideo()
		},
		methods: {
			change(index) {
				this.current = index;
				this.getActivity()
			},
			change2(index) {
				this.current2 = index;
				this.getVideo()
			},
			nav(index) {
				if (index == 1) {
					uni.switchTab({
						url: '../yuyue/index'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: 'team'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: 'kepu'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: 'allActivity'
					})
				} else if (index == 5) {
					uni.navigateTo({
						url: 'allVideo'
					})
				}
			},
			toViedeoDetail(id) {
				uni.navigateTo({
					url: 'videoDetail?id=' + id
				})
			},
			toActivity(id) {
				uni.navigateTo({
					url: '../volunteer/volunteerDetail?id=' + id
				})
			},

			getActivity() {
				this.http.post('activity/activityListTotal', {
					type: this.current, //0:热门活动 1：组队活动 2：宣讲活动 3：运动科普
					pageNo: 1,
					pageSize: 3,
					order: this.current ? 0 : 1 ///0:常规 1：随机  热门活动传1 随机推荐
				}, 2).then((data) => {
					this.activity = data.activitys
				})
			},
			getVideo() {
				this.http.post('activity/videoList', {
					type: this.current2, //0:热门活动 1：组队活动 2：宣讲活动 3：运动科普
					pageNo: 1,
					pageSize: 4,
					order: this.current2 ? 0 : 1 ///0:常规 1：随机  热门活动传1 随机推荐
				}, 2).then((data) => {
					this.video = data.videos
				})
			},
			async onPullDownRefresh() {
				await this.getActivity()
				await this.getVideo()
				uni.stopPullDownRefresh()
			},
		}
	}
</script>


<style>
	page {
		background-color: white;
	}

	.all {
		padding: 0 40rpx;
	}
	

	.top {
		position: relative;
		margin-top: 24rpx;
		width: 100%;
		height: 220rpx;
		border-radius: 10rpx;
		background-color: rgba(66, 143, 252, 1);
		padding: 28rpx 20rpx 20rpx 40rpx;
		color: white;
		font-size: 26rpx;
	}

	.elder .top {
		font-size: 39rpx;
		height: 260rpx;
	}

	.top .title {
		color: white;
		font-size: 36rpx;
	}

	.elder .top .title {
		font-size: 48rpx;
	}

	.top button {
		width: 160rpx;
		height: 60rpx;
		border-radius: 100rpx;
		background-color: rgba(156, 203, 255, 1);
		color: rgba(48, 128, 242, 1);
		font-size: 28rpx;
		margin-top: 10rpx;
	}

	.elder .top button {
		font-size: 40rpx;
		width: 200rpx;
	}

	.top image {
		position: absolute;
		top: 10rpx;
		right: 40rpx;
		width: 376rpx;
		height: 208rpx;
	}
	.elder .top image {
		top: 40rpx;
		right: 0rpx;
	}

	.top .icon-Rightbutton-fill {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		font-size: 36rpx;
	}

	.item {
		position: relative;
		width: 310rpx;
		height: 200rpx;
		border-radius: 20rpx;
		background-color: #FDF3EF;
		padding: 15rpx 20rpx 20rpx 24rpx;
	}
	
	.other {
		flex-shrink: 0;
		margin-left: 36rpx;
	}
	
	.elder .other {
		width: 95%;
		text-align: end;
	}

	.item .title {
		font-size: 36rpx;
	}

	.elder .item {
		height: 220rpx;
	}

	.elder .item .title {
		font-size: 48rpx;
	}

	.item .content {
		margin: 6rpx 0 15rpx 0;
		font-size: 24rpx;
	}

	.item button {
		width: 160rpx;
		height: 60rpx;
	}

	.elder .item button {
		width: 180rpx;
	}

	.item .icon-Rightbutton-fill {
		font-size: 32rpx;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		color: #363A44;
	}

	.item .icon-horn {
		position: absolute;
		top: 70rpx;
		right: 20rpx;
		color: #FF932F30;
		font-size: 90rpx;
	}

	.item2 {
		background-color: #F0F6FD;
	}

	.item2 .icon-bookmark {
		position: absolute;
		top: 60rpx;
		right: 10rpx;
		color: #428FFC30;
		font-size: 110rpx;
	}

	.tabBar1 /deep/.u-tab-item {
		flex: 0 0 0% !important;
	}

	.tabBar2 /deep/.u-tab-item {
		flex: 0 0 0% !important;
		/* width: 25% !important; */
		/* margin-right: 18rpx; */

	}

	/* .tabBar2 /deep/.u-tabs-scorll-flex {
		justify-content: flex-start !important;
		display: block;
	} */

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
	
	.elder .card2 image{
		height: 220rpx !important;
	}
</style>
