<template>
	<view>
		<image style="width: 100%;height: 386rpx;" :src="data.cover[0].url" mode="aspectFill"></image>
		<view class="u-p-lr-40">
			<view class="title u-m-t-20">{{data.activityname}}</view>
			<view class="u-flex space-between u-m-tb-20">
				<view class="icon-database-2-line">+<span style="color: rgb(247,71,9);">{{data.score}}</span>分</view>
				<view class="text-black">已参与人数{{data.enrollcount}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">报名时间:</view>
				<view class="content u-m-l-10">{{data.enrollstarttime}}到{{data.enrollendtime}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">活动时间:</view>
				<view class="content u-m-l-10">{{data.starttime}}到{{data.endtime}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">活动地点:</view>
				<view class="content u-m-l-10">{{data.schoolname}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">活动人数:</view>
				<view class="content u-m-l-10">{{data.needpeople}}</view>
			</view>
			<view class="title u-m-t-40 u-m-b-20 u-font-32">活动介绍</view>
			<view  class="content" style="line-height: 1.3;">{{data.introduce}}</view>
		</view>
		
		<view class="bottom">
			<button v-if="data.enrollcount < data.needpeople" @click="submit()">立即报名</button>
			<button v-else class="btn-disabled">参加人数已满</button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id:null,
				data:null
			}
		},
		onLoad(option) {
			if(option.id) {
				this.id = option.id
				this.getData()
			}
		},
		methods: {
			getData() {
				this.http.post('activity/activityDetail',{
					activityid:this.id
				},2).then((data)=>{
					this.data = data.activity
				})
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: calc(248upx + env(safe-area-inset-bottom));
	}
</style>
