<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="content" v-if="type == 0">
			<view class="icon">
				<uni-icons type="checkbox-filled" size="104" color="green"></uni-icons>
			</view>
			<view class="title">报名成功！</view>
			<view><span style="color: #FEA72B;">{{time}}</span>秒后自动跳转到活动页面</view>
			<button class="btn-l" style="width: 90%;" @click="click()">立即前往</button>
		</view>
		<view class="content" v-if="type == 1">
			<view class="icon">
				<uni-icons type="clear" size="104" color="red"></uni-icons>
			</view>
			<view class="title">报名失败！</view>
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
				tt: null
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
			if (option.type) {
				this.type = option.type
			}
			if (this.type == 0) {
				this.tt = setInterval(() => {
					if (this.time > 0) {
						this.time--
					} else {
						clearInterval(this.tt)
						this.tt = null
						this.click()
					}

				}, 1000)
			}

		},
		methods: {
			click() {
				uni.navigateTo({
					url: 'courseDetail?id=' + id
				})
			},
			clickRe() {
				uni.navigateBack({
					delta: 1
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
		/* font-size: 36rpx; */
		font-weight: bold;
		margin: 20rpx;

	}

	button {
		margin-top: 40rpx;
	}
</style>
