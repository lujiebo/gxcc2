<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="content" v-if="type == 0">
			<view class="icon">
				<uni-icons type="checkbox-filled" size="104" color="green"></uni-icons>
			</view>
			<view class="title">扫码成功！</view>
			<view><span style="color: #FEA72B;">{{time}}</span>秒后自动跳转到扫码页面</view>
			<button class="btn-l" style="width: 90%;" @click="clickRe()">返回扫码页面</button>
			<button class="btn-l btn-line" style="width: 90%;" @click="click()">查看扫码记录</button>
		</view>
		<view class="content" v-if="type == 1">
			<view class="icon">
				<uni-icons type="clear" size="104" color="red"></uni-icons>
			</view>
			<view class="title">扫码失败！</view>
			<!-- <view>您在14天内去往或途径中高风险地区，不符合防疫要求</view> -->
			<button class="btn-l" style="width: 90%;" @click="clickRe()">返回</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id: '',
				time: 3,
				type: 0, //0成功，1失败
				tt:null
			}
		},
		onLoad(option) {
			if(option.type) {
				this.type = option.type
			}
			if (this.type == 0) {
				this.tt = setInterval(() => {
					if (this.time > 0) {
						this.time--
					} else {
						clearInterval(this.tt)
						this.tt = null
						this.clickRe()
					}

				}, 1000)
			}

		},
		methods: {
			click() {
				uni.redirectTo({
					url:'./record?type=1'
				})
			},
			clickRe() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		beforeDestroy() {
			clearInterval(this.tt)
			this.tt = null
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.icon {
		padding-top: 120rpx;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin: 20rpx;

	}

	button {
		margin-top: 40rpx;
	}
</style>
