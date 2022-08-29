<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="bg"></view>

		<view class="main">

			<view style="width: 100%; color: white; text-align: center;margin: 38upx 0 24rpx 0;">生命在于运动，健康在于锻炼</view>
			<view class="panel">
				<view class="dot1"></view>
				<view class="dot2"></view>
				<view class="card" v-if="data">
					<view class="card2">
						<image :src="data.cover[0].url" mode="aspectFill">
						</image>
						<view class="content">
							<view class="title text-ellipsis-2 u-font-32">{{data.schoolname}}</view>
							<view>
								<view class="u-m-t-10">{{data.opentimearr[0]}}</view>
								<view class="u-m-t-10">{{data.type?'收费预约':'入场预约'}}</view>
							</view>
						</view>
					</view>
					<view class="line-dash"></view>
					<view :class="(type == 1 || type == 2)?'used':''">
						<view class="erweima">
							<view class="title" v-if="type != 3">扫码入场</view>
							<view class="title" v-if="type == 3">扫码出场</view>
							<view style="width: 100%;text-align: center;margin: 10upx 0 10upx 0;">
								<image :src="data.qrcode" mode="aspectFill"
									style="width: 240upx; height: 240upx;margin:auto;"><!-- filter: drop-shadow(#0033FF 20px 0); -->
								</image>
							</view>
							<view class="u-m-b-30 text-black font-bold" style="text-align: center;">
								预约码：{{data.ordernum}}</view>

							<view v-if="type == 3" class="u-m-b-30 text-blue font-bold" style="text-align: center;">
								扫码入场时间：{{new Date(parseInt(data.intime)*1000).toLocaleString()}}</view>
						</view>
						<view class="mark-used mark-used-2" v-if="type == 1">已使用</view>
						<view class="mark-used mark-used-2" v-if="type == 2">已失效</view>
					</view>
					<view class="line-dash"></view>
					<view>
						<view class="title">学校地址</view>
						<view class="u-flex u-row-between text-grey" style="margin: 15upx 0 40upx 0 ;">
							<view>{{data.address}}</view>
							<view class="icon-send-plane-fill text-blue" @click="nav()"></view>
						</view>
					</view>
					<view class="line-dash"></view>

					<view>
						<view class="title">入场须知</view>
						<view class="text-black" style="margin: 15upx 0 40upx 0 ;">
							<view style="margin: 10upx 0;">1、进入学校时请佩戴口罩，接受体温检测，请使用预约二维码进行信息查验。</view>
							<view>2、预约后请根据学校开放时间到场，如因故无法到场，请提前取消预约。</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="type == 99" class="u-flex" style="justify-content: center;" @click="saoma">
				<button style="width: 460rpx;height: 96rpx;border-radius: 48rpx;">确认扫码</button>
			</view>

			<view class="panel" v-if="type != 99">
				<view class="card">
					<view class="title u-m-t-0 u-m-b-26">为您推荐</view>
					<view class="card2" v-for="(item,index) in video" @click="toVideo(item.id)">
						<image style="width: 220upx;height: 140upx;" :src="item.thumb" mode="aspectFill" lazy-load>
						</image>
						<view class="content">
							<view class="title text-ellipsis-1">{{item.videoname}}</view>
							<view>
								<view class="text-ellipsis-1 u-m-t-15">{{item.duration}}
								</view>
								<view class="text-ellipsis-1 u-m-t-15">{{item.viewtimes}}人已学习</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<myModal v-model="show" :title="modalTitle" @click="confirm()"></myModal>
		<view class="bottom" v-if="type == 0">
			<button @click="show = true">取消预约</button>
		</view>



	</view>
</template>

<script>
	import myModal from '../../component/modal.vue'
	export default {
		components: {
			myModal
		},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id: null,
				show: false,
				shiyong: 0,
				data: null,
				modalTitle: '您是否确认取消预约？',
				video: [],
				type: 0, //0未使用 1已使用 2已失效 3已入场 99扫码
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.type = option.type
				this.getData()
				this.getVideo()
			}
		},
		methods: {
			getData() {
				this.http.post('order/showQrcode', {
					ordernum: this.id
				}, 2).then((data) => {
					this.data = data
				})
			},
			getVideo() {
				this.http.post('activity/videoList', {
					type: 0, //0:热门活动 1：组队活动 2：宣讲活动 3：运动科普
					pageNo: 1,
					pageSize: 4,
					order: 1 ///0:常规 1：随机  热门活动传1 随机推荐
				}, 2).then((data) => {
					this.video = data.videos
				})
			},
			toVideo(id) {
				uni.navigateTo({
					url: '../activity/videoDetail?id=' + id
				})
			},
			nav() {
				this.location.openMap(this.data)
			},
			confirm() {
				this.show = false
				this.http.post('order/cancel', {
					ordernum: this.id
				}, 2).then(() => {
					uni.navigateBack({
						delta: 1
					})
					// uni.$emit('myYuyueUpdate')
				})
			},
			saoma() {
				this.http.post('hexiao/check', {
					ordernum: this.id
				}, 2).then(() => {
					uni.redirectTo({
						url: '../admin/success'
					})
				})


			}
		}
	}
</script>

<style>
	page {
		padding-bottom: calc(248upx + env(safe-area-inset-bottom));
	}

	.bg {
		top: 0;
		width: 100%;
		height: 410upx;
		position: fixed;
		overflow: hidden;
		/* background-color: rgb(66,143,252); */
		z-index: 0;
	}

	.bg:after {
		content: '';
		width: 140%;
		height: 410upx;
		position: absolute;
		left: -20%;
		top: 0;
		border-radius: 0 0 80% 80%;
		background-color: rgb(66, 143, 252);
		z-index: -1;
	}

	.main {
		width: 100%;
		position: absolute;
		top: 0;
		padding: 0 40upx;
		padding-bottom: calc(164upx + env(safe-area-inset-bottom));
	}

	.panel {
		position: relative;
		width: 100%;
		background-color: white;
		border-radius: 20upx;
	}

	.card {
		background-color: white;
		border-radius: 16upx;
		padding: 30upx 30upx 22upx 26upx;
		height: auto;
		margin-bottom: 20upx;
	}

	.card2 {
		margin: 0;
		margin-bottom: 30upx;
		height: auto;

	}

	.card image {
		width: 170upx;
		height: 132upx;
		border-radius: 8upx;
	}

	.card2 .content {
		justify-content: flex-start;
		color: #101010;
	}

	.card .title {
		margin-top: 20upx;
		font-size: 32upx;
	}

	.elder .card .title {
		font-size: 48upx;
	}

	.card2 .title {
		margin-top: 0;
		font-size: 28upx;
	}

	.elder .card2 .title {
		font-size: 40upx;
	}

	.used {
		position: relative;
	}

	.used .erweima {
		opacity: 0.5;
	}

	.dot1,
	.dot2 {
		position: absolute;
		width: 10upx;
		height: 20upx;
		background-color: rgb(66, 143, 252);
		border-radius: 0 10rpx 10rpx 0;
		top: 100upx;
	}

	.dot1 {
		left: 0upx;
	}

	.dot2 {
		right: 0upx;
		border-radius: 10rpx 0 0 10rpx;
	}
</style>
