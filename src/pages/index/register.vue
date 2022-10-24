<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="content">
			<!-- 			<view class="icon">
				<uni-icons type="clear" size="104" color="red"></uni-icons>
			</view> -->
			<view class="title">请选择身份</view>
			<view class="content main">
				<u-radio-group v-model="role" class='radio'>
					<u-radio v-for="(item, index) in list" :key="index" :name="item.value" :disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>

			</view>
			<button class="btn-l" style="width: 90%;" @click="click()">前往登记</button>
		</view>
		<u-toast :type="type" ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id: '',
				type: 0, //0成功，1失败
				tt: null,
				list: [{
						name: '学生',
						value: '102',
						disabled: false
					},
					{
						name: '教师',
						value: '103',
						disabled: false
					},
					{
						name: '场地',
						value: '104',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				role: '',
			}
		},
		onLoad(option) {
			//id 为登录手机号
			if (option.id) {
				this.id = option.id
			}
		},
		methods: {
			click() {

				if (this.role == '104') {
					uni.navigateTo({
						url: '../site/index?id=' + this.id
					})
				} else if (this.role == '103') {
					uni.navigateTo({
						url: '../teacher/index?id=' + this.id

					})
				} else if (this.role == '102') {
					uni.navigateTo({
						url: '../student/index?id=' + this.id
					})
				} else {
					this.$refs.uToast.show({
						title: '请选择身份后再登记',
						position: 'top',
						type: 'warning',
						icon: 'true'
					});
				}
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
