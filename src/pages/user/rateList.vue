<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bar-width="100" bg-color="#F6F7F8"
			height="100"></u-tabs>
		<view class="u-p-lr-40">
			<view class="card" v-for="(item,index) in data">
				<image src="../../static/v2_index2.jpeg" mode="aspectFill" lazy-load></image>
				<view class="u-p-20">
					<view class="title text-ellipsis-1">{{item.activityname}}</view>
					<view class="u-flex u-m-tb-15" style="align-items: baseline;">
						<view class="content text-ellipsis-1">上课日期:{{item.date}}</view>
					</view>
					<view class="u-flex u-m-tb-15" style="align-items: baseline;">
						<view class="content text-ellipsis-1">上课时间:{{item.time_section_name}}</view>
					</view>
					<view class="u-flex u-m-tb-15" style="align-items: baseline;">
						<view class="content text-ellipsis-1">上课场地:{{item.site_name}}</view>
					</view>

					<view class="u-flex" style="justify-content: flex-end;">
						<button v-if="(current == 0) " style="background-color: #F99D18;"
							@click="pingjia(item.id)">立即评价</button>
						<button v-if="(current == 1)" class="btn-disabled"
							style="background-color: #C3C3C3;">已评价</button>
					</view>

					<!-- 					<view class="u-flex" style="justify-content: flex-end;" v-if="(current == 0)">
						<button @click="toDetail(item.id)">确认</button>
					</view> -->
				</view>

			</view>
		</view>
		<u-empty text="暂无数据" mode="data" v-if="data.length == 0" margin-top="100"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list: [{
					name: '待评价'
				}, {
					name: '已评价'
				}],
				current: 0,
				data: [{
						"id": "e69da2b8-d6cd-457b-89f4-67a614d86620",
						"no": "20221009-001",
						"date": "2022-10-09",
						"time_section_name": "星期日下午 14:00至15:30",
						"site_name": "慈溪图书馆3",
						"teacher_name": "王芳"
					},
					{
						"id": "da3582dd-786e-4792-a775-9cb642508e98",
						"no": "20221008-001",
						"date": "2022-10-08",
						"time_section_name": "星期六上午 09:00至10:30",
						"site_name": "慈溪体育馆2",
						"teacher_name": "李四"
					}
				]
			}
		},
		onLoad(option) {
			if (option.current) {
				this.current = option.current
			}
			this.getData()
			uni.$on('myActivityUpdate', () => {
				this.getData()
			})
			
			uni.$on('onReload', () => {
				console.log(22)
				this.getData()
			})
		},
		onUnload() {
			uni.$off('myActivityUpdate')
		},
		methods: {
			change(index) {
				this.current = index;
				this.data = []
				this.getData()
			},

			getData() {
				let affirm_status = 0
				if (this.current == 0) {
					affirm_status = 0
				} else if (this.current == 1) {
					affirm_status = 1
				}

				this.http.get('/api/course/mine', {
					affirm_status: affirm_status
				}, 2).then((data) => {
					// this.data = data.activity

				})

				this.data = [{
					"id": "e69da2b8-d6cd-457b-89f4-67a614d86620",
					"no": "20221009-001",
					"date": "2022-10-09",
					"time_section_name": "星期日下午 14:00至15:30",
					"site_name": "慈溪图书馆3",
					"teacher_name": "王芳"
				}]

			},
			toDetail(id) {
				uni.navigateTo({
					url: 'teacherConfirm?id=' + id
				})
			},
			pingjia(id) {
				uni.showToast({
					title: '正在建设中...',
					icon: "none"
				})
				// uni.navigateTo({
				// 	url: './pingjia?id=' + id + '&&type=2'
				// })
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
		padding-bottom: calc(248rpx + env(safe-area-inset-bottom));
	}

	.card {
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.16);
		border-radius: 0 0 10rpx 10rpx;
		margin-top: 40rpx;
	}

	.card image {
		width: 100%;
		height: 260rpx;
		border-radius: 10rpx 10rpx 0 0;
		/* background-color: #cccccc; */
	}
</style>
