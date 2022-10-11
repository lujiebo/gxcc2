<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="top-bg"></view>
		<view class="main">
			<view class="item">
				<view class="icon icon-jiaoyu" @tap="openDj"></view>
				<!-- 		<view class="title u-font-36">{{data.realname}}
					<span class="tag icon-medal-fill u-p-tb-10">运动达人</span>
				</view> -->
				<view class="icon-aixin" :class="uiStyle=='normal'?'u-m-t-40':'u-m-t-20'">关怀青少年健康成长</view>
				<view class="show space-between">
					<view class="index">
						<view>{{data.join|getBouble()}}</view>
						<view>参加次数</view>
					</view>
					<view class="index">
						<view>{{data.volunteercount|getBouble()}}</view>
						<view>志愿服务次数</view>
					</view>
					<view class="index">
						<view>{{data.collectcount|getBouble()}}</view>
						<view>场地提供次数</view>
					</view>
				</view>
			</view>

			<!-- 			<view class="flex u-m-tb-22">
				<view class="item u-p-0 u-p-lr-40 u-m-r-20 u-b-r-8 item2" @click="toyuyue">
					<view class="title-area">
						<view class="title">我的预约</view>
						<view class="action icon-arrow-right-s-line"></view>
					</view>
					<view class="content">总预约</view>
					<view class="font-bold u-font-48 u-m-t-5 u-m-b-10">
						{{data.appointmentcount|getBouble()}}
						<span class="content u-m-l-10">次</span>
					</view>
					<view class="content">本周预约{{data.thisweekappointment|getBouble()}}次</view>
				</view>
				<view class="item u-p-0 u-p-lr-40 u-b-r-8 item2">
					<view class="title-area">
						<view class="title">我的积分</view>
					</view>
					<view class="content">总积分</view>
					<view class="font-bold u-font-48 u-m-t-5 u-m-b-10">
						{{data.score|getBouble()}}
						<span class="content u-m-l-10">分</span>
					</view>
					<view class="content">本周新增{{data.thisweekscore|getBouble()}}分</view>
				</view>
			</view> -->

			<view class="item u-p-lr-0 u-m-tb-22" style="height: auto;" v-if="show">
				<view class="title-area t1">
					<view class="title">我的课程</view>
					<view class="action icon-arrow-right-s-line"></view>
				</view>
				<view class="show u-m-0">
					<view class="index2" @click="nav(1)">
						<view class="icon-daiqueren">
<<<<<<< HEAD
							<u-badge :count="data.unaffirm" type="error"
=======
							<u-badge :count="1" type="error"
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
								style="position:relative;top:0;left:-15rpx;margin-top: 0;font-size: 14px;line-height: 14px;">
							</u-badge>
						</view>
						<view>待确认</view>

					</view>
					<view class="index2" @click="nav(2)">
						<view class="icon-yiqueren-xianxing"></view>
						<view>已确认</view>
					</view>
					<view class="index2" @click="nav(3)">
						<view class="icon-daipingjia">
							<u-badge :count="1" type="error"
								style="position:relative;top:0;left: -10rpx;margin-top: 0;">
							</u-badge>
						</view>
						<view>待评价</view>
					</view>
					<view class="index2" @click="nav(4)">
						<view class="icon-star-line"></view>
						<view>已评价</view>
					</view>
				</view>
			</view>
			
			<view class="item u-p-lr-0 u-m-tb-22" style="height: auto;" v-if="!show">
				<view class="title-area t1">
					<view class="title">我的场地</view>
					<view class="action icon-arrow-right-s-line"></view>
				</view>
				<view class="show u-m-0">
					<view class="index2" @click="nav(5)">
<<<<<<< HEAD
						<view class="icon-changdi1">
