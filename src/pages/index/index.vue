<template>
	<view class="container" :class="uiStyle=='normal'?'':'elder'">
		<view class="mask-loading" v-if="show" @touchmove.prevent>
			<view class="maskn">
				<view class="dots-loader"></view>
			</view>
		</view>

		<view class="swiper_area">
			<image src="../../static/swiper_bg.png" courseware_img_path></image>
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500"
				indicator-color="#ffffff">
				<swiper-item v-for="(item,index) in topImg">
					<image :src="item.url" mode="aspectFill" lazy-load></image>
				</swiper-item>
			</swiper>

			<view class="flex space-around u-m-t-30">
				<view class="navItem">
					<view class="icon-jiaoshigongzuotai u-font-40" style="color: #F99D18;"></view>
					<view>教师{{teacherCount}}人</view>
				</view>
				<view class="navItem">
					<view class="icon-xueshengtongji u-font-40" style="color: #3A89EB;"></view>
					<view>学生{{studentCount}}人</view>
				</view>
				<view class="navItem">
					<view class="icon-changdi1 u-font-40" style="color: #00B872;"></view>
					<view>场地{{siteCount}}个</view>
				</view>
				<view class="navItem">
					<view class="icon-kejianshangchuan u-font-46" style="color: #ffaaff;"></view>
					<view>开课{{courseCount}}次</view>
				</view>
				<!-- 				<view class="navItem" @click="tabNav(7)">
					<view class="icon-kejianshangchuan u-font-40" style="color: #FF6A2A;"></view>
					<view>课件上传</view>
				</view> -->
			</view>
		</view>


		<view class="item">
			<view class="title-area">
				<view class="title">最新课程</view>
				<view class="action" @click="navMore(1)">更多></view>
			</view>
			<view>
				<view class="card card2" v-for="(item,index) in courseList" @click="toCourseDetail(item.id)">
					<image :src="item.courseware_img_path" mode="aspectFill" lazy-load></image>
					<view class="content" style="padding: 5rpx 0;">
						<view class="title text-ellipsis-2">{{item.courseware_name}}</view>
						<view>
							<view class="text-ellipsis-1" v-if="item.activitytype != 1">
								上课日期：{{item.date}}</view>
							<!-- 						<view :class="uiStyle=='normal'?'u-flex u-m-t-15':''" v-if="item.activitytype != 1">
								<view class="icon-database-2-line" style="margin-right: 30upx;">+{{item.score}}分</view>
								<view class="icon-map-pin-user-line">{{item.enrollcount}}人已参加</view>
							</view> -->
							<view>
								<view class="text-ellipsis-1">上课时间：{{item.time_section_name}}</view>
								<view class="text-ellipsis-1">
									上课地点：{{item.site_name}}</view>
							</view>
							<view :class="uiStyle=='normal'?'':''">
								<view class="icon-map-pin-user-line">{{item.student_count}}/{{item.site_capacity}}人已报名
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>

		</view>


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
				show: true,
				showIndex: false,
				picList: [],
				courseList: [],
				teacherCount: '',
				studentCount: '',
				siteCount: '',
				courseCount: ''
			}
		},
		onLoad(option) {
			// if (option.phone == -1) {
			// 	uni.setStorageSync('user-token', '')
			// 	uni.setStorageSync('user', '')
			// 	return;
			// }
			console.log(getApp().globalData.uiStyle)

			var token = uni.getStorageSync('user-token')
			if (token == "") {
				//id 为登录手机号
				if (option.id) {
					console.log(option.id)
					this.http.post1('/api/zlb/token', {
						"unid": option.id
					}, 2).then((data) => {
						if (data.status == 1) {
							uni.setStorageSync('user-token', data.data.token)
							uni.setStorageSync('user', data.data.user)
							this.getCount()
							this.show = false

						} else {
							uni.navigateTo({
								url: './register?id=' + option.id
							})
						}
					}).catch(() => {})
				} else {
					// var token = uni.getStorageSync('user-token')
					// if (token != "") {
					// 	this.getCount()
					// 	this.show = false
					// } else {
					uni.navigateTo({
						url: './register?id=' + option.id
					})
					// }
				}
			} else {
				this.show = false
				this.getCount()
			}

			this.getCourseList()
		},
		methods: {
			toCourseDetail(id) {
				uni.navigateTo({
					url: 'courseDetail?id=' + id
				})
			},
			navMore(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '../index/allCourseList'
					})
				}
			},
			getCourseList() {
				this.http.get(
					'/api/course', {
						type: 0,
						ppc: 4
					},
					2
				).then(data => {
					data.rows.forEach((v, index) => {
						// console.log(getApp().globalData.domain)
						v.courseware_img_path = getApp().globalData.domain + v.courseware_img_path
					})
					// console.log(data.rows)

					this.courseList = data.rows
				})
			},
			getCount() {
				this.http.get(
					'/api/m', {
						type: 0
					},
					2
				).then(data => {
					this.teacherCount = data.teacher
					this.studentCount = data.student
					this.siteCount = data.site
					this.courseCount = data.course
				})
			},
			// async onPullDownRefresh() {
			// 	await this.getData()
			// 	uni.stopPullDownRefresh()
			// },
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
