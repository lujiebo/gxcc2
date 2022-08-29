<template>
	<view class="uni-section">
		<view class="uni-section-header" nvue>
			<view v-if="type" class="uni-section__head">
				<view :class="type" class="uni-section__head-tag"/>
			</view>
			<view class="uni-section__content">
				<text :class="{'distraction':!subTitle}" :style="{color:color}" class="uni-section__content-title">{{ title }}</text>
				<text v-if="subTitle" class="uni-section__content-sub">{{ subTitle }}</text>
			</view>
		</view>
		<view :style="{padding: padding ? '20rpx' : ''}">
			<slot/>
		</view>
	</view>
</template>

<script>

	/**
	 * Section 标题栏
	 * @description 标题栏
	 * @property {String} type = [line|circle] 标题装饰类型
	 * 	@value line 竖线
	 * 	@value circle 圆形
	 * @property {String} title 主标题
	 * @property {String} subTitle 副标题
	 */

	export default {
		name: 'UniSection',
		emits:['click'],
		props: {
			type: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			color:{
				type: String,
				default: '#333'
			},
			subTitle: {
				type: String,
				default: ''
			},
			padding: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {}
		},
		watch: {
			title(newVal) {
				if (uni.report && newVal !== '') {
					uni.report('title', newVal)
				}
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>
<style lang="scss" >
	$uni-primary: #2979ff !default;
	
	.uni-section {
		background-color: #fff;
		// overflow: hidden;
		margin-top: 20rpx;
	}
	.uni-section-header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		padding: 24rpx 40rpx;
		// height: 50px;
		font-weight: normal;
	}
	.uni-section__head {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
	}

	.line {
		height: 30rpx;
		background-color: $uni-primary;
		border-radius: 20rpx;
		width: 8rpx;
	}
	
	.elder .line {
		height: 50rpx;
		width: 16rpx;
	}

	.circle {
		width: 16rpx;
		height: 16rpx;
		border-top-right-radius: 100rpx;
		border-top-left-radius: 100rpx;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
		background-color: $uni-primary;
	}

	.uni-section__content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
		color: #333;
	}

	.uni-section__content-title {
		font-size: 32rpx;
		// color: $uni-primary;
		color:  #363A44;
		font-weight: bold;
	}
	
	.elder .uni-section__content-title {
		font-size: 48rpx;
	}

	.distraction {
		flex-direction: row;
		align-items: center;
	}

	.uni-section__content-sub {
		font-size: 24rpx;
		color: #999;
		line-height: 32rpx;
		margin-top: 4rpx;
	}
	
	.elder .uni-section__content-sub{
		font-size: 36rpx;
	}
</style>
