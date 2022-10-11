<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="content">
			<!-- 			<view class="icon">
				<uni-icons type="clear" size="104" color="red"></uni-icons>
			</view> -->
			<view class="title"></view>
			<view class="content main">
				<u-form :model="form" ref="uForm" :border-bottom="true" label-width="184">
					<u-form-item label="手机号" required prop="name">
						<u-input v-model="phone" placeholder="请输入手机号" />
					</u-form-item>
				</u-form>
			</view>
			<button class="btn-l" style="width: 90%;" @click="clickRe()">模拟登录</button>
			<button class="btn-l" style="width: 90%;" @click="clear()">清空token</button>
			
			<u-toast :type="type" ref="uToast"></u-toast>
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
				form: {},
				phone: ''
			}
		},
		onLoad(option) {
			console.log(uni.getStorageSync('user-token'))  
			if (option.id) {
				this.id = option.id
			}
		},
		methods: {
			clickRe() {
				uni.reLaunch({
					url: '/?id=' + this.phone
				})
			},
			clear() {
				uni.setStorageSync('user-token', '')
				uni.setStorageSync('user', '')

				this.$refs.uToast.show({
					title: '清空成功',
					position: 'center',
					type: 'success',
					icon: 'true',
					// callback() {
					// 	uni.reLaunch({
					// 		url:'/'
					// 	})
					// }
				});
			}
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

	.main {
		position: relative;
		padding: 0 26px;
		width: 90%;
		height: 160px;
		background-color: white;
		border-radius: 10px;
		padding: 29px 26px 22px 26px
	}

	.icon {
		padding-top: 120rpx;
	}

	.radio {
		margin: auto;
	}

	.title {
		/* font-size: 36rpx; */
		font-weight: bold;
		margin: 20rpx;
		margin-top: 150rpx;
	}

	button {
		margin-top: 40rpx;
	}
</style>