=======
						<view class="icon-daiqueren">
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
<!-- 							<u-badge :count="1" type="error"
								style="position:relative;top:0;left:-15rpx;margin-top: 0;font-size: 14px;line-height: 14px;">
							</u-badge> -->
						</view>
						<view>场地记录</view>			
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				data: {
					accountid: null,
					realname: '',
					deleted: 0,
					mobile: '',
					volunteercount: 0,
					preachcount: 0,
					collectcount: 0,
					appointmentcount: 0,
					score: 0,
					idcard: '',
<<<<<<< HEAD
					join:'',
					unaffirm:0
=======
					join:''
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
				}
			}
		},
		filters: {
			getBouble(val) {
				if (val != 'undefined' && val) {
					var b = val.toString();
					return b;
				} else {
					return '0';
				}
			}
		},
		onLoad() {
			let user = uni.getStorageSync('user')
			if (user.type == 104) {
				this.show = false
			} else {
				this.show = true
			}
			
				this.getCount()
			// this.getData()
		},
		methods: {
			openDj() {
				let user = uni.getStorageSync('user')
				let url = ''
				console.log(user)
				if (user.type == 103) {
					url = "../teacher/index"
				} else if (user.type == 102) {
					url = "../student/index"
				} else if (user.type == 104) {
					url = "../site/index"
				}
				uni.navigateTo({
					url: url
				})
			},
			getCount(){
				this.http.get(
					'/api/m', {
						type: 0
					},
					2
				).then(data => {
<<<<<<< HEAD
					this.data.join = data.join
					this.data.unaffirm = data.un_affirm
					console.log(data)
=======
					this.join = data.join
					console.log(this.join)
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
				})
			},
			nav(index) {
				if (index == 1) {
					uni.navigateTo({
						url: 'confirmList?current=0'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: 'confirmList?current=1'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: 'rateList?current=0'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: 'rateList?current=1'
					})
				} else if (index == 5) {
					uni.navigateTo({
						url: 'courseSiteList'
					})
				} 
			},
			getData() {
				this.http.post('info/info', {}, 2).then((data) => {
					this.data = data
				})
			},
			toyuyue() {
				uni.navigateTo({
					url: './myYuyue'
				})
			},
			async onPullDownRefresh() {
				await this.getData()
				uni.stopPullDownRefresh();
			},
		}
	}
</script>

<style>
	.top-bg {
		top: 0;
		position: fixed;
		width: 100%;
		height: 262upx;
		background: linear-gradient(rgb(65, 141, 236), rgb(118, 174, 241));
	}

	.icon {
		position: absolute;
		width: 140upx;
		height: 140upx;
		line-height: 40upx;
		background-color: rgba(0, 181, 120, 1);
		border: 10upx solid rgba(255, 255, 255, 1);
		border-radius: 50%;
		font-size: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;

		top: -50upx;
		right: 80upx;
	}

	.icon-aixin {
		color: #ff6a2a;
	}

	.main {
		position: relative;
		padding: 0 40upx;
		width: 100%;
		top: 76upx;
	}

	.main .item {
		width: 100%;
		height: 292upx;
		background-color: white;
		border-radius: 16rpx;
		padding: 44upx 40upx 34upx 40upx
	}

	.elder .main .item {
		height: 342upx;
	}

	.main .item2 {
		height: 258rpx;
	}

	.elder .main .item2 {
		height: 358rpx;
	}

	.main .item .title {
		color: #363A44;
		font-weight: bold;
		font-size: 28upx;
	}

	.elder .main .item .title {
		font-size: 42upx;
	}

	.main .item .content {
		color: #585A5E;
		font-size: 24upx;
		font-weight: normal;
	}

	.elder .main .item .content {
		font-size: 36upx;
	}

	.tag {
		border-radius: 40upx;
		color: white;
		background-color: #FF3A30;
		font-size: 24upx;
		padding: 10upx 20upx;
		margin-left: 40upx;
	}

	.elder .tag {
		font-size: 36rpx;
	}

	.show {
		width: 100%;
		display: flex;
		margin-top: 30upx;
		flex-wrap: wrap;
	}

	.elder .show {
		margin-top: 20upx;
	}

	.show .index,
	.show .index2 {
		text-align: center;
	}

	.show .index view:first-child {
		font-size: 32upx;
		/* line-height: 1.5; */
	}

	.elder .show .index view:first-child {
		font-size: 48upx;
	}

	.show .index view:last-child {
		margin-top: 5rpx;
		line-height: 1.2;
		color: #8E8E93;
		font-size: 24upx;
	}

	.elder.show .index view:last-child {
		font-size: 36upx;
	}

	.show .index2 {
		margin-bottom: 40rpx;
		width: 25%;
	}

	/* .show .index2:nth-child(4n) {
		margin-right: 0rpx;
	} */

	.show .index2 view:first-child {
		font-size: 48upx;
		/* line-height: 1.5; */
		color: #343434;
		vertical-align: top;
	}

	.elder .show .index2 view:first-child {
		font: optional;
		nt-size: 76upx;
	}

	.show .index2 view:last-child {
		margin-top: 24rpx;
		color: ##777777;
		font-size: 24rpx;
	}

	.elder .show .index2 view:last-child {
		font-size: 36rpx;
	}



	.action {
		transform: translateX(20upx);
		font-size: 40upx;
	}

	.t1 {
		margin-left: 40rpx;
		padding-top: 0rpx;
	}
</style>
