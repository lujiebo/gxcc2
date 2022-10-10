<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="tablist" :is-scroll="false" :current="current" @change="change" bar-width="100"
			bg-color="#F6F7F8" height="100"></u-tabs>
		<view class="u-p-lr-40">
			<view class="card" v-for="(item,index) in list.list" @click="current == 0?toDetail(item.id):''">
				<view class="u-p-20">
					<!-- <view class="title text-ellipsis-1">{{item.activityname}}</view> -->
					<view class="u-flex u-m-tb-15" style="align-items: baseline;">
						<view class="content text-ellipsis-1">上课日期:{{item.date}}</view>
					</view>
					<view class="u-flex u-m-tb-15" style="align-items: baseline;">
						<view class="content text-ellipsis-1">上课时间:{{item.time_section_name}}</view>
					</view>
					<view class="u-flex u-m-tb-15" style="align-items: baseline;">
						<view class="content text-ellipsis-1">上课场地:{{item.site_name}}</view>
					</view>

					<view class="u-flex" style="justify-content: flex-end;" v-if="(current == 0)">
						<button @click="toDetail(item.id)">确认</button>
					</view>
				</view>

			</view>
		</view>
		<!-- <u-empty text="暂无数据" mode="data" v-if="data.length == 0" margin-top="100"></u-empty> -->
		<u-empty text="暂无数据" mode="data" v-if="(list.list.length==0) || (!list.list)" margin-top="100">
		</u-empty>
		<u-loadmore v-if="(list.list.length>0) && list.list" :status="status" margin-top="20" />
	</view>
</template>

<script>
	import mixin_list from '@/utils/list1.js'
	export default {
		mixins: [mixin_list],
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list_url: '/api/course/mine',
				search_params: {
					// order: 0,
				},
				tablist: [{
					name: '待确认'
				}, {
					name: '已确认'
				}],
				list: {
					list: []
				},
				current: 0,
				data: []
			}
		},
		onLoad(option) {
			if (option.current) {
				this.current = option.current
			}
			this.getCousre()
			// this.getData()

			// uni.$on('myActivityUpdate', () => {
			// 	this.getData()
			// })

			uni.$on('onReload', () => {
				// this.getData()
				this.getCousre()
			})
		},
		methods: {
			change(index) {
				this.current = index;
				this.data = []
				// this.getData()

				this.getCousre()
			},
			getCousre() {
				let affirm_status = 0
				if (this.current == 0) {
					affirm_status = 0
				} else if (this.current == 1) {
					affirm_status = 1
				}
				this.search_params = {
					affirm_status: affirm_status
				}
				
				this.getlist(true)
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
					this.data = data.rows
					console.log(data)

				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: 'courseConfirm?id=' + id
				})
			},
			pingjia(id) {
				uni.navigateTo({
					url: './pingjia?id=' + id + '&&type=2'
				})
			},
			async onPullDownRefresh() {
				// await this.getData()
				await this.getCousre()
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
