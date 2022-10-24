<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="top-bg"></view>
		<view class="main">
			<view class="item">
				<view class="icon icon-gerenzhongxin3" @tap="openDj"></view>
				<view class="title u-font-36"  @tap="openDj">{{realname}}
			</view>
			<view class="icon-aixin" :class="uiStyle=='normal'?'u-m-t-40':'u-m-t-20'">关怀青少年健康成长
			</view>
			<view class="show space-between" v-if="role==102">
				<view class="index">
					<view>{{data.join_count|getBouble()}}</view>
					<view>参加次数</view>
				</view>
				<view class="index">
					<view>{{data.rate_count|getBouble()}}</view>
					<view>评价次数</view>
				</view>
				<view class="index">
					<view></view>
					<view></view>
				</view>
				<view class="index">
					<view></view>
					<view></view>
				</view>
			</view>
			<view class="show space-between" v-if="role==103">
				<view class="index">
					<view>{{data.join_count|getBouble()}}</view>
					<view>志愿服务次数</view>
				</view>
				<view class="index">
					<view>{{data.join_time|getBouble()}}小时</view>
					<view>志愿服务时长</view>
				</view>
				<view class="index">
					<view></view>
					<view></view>
				</view>
				<view class="index">
					<view></view>
					<view></view>
				</view>
			</view>
			<view class="show space-between" v-if="role==104">
				<view class="index">
					<view>{{data.join_count|getBouble()}}</view>
					<view>开课次数</view>
				</view>
				<view class="index">
					<view>{{data.equipment_count|getBouble()}}</view>
					<view>设备数量</view>
				</view>
				<view class="index">
					<view></view>
					<view></view>
				</view>
				<view class="index">
					<view></view>
					<view></view>
				</view>
			</view>
		</view>

		<view class="item u-p-lr-0 u-m-tb-22" style="height: auto;" v-if="show">
			<view class="title-area t1">
				<view class="title">我的课程</view>
				<view class="action icon-arrow-right-s-line"></view>
			</view>
			<view class="show u-m-0">
				<view class="index2" @click="nav(1)">
					<view class="icon-daiqueren">
						<u-badge :count="data.un_affirm" type="error"
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
						<u-badge :count="1" type="error" style="position:relative;top:0;left: -10rpx;margin-top: 0;">
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
					<view class="icon-changdi1">
					</view>
					<view>开课记录</view>
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
					join_count: '',
					equipment_count: '',
					rate_count:'',
					join_time:'',
					un_affirm: 0
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
			this.realname = user.name
			this.role = user.type
			if (user.type == 104) {
				this.show = false
			} else {
				this.show = true
			}

			this.getCount()
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
			getCount() {
				this.http.get(
					'/api/m', {
					},
					2
				).then(data => {
					this.data = data
					
					// this.data.join_count = data.join_count
					// this.data.equipment_count = data.equipment_count
					// this.data.unaffirm = data.un_affirm
					console.log(data)
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
			}
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
		font-size: 90upx;
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
