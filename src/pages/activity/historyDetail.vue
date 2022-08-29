<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="u-p-lr-40" v-if="data">
			<view class="title u-m-t-20">{{data.activityname}}</view>
			<view class="u-flex u-font-22 u-m-tb-20" style="color: #ACACAC;">
				<uni-icons type="contact-filled" color="#ACACAC"></uni-icons>
				<view class="u-m-l-10">{{data.organization?data.organization:data.schoolname}}</view>
				<view class="u-m-l-40">{{data.starttime}}</view>
			</view>
			<view class="content" v-html="data.introduce"></view>
			<image
			  class="u-m-t-20"
			  style="width: 100%;height: 386rpx;" 
			  v-for="(item,index) in data.cover"
			  :src="item.url" 
			  mode="aspectFill"
			></image>
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
				this.http.post('activity/activityDetail', {
					activityid: this.id
				}, 2).then((data) => {
					this.data = data.activity
				})
			},
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
	
	.uni-icons{
		font-size: 36rpx !important;
	}
	
	.elder .uni-icons{
		font-size: 48rpx !important;
	}
</style>
