<template>
	<view>
		<view class="item" v-if="data">
			<view class="card card2">
				<image :src="data.cover[0].url" mode="aspectFill"></image>
				<view class="content">
					<view class="title text-ellipsis-2">{{data.activityname}}</view>
					<view>
						<view class="text-ellipsis-1 u-m-tb-20">{{data.starttime}}到{{data.endtime}}</view>
						<view style="margin-top: 15upx;display: flex;">
							<view class="icon-database-2-line" style="margin-right: 30upx;">+<span style="color: rgb(247,71,9);">{{data.score}}</span>分</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="title">签到码</view>
			<view class="content font-bold">{{data.qiandaocode}}</view>
		</view>
		<view class="item">
			<view class="title">签到时间</view>
			<view class="content">请于{{data.starttime}}前签到</view>
		</view>
		<view class="item">
			<view class="title">签到地点</view>
			<view class="u-flex u-row-between text-grey" style="margin: 20rpx 0 0 0 ;">
				<view class="content">{{data.address}}</view>
				<view class="icon-send-plane-fill text-blue u-font-24" @click="nav()"></view>
			</view>
		</view>
		<view class="item">
			<view class="title">签到须知</view>
			<view class="content">1、进入学校时请佩戴口罩，接受体温检测，请使用签到码进行签到。</view>
			<view class="content">2、报名后请根据签到时间到场，如因故无法到场，请提前取消报名。</view>
		</view>
		<myModal v-model="show" :title="modalTitle" @click="confirm()"></myModal>
		<view class="bottom">
			<button @click="show = true">退出活动</button>
		</view>
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
				id:null,
				data: null,
				show: false,
				modalTitle: '您是否确认退出活动？'
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
				this.http.post('activity/enrollActivityCode',{
					activityid:this.id
				},2).then((data)=>{
					this.data = data.activity
				})
			},
			nav(){
				this.location.openMap(this.data)
			},
			
			confirm() {
				this.show = false
				this.http.post('activity/cencelEnrollActivity', {
					activityid:this.id
				}, 2).then(() => {
					uni.navigateBack({
						delta: 1
					})
					uni.$emit('myActivityUpdate')
				})
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: calc(248upx + env(safe-area-inset-bottom));
	}

	.item {
		width: 100%;
		background-color: white;
		margin-bottom: 14rpx;
		padding: 22rpx 40rpx 34rpx 40rpx;
	}

	.item>.content {
		margin-top: 20rpx;
	}
	
	.card2 {
		height: auto;
	}
	
	.card2 image {
		width: 186rpx;
		height: 136rpx;
		
	}
</style>
