<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="u-flex u-flex-wrap space-between u-m-t-30 u-p-lr-40">
			<view class="u-flex" style="justify-content: flex-end;width: 100%;" v-if="data.length>0 && data" @click="isEdit = !isEdit">
				<u-icon name="edit-pen-fill" color="#428FFC" size="28" v-if="!isEdit"></u-icon>
				<view style="color:#428FFC" v-if="!isEdit">编辑</view>
				<u-icon name="minus-circle" color="#428FFC" size="28" v-if="isEdit"></u-icon>
				<view style="color:#428FFC" v-if="isEdit">取消</view>
			</view>
			<u-checkbox-group @change="checkboxGroupChange" shape="circle">
				<u-checkbox v-model="item.checked"  v-for="(item, index) in data" :key="index"
					:name="item.id" :show="isEdit">
					<view class="card card2" @click="isEdit?'':toDetail(item.id)">
						<image :src="item.thumb" mode="aspectFill" lazy-load></image>
						<view class="content">
							<!-- <view class="title text-ellipsis-1" v-if="item.belongtype == 0">宣讲活动</view>
							<view class="title text-ellipsis-1" v-if="item.belongtype == 1">运动科普</view> -->
							<view class="title text-ellipsis-1">{{item.videoname}}</view>
							<view class="gap"></view>
							<view style="margin-top: 15upx;display: flex;justify-content: space-between;">
								<view class="icon-time-line">{{item.duration}}</view>
							</view>
						</view>
					</view>
				</u-checkbox>
			</u-checkbox-group>
		</view>
			<view class="bottom" v-if="isEdit">
				<view class="btm-item" style="color:#428FFC" @click="chooseAll()">全选</view>
				<view class="line"></view>
				<view class="btm-item" style="color:#FF6A2A" @click="del()">删除</view>
			</view>
		<u-empty text="暂无数据" mode="data" v-if="(data.length==0) || (!data)" margin-top="100"></u-empty>
		<!-- <u-loadmore v-if="(list.videos.length>0) && list.videos" :status="status" margin-top="20"/> -->
	</view>  
</template>

<script>
	// import mixin_list from '@/utils/list.js'
	export default {
		// mixins: [mixin_list],
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				item: [{
					name: '热门视频'
				}, {
					name: '宣讲视频'
				}, {
					name: '科普视频',
				}],
				current: 0,

				list_url: 'info/collectList',
				// status: 'nomore',
				search_params: {},
				list: {
					videos: []
				},
				data: [],
				isEdit: false,
				ids:[]
			}
		},
		watch:{
			isEdit() {
				this.ids = []
				this.data.forEach((v)=>{
					v.checked = false
				})
			},
			data() {
				if(this.data.length == 0) {
					this.isEdit = false
				}
			}
		},
		onLoad() {
			// this.getlist(true)
			this.getData()
		},
		methods: {
			change(index) {
				this.current = index;
				// this.getlist(true)
			},
			getData() {
				this.http.post(this.list_url, {}, 2).then((data) => {
					this.data = this.$u.deepClone(data.lists); 
					this.data.forEach((v,index)=>{
						this.$set(this.data[index],'checked',false)
					})
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: '../activity/videoDetail?id=' + id
				})
			},
			checkboxGroupChange(e) {
				console.log(e)
				this.ids = e
			},
			del() {
				if(this.ids.length == 0){
					uni.showToast({
						icon:'none',
						title:'请选择要删除视频'
					})
				} else {
					this.http.post('activity/uncollectAll', {
						ids:this.ids
					}, 2).then((data)=>{
						this.ids = []
						this.getData()
					})
				}
			},
			chooseAll() {
				this.ids = []
				this.data.forEach((v,index)=>{
					this.data[index].checked = true
					this.ids.push(v['id'])
				})
			},
			async onPullDownRefresh() {
				await this.getData()
				uni.stopPullDownRefresh();
			},
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	.card2 {
		width: 100%;
	}

	.card2 image {
		width: 220rpx;
		height: 120rpx;
		border-radius: 6rpx;
	}

	.card2 .content {
		height: 120rpx;
		justify-content: center;
		width: 100%;
	}
	
	.bottom {
		width: 100%;
		min-height: 90rpx;
		justify-content: space-around;
		align-items: center;
		padding: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}
	.bottom .line {
		width: 2rpx;
		height: 34rpx;
		border: 2rpx solid rgba(187, 187, 187, 1);
	}
	.bottom .btm-item {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
