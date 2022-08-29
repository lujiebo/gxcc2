<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<uniSection title="报修信息" type="line">
			<view class="info">
				<view class="item">
					<view class="label">报修时间</view>
					<view class="text">{{new Date(parseInt(data.create_time)*1000).toLocaleString()}}</view>
				</view>
				<view class="item">
					<view class="label">报修器材</view>
					<view class="text">{{data.infrastructurename}}</view>
				</view>
				<view class="item">
					<view class="label">报修器材地址</view>
					<view class="text">{{data.schoolname}}</view>
				</view>
				<view class="item">
					<view class="label">报修描述</view>
					<view class="text">{{data.description}}</view>
				</view>

				<view class="item column">
					<view class="label">相关照片</view>
					<view class="flex space-between u-flex-wrap">
						<image :src="item.url" v-for="(item,index) in data.cover" @click="prePic(1,index)"></image>
					</view>
				</view>
			</view>


		</uniSection>
		<view class="button" v-if="repair && type == 0">
			<button  @click="toRepair">立即处理</button>
		</view>
		
		<uniSection title="维修信息" type="line" v-if="type == 1">
			<view class="info">
				<view class="item">
					<view class="label">处理时间</view>
					<view class="text">{{new Date(parseInt(data.finishtime)*1000).toLocaleString()}}</view>
				</view>
				<view class="item">
					<view class="label">维修说明</view>
					<view class="text">{{data.finishdescription}}</view>
				</view>

				<view class="item column">
					<view class="label">维修后图片</view>
					<view class="flex space-between u-flex-wrap">
						<image :src="item.url" v-for="(item,index) in data.finishcover"  @click="prePic(2,index)"></image>
					</view>
				</view>
			</view>
		</uniSection>
	</view>
</template>

<script>
	import uniSection from '../../uni-section/uni-section.vue'

	export default {
		components: {
			uniSection
		},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id: null,
				data: {},
				type: 0 ,//0未维修 1已维修
				repair: false,
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.getData()
			}
			
			if (option.type) {
				this.type = option.type
			}
			if (option.repair) {
				this.repair = option.repair
			}
		},
		methods: {
			getData() {
				this.http.post('repair/detail', {
					id: this.id
				}, 2).then((data) => {
					this.data = data.info
				})
			},
			prePic(type,index) {
				var urls = []
				if(type == 1){
					this.data.cover.forEach((v)=>{
						urls.push(v.url)
					})
				}else {
					this.data.finishcover.forEach((v)=>{
						urls.push(v.url)
					})
				}
				
				uni.previewImage({
					current: index,
					urls: urls,
				});
			},
			toRepair() {
				uni.navigateTo({
					url:'toRepair?id=' +this.id
				})
			}

		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	.info {
		width: 100%;
		padding: 0 40rpx;
	}

	.info .item {
		display: flex;
		margin-top: 20rpx;
	}

	.info .item:first-child {
		margin-top: 0rpx;
	}

	.info .item .text {
		word-break: break-all;
	}

	.info .item .label {
		color: #95969A;
		width: 6em;
		margin-right: 32rpx;
		flex-shrink: 0;
	}

	.info .item image {
		width: 155rpx;
		height: 155rpx;
		margin-top: 10rpx;
	}
	
	.button {
		display: flex;
		width: 100%;
		justify-content: center;
		margin-top: 50rpx;
	}
	.button button {
		width: 460rpx;
		height: 96rpx;
		border-radius: 48rpx;
	}
</style>
