<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<!-- <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> -->
		<view>
			<image v-if="data.cover" :src="data.cover[0].url" mode="aspectFill"></image>
			<view class="u-p-lr-40 text-grey">
				<view class="title u-m-t-20">{{data.schoolname}}</view>
				<view class="u-m-tb-20 u-flex" style="align-items: baseline;"><span class="icon-time-line text-grey-icon u-m-r-10"></span>
					<span>
						<view>
							工作日:{{data.time1}}
						</view>
						<view>
							节假日:{{data.time2}}
						</view>
					</span>
				</view>
				<view class="u-flex u-row-between u-m-b-60">
					<view><span class="icon-map-pin-line text-grey-icon u-m-r-10"></span>{{data.address}}</view>
					<view class="icon-send-plane-fill text-blue" @click="daohang()"></view>
				</view>
				<!-- <view class="title">收费场地预约</view>
				<view class="u-flex sportsItem u-row-between">
					<view class="u-flex font-bold"><span class="icon-basketball-fill text-blue u-font-40 u-m-r-24"></span>篮球场</view>
					<button class="u-font-28" @click="toShoufei()">可预约</button>
					<button class="u-font-28 btn-disabled">已满</button>
				</view>
				<view class="u-flex sportsItem u-row-between">
					<view class="u-flex font-bold"><span class="icon-football-fill text-blue u-font-40 u-m-r-24"></span>足球场</view>
					<button class="u-font-28" @click="toShoufei()">可预约</button>
					<button class="u-font-28 btn-disabled">已满</button>
				</view>
				<view class="u-flex sportsItem u-row-between">
					<view class="u-flex font-bold"><span class="icon-yumaoqiu text-blue u-font-40 u-m-r-22 font-normal"></span>羽毛球场</view>
					<button class="u-font-28" @click="toShoufei()">可预约</button>
					<button class="u-font-28 btn-disabled">已满</button>
				</view>
				<view class="u-flex sportsItem u-row-between">
					<view class="u-flex font-bold"><span class="icon-ping-pong-fill text-blue u-font-40 u-m-r-24 font-normal"></span>乒乓球场</view>
					<button class="u-font-28" @click="toShoufei()">可预约</button>
					<button class="u-font-28 btn-disabled">已满</button>
				</view> -->

				<view class="title u-m-t-50 u-m-b-34">场馆介绍</view>
				<view style="white-space: pre-wrap;">
					{{data.introduce?data.introduce:'暂无介绍'}}
				</view>


			</view>

			<view class="bottom">
				<button @click="toYuyue()">预约入场名额</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id: 0,
				loading: false,
				data: {
					schoolname: '',
					opentime: [
						[0, 0]
					],
					opentimeweek: [
						[0, 0]
					],
					address: '',
					longitude: '',
					latitude: ''
				},
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.http.post('order/orderPrevSimple', {
					schoolid: this.id
				}, 2).then((data) => {
					this.data = data
					var time1 = ''
					if (data.opentime[0][0] == '00:00' && data.opentime[0][1] == '00:00') {
						time1 = '不开放'
					} else {
						data.opentime.forEach((v) => {
							time1 += (v[0] + '-' + v[1] + ' ')
						})
					}
					
					var time2 = ''
					if (data.opentimeweek[0][0] == '00:00' && data.opentimeweek[0][1] == '00:00') {
						time2 = '不开放'
					} else {
						data.opentimeweek.forEach((v) => {
							time2 += (v[0] + '-' + v[1] + ' ')
						})
					}

					this.data['time1'] = time1
					this.data['time2'] = time2
				})
			}
		},
		methods: {
			toYuyue() {
				uni.navigateTo({
					url: './ruchang?id=' + this.id + '&&title=' + this.data.schoolname
				})
			},
			toShoufei() {
				uni.navigateTo({
					url: './shoufei?id=' + this.id
				})
			},
			daohang() {

				this.location.openMap(this.data)

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: white;
		padding-bottom: calc(248upx + env(safe-area-inset-bottom));
	}

	image {
		width: 100%;
		height: 340rpx;
	}

	.sportsItem {
		width: 100%;
		height: 100rpx;
		background-color: #E9F0F980;
		margin-top: 20upx;
		padding: 0 24upx;
	}
</style>
