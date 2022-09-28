<template>
	<view class="container" :class="uiStyle=='normal'?'':'elder'">
		<view class="mask-loading" v-if="show" @touchmove.prevent>
			<view class="maskn">
				<view class="dots-loader"></view>
			</view>
		</view>

		<view class="swiper_area">
			<image src="../../static/swiper_bg.png"></image>
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500"
				indicator-color="#ffffff">
				<swiper-item v-for="(item,index) in topImg">
					<image :src="item.url" mode="aspectFill" lazy-load></image>
				</swiper-item>
			</swiper>

			<view class="flex space-around u-m-t-30">
				<!-- 				<view class="navItem" @click="tabNav(1)">
					<view class="icon-map u-font-32" style="color: #3A89EB;"></view>
					<view>悦运动</view>
				</view>
				<view class="navItem" @click="tabNav(2)">
					<view class="icon-mic-fill u-font-46" style="color: #F99D18;"></view>
					<view>悦宣讲</view>
				</view>
				<view class="navItem" @click="tabNav(3)">
					<view class="icon-hearts-fill u-font-46" style="color: #FF6A2A;"></view>
					<view>悦生活</view>
				</view> -->
				<view class="navItem" @click="tabNav(4)">
					<view class="icon-xuqiudengji u-font-40" style="color: #00B872;"></view>
					<view>场地登记</view>
				</view>
				<view class="navItem" @click="tabNav(5)">
					<view class="icon-xuqiudengji u-font-40" style="color: #3A89EB;"></view>
					<view>学生登记</view>
				</view>
				<view class="navItem" @click="tabNav(6)">
					<view class="icon-xuqiudengji u-font-40" style="color: #F99D18;"></view>
					<view>教师登记</view>
				</view>
				<view class="navItem" @click="tabNav(7)">
					<view class="icon-kejianshangchuan u-font-40" style="color: #FF6A2A;"></view>
					<view>课件上传</view>
				</view>
			</view>
		</view>

		<!-- <view class="item">
			<view class="title-area">
				<view class="title">热门场地<span class="icon-fire u-m-l-10"
						style="color: #FF6A2A;font-weight: normal;"></span></view>
			</view>
			<scroll-view :scroll-x="true" class="scroll">
				<view class="card card1" v-for="(item,index) in appointschools">
					<view class="title text-ellipsis-1">{{item.schoolname}}</view>
					<image v-if="index == 0" src="../../static/first.png"
						style="width: 35upx;height: 50upx;position: absolute;top: 20upx;right: 40upx;" mode="aspectFill"
						lazy-load></image>
					<view class="content">
						<view>
							<view>{{item.total}}人已预约</view>
							<button @click="toyuyue(item.schoolid)">立即预约</button>
						</view>
						<image :src="item.cover[0].url" mode="aspectFill"></image>
					</view>
				</view>
			</scroll-view>

		</view>

		<view class="item">
			<view class="title-area">
				<view class="title">最新活动</view>
				<view class="action" @click="navMore(1)">更多></view>
			</view>
			<view>
				<view class="card card2" v-for="(item,index) in activity" @click="toActivity(item.id)">
					<image :src="item.cover[0].url" mode="aspectFill" lazy-load></image>
					<view class="content" style="padding: 10rpx 0;">
						<view class="title text-ellipsis-2">{{item.activityname}}</view>
						<view>
							<view class="text-ellipsis-1" v-if="item.activitytype != 1">
								报名时间：{{item.enrollstarttime}}</view>
							<view :class="uiStyle=='normal'?'u-flex u-m-t-15':''" v-if="item.activitytype != 1">
								<view class="icon-database-2-line" style="margin-right: 30upx;">+{{item.score}}分</view>
								<view class="icon-map-pin-user-line">{{item.enrollcount}}人已参加</view>
							</view>
							<view v-if="item.activitytype == 1">
								<view class="text-ellipsis-1">活动时间：{{item.starttime}}</view>
								<view class="text-ellipsis-1" style="margin-top: 15upx;">
									活动地点：{{item.schoolname}}</view>
							</view>
						</view>

					</view>
				</view>
			</view>

		</view>


		<view class="item">
			<view class="title-area">
				<view class="title">为您推荐</view>
				<view class="action" @click="navMore(2)">更多></view>
			</view>
			<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view class="card card3" v-for="(item,index) in video" @click="toDetail(item.id)">
					<image :src="item.thumb" mode="aspectFill" lazy-load>
					</image>
					<view class="icon-play-circle-line"></view>
					<view class="content">
						<view class="title text-ellipsis-1" v-if="item.belongtype == 0">宣讲活动</view>
						<view class="title text-ellipsis-1" v-if="item.belongtype == 1">运动科普</view>
						<view class="title text-ellipsis-1">{{item.videoname}}</view>
						<view class="gap"></view>
						<view style="margin-top: 15upx;display: flex;justify-content: space-between;">
							<view class="icon-time-line">{{item.duration}}</view>
							<view class="icon-eye-line u-flex">
								<view class="u-m-l-10">{{item.viewtimes}}</view>
							</view>
						</view>

					</view>
				</view>
			</view>

		</view> -->

		<!-- <view class="item">
			<view class="title-area">
				<view class="title">人气兑换</view>
				<view class="action">更多></view>
			</view>
			<view style="display: flex;flex-wrap: wrap;">
				<view class="card card4" v-for="(item,index) in 5">
					<image
						src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210611094Q512b-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651800802&t=ea86bac33ae4d7e5c01aa1e191713280">
					</image>
					<view class="content">
						<view class="title text-ellipsis-2">一款精美手账日记笔记本</view>
						<view style="margin-top: 16upx;">300积分</view>

					</view>
				</view>
			</view>

		</view> -->

		<view class="footer">
			<view>本服务由浙江政务服务网、中共慈溪市委宣传部提供。</view>
			<view class="tel">服务咨询热线：<view @click="phone()" style="color: #428FFC;">{{phoneNum}}</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				topImg: [{
					url: '../../static/v1_top1.jpeg'
				}, {
					url: '../../static/v1_top2.jpeg'
				}, {
					url: '../../static/v1_top3.jpeg'
				}],
				activity: [],
				video: [],
				appointschools: [],
				uiStyle: getApp().globalData.uiStyle,
				phoneNum: '0574-XXXXXXXX',
				show: false,
				picList: []
			}
		},
		onLoad() {
			// this.getActivity()
			// this.getVideo()
			console.log(11)

			// uni.reLaunch({
			// 	url: '../admin/index?title=test'
			// })

			// uni.navigateTo({
			// 	url:'../yuyue/ruchang?id=1'
			// })


			// const sUserAgent = window.navigator.userAgent.toLowerCase()
			// const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1 // 浙里办APP
			// const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1 //支付宝

			// var search = window.location.search
			// var str = search.substring(1, search.length);
			// var arr = str.split("&");
			// var obj = new Object();
			// // 将每一个数组元素以=分隔并赋给obj对象
			// for (var i = 0; i < arr.length; i++) {
			// 	var tmp_arr = arr[i].split("=");
			// 	obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
			// }

			// var schoolId = ''

			// if (obj['schoolId']) {
			// 	schoolId = obj['schoolId']
			// }
			// if (obj['ticket'] && getApp().globalData.ticket == null) {


			// 	aplus_queue.push({
			// 		'action': 'aplus.sendPV',
			// 		'arguments': [{
			// 			is_auto: false
			// 		}, { // 自定义 PV 参数 key-value 键值对（只能是这种平铺的 json，不能做多层 嵌套），如： 
			// 			isMini: true,
			// 			miniAppId: '2002201920',
			// 			miniAppName: '共享操场'
			// 		}]
			// 	})
			// 	this.show = false
			// 	getApp().globalData.ticket = obj['ticket']; //放入全局变量
			// 	this.http.post('login/notify', {
			// 		ticket: obj['ticket']
			// 	}, 1).then((data) => {
			// 		if (data.token) {
			// 			uni.setStorageSync('user-token', data.token)
			// 			if(data.role == 1) {
			// 				uni.reLaunch({
			// 					url:'../admin/index?title=' + data.schoolname
			// 				})
			// 			} else {
			// 				if(obj['sp']) {
			// 					uni.navigateTo({
			// 						url:'../yuyue/ruchang?id='+obj['sp']
			// 					})
			// 				}
			// 			}
			// this.getData()

			// 		}
			// 	})
			// } else if (bIsDtDreamApp) {
			// 	this.watchApp(schoolId);
			// } else if (bIsAlipayMini) {
			// 	this.watchApply(schoolId);
			// }


		},
		methods: {
			isLoad(schoolId) {
				uni.navigateTo({
					url: '../admin/index'
				})

				this.show = false
				this.getData()
				if (schoolId) {
					uni.navigateTo({
						url: '../yuyue/ruchang?id=' + schoolId
					})
				}


				//单点
				// if (bIsAlipayMini) {
				// 	window.location.href =
				// 		"https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=BCDSGA_75dc68cd4b42823600c378cac7fe33b8&goto="+schoolId
				// } else {
				// 	window.location.href =
				// 		"https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_75dc68cd4b42823600c378cac7fe33b8&goto="+schoolId
				// }

				// 或者使用replace()
				// window.location.replace('https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=【接入代码】&goto=【附带跳转地址，以sp参数返回】');
			},
			watchApp(schoolId) {
				// window.onpageshow = (event) => {
				// 	if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
				// 		ZWJSBridge.close();
				// 	}
				// 	this.isLoad(schoolId);
				// }
			},
			// 支付宝浙里办小程序判断页面进入状态
			watchApply(schoolId) {
				// window.onpageshow = (event) => {
				// 	if (event.persisted || (window.performance && (window.performance.navigation.type == 1 || window
				// 			.performance.navigation.type == 0))) {
				// 		this.isLoad(schoolId);
				// 	} else {
				// 		my.navigateBack();
				// 	}
				// }
			},
			phone() {
				// ZWJSBridge.phoneCall({
				// 	"corpId": this.phoneNum
				// }).then(res => {
				// 	console.log(res)
				// }).catch(err => {
				// 	console.log(err)
				// })
			},

			toyuyue(id) {
				uni.navigateTo({
					url: '../yuyue/yuyueDetail?id=' + id
				})
			},
			toActivity(id) {
				uni.navigateTo({
					url: '../volunteer/volunteerDetail?id=' + id
				})
			},
			tabNav(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '../activity/activity'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '../activity/yuexuanjiang'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '../volunteer/volunteer'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '../site/index'
					})
				} else if (index == 5) {
					uni.navigateTo({
						url: '../student/index'
					})
				} else if (index == 6) {
					uni.navigateTo({
						url: '../teacher/index'
					})
				} else if (index == 7) {
					uni.navigateTo({
						url: '../courseware/index'
					})
				}
			},
			navMore(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '../activity/allActivity'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '../activity/allVideo'
					})
				}
			},
			getData() {
				this.http.post('home/index', {}, 2).then((data) => {

					this.appointschools = data.appointschools
					this.activity = data.activitys
					this.video = data.videos
				})
			},
			getActivity() {
				this.http.post('activity/activityListTotal', {
					type: 0, //0:热门活动 1：组队活动 2：宣讲活动 3：运动科普
					pageNo: 1,
					pageSize: 2,
					order: 0 ///0:常规 1：随机  热门活动传1 随机推荐
				}, 2).then((data) => {
					this.activity = data.activitys
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
			toDetail(id) {
				uni.navigateTo({
					url: '../activity/videoDetail?id=' + id
				})
			},
			async onPullDownRefresh() {
				await this.getData()
				uni.stopPullDownRefresh()
			},
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	.elder .card2 image {
		height: 270rpx;
	}

	.footer {
		font-size: 22upx;
		padding: 10upx 32upx 10upx 32upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #808DA1;
		background-color: #ffffff;
		text-align: center;
		bottom: 10rpx;
		right: 70rpx;
		position: absolute;
	}

	.elder .footer {
		font-size: 32upx;
	}

	.footer .tel {
		display: flex;
	}

	.swiper_area {
		width: 100%;
		height: 500upx;
		background-color: rgba(91, 157, 238, 0.1);
	}

	.elder .swiper_area {
		height: 550upx;
	}

	.swiper_area>image {
		width: 100%;
		position: absolute;
		top: -90px;
	}

	.swiper_area .swiper {
		width: 100%;
		height: 320upx;
	}

	.swiper_area .swiper swiper-item {
		width: 100%;
		height: 100%;
	}

	.swiper_area .swiper swiper-item image {
		width: calc(100% - 80upx);
		height: calc(100% - 44upx);
		margin-left: 40upx;
		margin-top: 44upx;
		border-radius: 20upx;
	}

	/deep/ .uni-swiper-dots-horizontal {
		bottom: 7upx;
	}


	.navItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #363A44;
	}

	.navItem [class*="icon-"] {
		width: 72upx;
		height: 72upx;
		background-color: #FFFFFF;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 14upx;
	}

	.elder .navItem [class*="icon-"] {
		width: 96upx;
		height: 96upx;
	}

	.hotSwiper swiper-item {
		width: 40%;
	}

	.item {
		padding: 0 40upx;
	}

	.scroll {
		width: 100%;
		height: 260upx;
		overflow: hidden;
		white-space: nowrap;
	}

	.elder .scroll {
		height: 300upx;
	}


	.mask-loading {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: white;
		z-index: 9999;
	}

	.maskn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

	}

	.dots-loader:not(:required) {
		position: relative;
		display: inline-block;
		width: 7px;
		height: 7px;
		margin-bottom: 30px;
		overflow: hidden;
		text-indent: -9999px;
		background: transparent;
		border-radius: 100%;
		box-shadow: #f86 -14px -14px 0 7px, #fc6 14px -14px 0 7px,
			#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		transform-origin: 50% 50%;
		animation: dots-loader 5s infinite ease-in-out;
	}

	@keyframes dots-loader {
		0% {
			box-shadow: #f86 -14px -14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}

		8.33% {
			box-shadow: #f86 14px -14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}

		16.67% {
			box-shadow: #f86 14px 14px 0 7px, #fc6 14px 14px 0 7px, #6d7 14px 14px 0 7px,
				#4ae -14px 14px 0 7px;
		}

		25% {
			box-shadow: #f86 -14px 14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}

		33.33% {
			box-shadow: #f86 -14px -14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae -14px -14px 0 7px;
		}

		41.67% {
			box-shadow: #f86 14px -14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		50% {
			box-shadow: #f86 14px 14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		58.33% {
			box-shadow: #f86 -14px 14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		66.67% {
			box-shadow: #f86 -14px -14px 0 7px, #fc6 -14px -14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		75% {
			box-shadow: #f86 14px -14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		83.33% {
			box-shadow: #f86 14px 14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae 14px 14px 0 7px;
		}

		91.67% {
			box-shadow: #f86 -14px 14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}

		100% {
			box-shadow: #f86 -14px -14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}
	}
</style>
