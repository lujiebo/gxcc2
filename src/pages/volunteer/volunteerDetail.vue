<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<swiper v-if="data" class="swiper" circular :autoplay="true" style="width: 100%;height: 386rpx;">
			<swiper-item v-for="(item,index) in data.cover" :key="index"  style="width: 100%;height: 386rpx;">
				<image style="width: 100%;height: 386rpx;" :src="item.url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- <image style="width: 100%;height: 386rpx;" v-if="data" :src="data.cover[0].url" mode="aspectFill"></image> -->
		<view class="u-p-lr-40" v-if="data">
			<view class="title u-m-t-20">{{data.activityname}}</view>
			<view class="u-flex space-between u-m-tb-20">
				<view class="icon-database-2-line">+<span style="color: rgb(247,71,9);">{{data.score}}</span>分</view>
				<view class="text-black">已参与人数{{data.enrollcount}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">报名时间:</view>
				<view class="content u-m-l-10">{{data.enrollstarttime}}至{{data.enrollendtime}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">活动时间:</view>
				<view class="content u-m-l-10">{{data.starttime}}至{{data.endtime}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">活动地点:</view>
				<view class="content u-m-l-10">{{data.address}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">活动人数:</view>
				<view class="content u-m-l-10">{{data.needpeople}}</view>
			</view>
			<view class="title u-m-t-40 u-m-b-20 u-font-32">活动介绍</view>
			<view class="content" v-html="data.introduce"></view>
		</view>

		<view class="bottom" v-if="!isEdit">
			<button @click="submit()" v-if="data.enrollcount < data.needpeople">立即报名</button>
			<button v-else class="btn-disabled">参加人数已满</button>
		</view>

		<view class="bottom" v-if="isEdit">
			<button class="btn-line u-m-r-20" @click="show = true">删除</button>
			<button @click="edit()">编辑</button>
		</view>

		<myModal v-model="show" :title="modalTitle" @click="confirm()"></myModal>
	</view>
</template>

<script>
	import myModal from '../../component/modal.vue'
	export default {
		components: {
			myModal
		},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id: null,
				data: null,
				isEdit: false,
				show: false,
				modalTitle: '您是否确认删除活动？',
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.getData()
			}
			if (option.isEdit) {
				this.isEdit = option.isEdit
			}
		},
		methods: {
			getData() {
				this.http.post('activity/activityDetail', {
					activityid: this.id
				}, 2).then((data) => {
					this.data = data.activity
				})
			},
			submit() {
				this.http.post('activity/joinEnrollActivity', {
					activityid: this.id
				}, 2).then((data) => {
					uni.navigateTo({
						url: 'success?type=0&&id=' + this.id
					})
				})
			},
			edit() {
				//0：志愿活动1：组队活动 2：宣讲活动 3：科普活动
				if (this.data.type == 0) {
					uni.showToast({
						icon: 'none',
						title: '志愿活动暂不支持修改'
					})
				} else if (this.data.type == 1) {
					uni.navigateTo({
						url: '../activity/team?id=' + this.id
					})
				} else if (this.data.type == 2) {
					uni.navigateTo({
						url: '../activity/xunjiang?id=' + this.id
					})
				} else if (this.data.type == 3) {
					uni.navigateTo({
						url: '../activity/kepu?id=' + this.id
					})
				}

			},
			confirm() {
				this.show = false
				this.http.post('activity/cencelActivity', {
					activityid: this.id
				}, 2).then((data) => {
					uni.navigateBack({
						delta: 1
					})
					uni.$emit('mySubUpdate')
				})
			},
		}
	}
</script>

<style>
	page {
		padding-bottom: calc(248upx + env(safe-area-inset-bottom));
	}

	/* .bottom {
		padding-bottom: 30rpx;
	} */
</style>
