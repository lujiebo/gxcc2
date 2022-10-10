<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<image style="width: 100%;height: 386rpx;" :src="data.courseware_img_path" mode="aspectFill"></image>
		<!-- <image style="width: 100%;height: 386rpx;" v-if="data" :src="data.cover[0].url" mode="aspectFill"></image> -->
		<view class="u-p-lr-40" v-if="data">
			<view class="title u-m-t-20">{{data.courseware_name}}</view>
			<view class="u-flex space-between u-m-tb-20">
				<view class="text-black icon-map-pin-user-line">{{data.student_count}}/{{data.site_capacity}}人已报名</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">上课日期:</view>
				<view class="content u-m-l-10">{{data.date}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">上课时间:</view>
				<view class="content u-m-l-10">{{data.time_section_name}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">上课地点:</view>
				<view class="content u-m-l-10">{{data.site_name}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">上课教师:</view>
				<view class="content u-m-l-10">{{data.teacher_name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id: null,
				data: null,
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.getData()
			}
		},
		methods: {
			getData() {
				this.http.get('/api/course', {
					id: this.id
				}, 2).then((data) => {
					data.courseware_img_path = getApp().globalData.domain + data.courseware_img_path
					this.data = data
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	/* .bottom {
		padding-bottom: 30rpx;
	} */

	.uni-icons {
		font-size: 36rpx !important;
	}

	.elder .uni-icons {
		font-size: 48rpx !important;
	}
</style>
