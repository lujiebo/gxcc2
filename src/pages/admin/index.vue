<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="bg">
			<view class="u-font-48 u-m-t-36 u-p-lr-40" style="width: 100%; color: white; text-align: center;">{{name}}</view>
			<view class="hexiao-bg">
				<image src="../../static/hexiao-bg.png"></image>
			</view>
		</view>


		<view class="main">


			<view class="panel">
				<view class="saoma" @click="scan()">
					<view class="scan">
						<u-icon color="white" size="104" name="scan"></u-icon>
					</view>
				</view>
				<view class="card">
					<view class="u-font-36" style="width: 100%;text-align: center;margin-top: 166rpx;">扫码溯源</view>
					<uni-search-bar v-model="keyWord" radius="100" placeholder="请输入预约码" bgColor="#F2F3F4"
						@confirm="search" :focus="false" @cancel="search(false)" />
					<view class="navList">
						<view class="item" @click="detail(1)">
							<view class="icon1">
								<u-icon name="file-text" color="white" size="48"></u-icon>
							</view>
							<view>今日记录</view>
						</view>
						<view class="item" @click="detail(2)">
							<view class="icon2">
								<view class="icon-time-line"></view>
							</view>
							<view>历史记录</view>
						</view>
					</view>
					<view class="bottomText">生命在于运动，健康在于锻炼</view>
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
				data: null,
				keyWord: '',
				name:'',
			}
		},
		onLoad(option) {
			if(option.title) {
				this.name = option.title
			}
		},
		methods: {
			search(index) {
				if (!index) {
					this.keyWord = ''
				} else {
					this.http.post('hexiao/check', {
						ordernum: this.keyWord
					}, 2).then(() => {
						uni.navigateTo({
							url: 'success'
						})
					})
				}
			},
			scan() {
				ZWJSBridge.scan({
					"type": "qrCode"
				}).then(res => {
					var data = res.text
					this.http.post('hexiao/check', {
						ordernum: data
					}, 2).then(() => {
						uni.navigateTo({
							url: 'success'
						})
					})
				}).catch(err => {
					console.log(err)
					uni.showToast({
						icon:'none',
						title:'扫码失败'
					})
				})
			},
			getData() {
				this.http.post('order/showQrcode', {
					ordernum: this.id
				}, 2).then((data) => {
					this.data = data
				})
			},
			confirm() {
				this.show = false
				this.http.post('order/cancel', {
					ordernum: this.id
				}, 2).then(() => {
					uni.navigateBack({
						delta: 1
					})
					uni.$emit('myYuyueUpdate')
				})
			},
			detail(index) {
				uni.navigateTo({
					url:'./record?type='+index
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
		height: 740upx;
		position: fixed;
		overflow: hidden;
		/* background-color: rgb(66,143,252); */
		z-index: 0;
	}

	.bg:after {
		content: '';
		width: 140%;
		height: 740upx;
		position: absolute;
		left: -20%;
		top: 0;
		border-radius: 0 0 80% 80%;
		background-color: rgb(66, 143, 252);
		z-index: -1;
	}

	.hexiao-bg {
		position: absolute;
		width: 412rpx;
		height: 308rpx;
		top: 118rpx;
		left: 170rpx;
	}

	.hexiao-bg image {
		width: 412rpx;
		height: 308rpx;
	}

	.main {
		width: 100%;
		position: absolute;
		top: 592rpx;
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
		height: 770rpx;
	}

	.card .title {
		margin-top: 20upx;
		font-size: 32upx;
	}

	.elder .card .title {
		font-size: 48upx;
	}


	.saoma {
		width: 320rpx;
		height: 320rpx;
		background-color: rgba(222, 235, 255, 1);
		color: rgba(16, 16, 16, 1);
		border-radius: 160rpx;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.saoma .scan {
		width: 240rpx;
		height: 240rpx;
		border-radius: 160rpx;
		background-color: #428FFC;
		border: 20rpx solid #9FC5FF;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	.elder /deep/ .u-subsection .u-item-text {
		font-size: 40rpx !important;
	}

	/deep/.uni-load-more__text {
		font-size: 28rpx;
		margin-left: 16rpx;
	}


	/deep/ .uni-searchbar {
		padding: 0;
		margin: 32upx 0;
	}

	/deep/.uni-searchbar__box {
		height: 72upx;
		padding: 10upx 16upx 10upx 0;
		border-radius: 10rpx !important;
	}

	/deep/.uni-searchbar__cancel {
		padding-left: 20upx;
		line-height: 72upx;
		font-size: 28upx;
		color: #428FFC;
	}

	.elder /deep/.uni-searchbar__cancel {
		font-size: 40rpx;
	}

	/deep/.uni-searchbar__box-icon-search {
		padding: 0 16upx;

	}

	/deep/.uni-searchbar__box-icon-search uni-text {
		font-size: 36upx !important;
	}

	.elder /deep/.uni-searchbar__box-icon-search uni-text {
		font-size: 48upx !important;
	}

	/deep/.uni-searchbar__text-placeholder {
		font-size: 28upx;
		margin-left: 10upx;
	}

	.elder /deep/.uni-searchbar__text-placeholder {
		font-size: 40upx;
	}

	/deep/.uni-searchbar__box-search-input {
		font-size: 28upx;
	}

	.elder /deep/.uni-searchbar__box-search-input {
		font-size: 40upx;
	}

	.navList {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.navList .item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.navList .item .icon1,
	.navList .item .icon2 {
		width: 90rpx;
		height: 90rpx;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 18rpx;
	}

	.navList .item .icon1 {
		background-color: #428FFC;
	}

	.navList .item .icon2 {
		background-color: #F99D18;
	}

	.bottomText {
		color: #959595;
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		bottom: 48rpx;
	}

	.icon-time-line {
		color: white;
		font-size: 52rpx;
	}
</style>
