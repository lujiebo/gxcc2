<script>
	import VConsole from 'vconsole';
	export default {
		globalData: {
			uiStyle: 'normal',
			timestamp: 0,
			myLoc: {
				lat: null,
				lon: null
			},
			ticket: null,
			domain: 'https://test.nbyjzh.com'
		},
		onLaunch: function() {
			// const vConsole = new VConsole();
			// 
			console.log('App Launch')
			// uni.setStorageSync('user-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGxheWdyb3VuZC5teWNlai5jb20iLCJhdWQiOiJodHRwczpcL1wvcGxheWdyb3VuZC5teWNlai5jb20iLCJsYXQiOjE2NTgzNzM2OTEsIm5iZiI6MTY1ODM3MzY5MSwiZXhwIjoxNjg5OTA5NjkxLCJkYXRhIjp7ImFjY291bnRfaWQiOjF9fQ.WsXqB-tYv3idwdOgJNWRioi7qR78STHPqYUD55aoTAA')

			// ZWJSBridge.onReady(() => {
			// 	console.log('接口初始化完成')
			// 	ZWJSBridge.getUiStyle().then((res) => {
			// 		getApp().globalData.uiStyle = res.uiStyle
			// 		if(res.uiStyle == 'elder') {
			// 			// document.getElementById('app').className = 'elder';
			// 			document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className + ' elder';
			// 		}
			// 	}).catch((error) => {});
			// })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* @import '@/uni_modules/uni-scss/index.scss'; */
	/* @import '@/static/customicons.css'; */
	// 设置整个项目的背景色
	@import 'uview-ui/theme.scss';
	// @import '@/utils/icon.css';
	@import '@/utils/iconfont.css';
	@import '@/utils/common2.scss';
	@import '@/utils/common.scss';

	page {
		background-color: #f5f5f5;
		padding-bottom: calc(80upx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		// line-height: 1;
		font-size: 28rpx;
	}

	.elder page{
		font-size: 40rpx;
	}
	
	
	::v-deep .uni-tabbar {
		padding-bottom: env(safe-area-inset-bottom) !important;
		box-shadow: 0rpx -2rpx 10rpx 0rpx rgba(0, 0, 0, 0.16);
	}
	
	.elder ::v-deep .u-tab-item{
		font-size: 36rpx !important;
	}
	
	
	
	
	
	
	.elder ::v-deep uni-tabbar .uni-tabbar__bd {
		height: 100rpx !important;
	}
	.elder ::v-deep uni-tabbar .uni-tabbar__label {
		font-size: 36rpx !important;
	}
	
	.elder ::v-deep .u-icon__label {
		font-size: 36rpx !important;
	}
	
	
	.elder ::v-deep .u-column-item {
		// font-size: 36rpx !important;
		// height: 60rpx !important;
	}
	.elder ::v-deep .u-picker-header {
		height: 120rpx !important;
		font-size: 40rpx !important;
	}
	
	.elder ::v-deep .uni-picker-view-content>* {
		// height: 60rpx !important;
	}
	
	
	.elder ::v-deep .uni-calendar__header-text {
		font-size: 40rpx !important;
	}
	
	.elder ::v-deep .uni-calendar__header-btn {
		width: 20rpx !important;
		height: 20rpx !important;
	}
	
	.elder ::v-deep .uni-picker-container .uni-picker-item,
	.elder ::v-deep .uni-picker-container .uni-picker-action,
	.elder ::v-deep .uni-calendar__weeks-day-text,
	.elder ::v-deep .uni-calendar-item__weeks-box-text,
	.elder ::v-deep .uni-datetime-picker--btn{
		font-size: 36rpx !important;
	}
	
	.elder ::v-deep .dialog-close-plus {
		width: 40rpx !important;
	}
	
	.elder ::v-deep .uni-date-btn--ok {
		padding-bottom: calc(30rpx + env(safe-area-inset-bottom)) !important;
		
	}

	
	
</style>
