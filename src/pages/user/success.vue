<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="content" v-if="type == 0">
			<view class="icon">
				<uni-icons type="checkbox-filled" size="104" color="green"></uni-icons>
			</view>
			<view class="title">提交成功！</view>
			<view><span style="color: #FEA72B;">{{time}}</span>秒后自动跳转到报修页面</view>
			<button class="btn-l" style="width: 90%;" @click="click()">立即前往</button>
		</view>
		<view class="content" v-if="type == 1">
			<view class="icon">
				<uni-icons type="clear" size="104" color="red"></uni-icons>
			</view>
			<view class="title">提交失败！</view>
			<view>您在14天内去往或途径中高风险地区，不符合防疫要求</view>
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
				tt: null,
				status: 0,
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
			if (option.type) {
				this.type = option.type
			}
			if (option.status) {
				this.status = option.status
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
				uni.$emit('success', this.status)
				if (this.status == 1) {
					uni.navigateBack({
						delta: 2
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}

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
