<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bar-width="100" bg-color="#F6F7F8"
			height="100"></u-tabs>
			<view class="u-p-lr-40">
				<view class="card" v-for="(item,index) in data" @click="current==0?toDetail(item.id):''">
					<image :src="item.firstcover" mode="aspectFill" lazy-load></image>
					<view class="u-p-20">
						<view class="title text-ellipsis-1">{{item.activityname}}</view>
						<view class="u-flex u-m-tb-15" style="align-items: baseline;">
							<view class="content text-ellipsis-1">活动时间:{{item.starttime}}至{{item.endtime}}</view>
						</view>
						<view class="u-flex u-m-tb-15" style="align-items: baseline;">
							<view class="content text-ellipsis-1">活动地址:{{item.address}}</view>
						</view>
						<view class="u-flex u-m-t-25 u-m-b-10 text-grey-content u-font-24">
							<view class="icon-database-2-line">+<span style="color: rgb(247,71,9);">{{item.score}}</span>分</view>
							<view class="icon-map-pin-user-line u-m-l-50">{{item.enrollcount}}人已参加</view>
						</view>
					</view>
				</view>
			</view>
			<u-empty text="暂无数据" mode="data" v-if="data.length == 0" margin-top="100"></u-empty>
	<!-- 		<view class="bottom">
				<button @click="submit()">发布活动</button>
			</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list: [{
					name: '报名中'
				}, {
					name: '历史活动'
				}],
				current: 0,
				data:[]
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			change(index) {
				this.current = index;
				this.getData()
			},
			
			getData() {
				if(this.current == 0) {
					var url = 'activity/enrollActivityList'
				} else if(this.current == 1) {
					var url = 'activity/enrollActivityListHistory'
				}
				
				this.http.post(url,{},2).then((data)=>{
					this.data = data.activity
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: 'volunteerDetail?id='+id
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
		padding-bottom: calc(248rpx + env(safe-area-inset-bottom));
	}
	.card {
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.16);
		border-radius:  0 0 10rpx 10rpx;
		margin-top: 40rpx;
	}
	.card image {
		width: 100%;
		height: 260rpx;
		border-radius: 10rpx 10rpx 0 0;
		/* background-color: #cccccc; */
	}

</style>
