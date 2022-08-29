<template>
	<view class="u-p-lr-40" :class="uiStyle=='normal'?'':'elder'">
		<uni-search-bar v-model="keyWord" radius="100" placeholder="请输入搜索关键词" bgColor="#F2F3F4" @confirm="search"
			:focus="true" @cancel="search(false)"/>
		<u-subsection :list="items" :current="current" mode="subsection" active-color="#428FFC" @change="onClickItem">
		</u-subsection>
		<view class="flex space-between u-m-t-70 u-m-b-30" style="color: #363A44;">
			<view class="flex">
				<picker :range="distanceList" range-key="text" @change="change1">
					<view>{{distanceName?distanceName:'距离'}}<span class="icon-arrow-down-s-fill"></span></view>
				</picker>
				<picker :range="statusList" range-key="text" @change="change2" v-if="current == 0">
					<view class="u-m-l-46">{{statusName?statusName:'状态'}}<span class="icon-arrow-down-s-fill"></span>
					</view>
				</picker>
			</view>
			<view class="action u-flex" @click="refresh">刷新
				<view class="icon-restart-line" :class="isRefresh?'rotate':''"></view>
			</view>
		</view>
		<view>
			<view class="card" v-for="(item,index) in data">
				<view class="item" v-if="current == 0">
					<view class="title text-ellipsis-1">{{item.address}}</view>
					<view class="content u-m-t-10 text-ellipsis-2">{{item.distance}}.{{item.parkpointname}}</view>
				</view>
				<view class="item" v-if="current == 1">
					<view class="title text-ellipsis-1">{{item.address}}</view>
					<view class="content u-m-t-10 text-ellipsis-2">{{item.distance}}.{{item.streetNo}}</view>
				</view>
				<view class="item" v-if="current == 2">
					<view class="title text-ellipsis-1">{{item.name}}</view>
					<view class="content u-m-t-10 text-ellipsis-2">{{item.distance}}.{{item.address}}</view>
				</view>
				<view class="nav" @click="nav(item.baidulo,item.baidula,item.address,item.parkpointname)" v-if="current ==0">
					<view class="icon-send-plane-fill"></view>
					<view>到这里去</view>
				</view>
				<view class="nav" @click="nav(item.lon,item.lat,item.address,item.streetNo)" v-if="current ==1">
					<view class="icon-send-plane-fill"></view>
					<view>到这里去</view>
				</view>
				<view class="nav" @click="nav(item.lon,item.lat,item.name,item.address)" v-if="current == 2">
					<view class="icon-send-plane-fill"></view>
					<view>到这里去</view>
				</view>
			</view>
		</view>
		<u-empty text="暂无数据" mode="data" v-if="(!data) || (data.length==0)" margin-top="100"></u-empty>
		
		<!-- <uni-load-more :status="status" style=""></uni-load-more> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				distanceName: '',
				distanceList: [{
					value: '',
					text: '不限'
				}, {
					value: 500,
					text: '500米内'
				}, {
					value: 1000,
					text: '1000米内'
				}, {
					value: 2000,
					text: '2000米内'
				}, {
					value: 3000,
					text: '3000米内'
				}],
				statusList: [{
					value: 0,
					text: '不限'
				}, {
					value: 1,
					text: '有空位'
				}, {
					value: 2,
					text: '无空位'
				}, ],
				statusName: '',
				distance: '',
				keyWord: '',
				status: 0,
				current: 0,
				items: ['停车场', 'AED', '医院'],
				styleType: 'button',
				activeColor: '#007aff',
				isRefresh: false,
				data: null,
				myLoc: {
					lat: '',
					lon: ''
				}
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			change1(e) {
				this.distance = this.distanceList[e.detail.value].value
				this.distanceName = this.distanceList[e.detail.value].text
				this.getData()
			},
			change2(e) {
				this.status = this.statusList[e.detail.value].value
				this.statusName = this.statusList[e.detail.value].text
				this.getData()
			},
			async refresh() {
				if (this.isRefresh == false) {
					this.isRefresh = true
					await this.getData()
					
				}

			},
			search(index) {
				if(!index) {
					this.keyWord = ''
				}
				this.getData()
			},
			onClickItem(e) {
				this.current = e
				this.getData()
			},
			async getData() {
				this.myLoc = await this.location.getLocation()
				await this.http.post('around/index', {
					latitude: this.myLoc.lat,
					longitude: this.myLoc.lon,
					type: this.current + 1,
					distance: this.distance,
					status: this.status,
					search: this.keyWord
				}, 2).then((data) => {
					this.isRefresh = false
					if (this.current == 0) {
						this.data = data.parking
					} else if (this.current == 1) {
						this.data = data.aed
					} else if (this.current == 2) {
						this.data = data.hospital
					}

				})
			},
			nav(lon,lat,name,address) {
				var data = {
					longitude: lon,
					latitude: lat,
					schoolname: name,
					address: address,
				}
				this.location.openMap(data)
			},
		}
	}
</script>

<style>
	page {
		background-color: white;
	}
	
	.elder /deep/ .u-subsection .u-item-text{
		font-size: 40rpx !important;
	}

	/deep/.uni-load-more__text {
		font-size: 28rpx;
		margin-left: 16rpx;
	}
	

	/deep/ .uni-searchbar {
		padding: 0;
		margin: 32upx 0;
	}

	/deep/.uni-searchbar__box {
		height: 72upx;
		padding: 10upx 16upx 10upx 0;
	}

	/deep/.uni-searchbar__cancel {
		padding-left: 20upx;
		line-height: 72upx;
		font-size: 28upx;
		color: #428FFC;
	}
	
	.elder /deep/.uni-searchbar__cancel {
		font-size: 40rpx;
	}

	/deep/.uni-searchbar__box-icon-search {
		padding: 0 16upx;

	}

	/deep/.uni-searchbar__box-icon-search uni-text {
		font-size: 36upx !important;
	}
	
	.elder /deep/.uni-searchbar__box-icon-search uni-text {
		font-size: 48upx !important;
	}

	/deep/.uni-searchbar__text-placeholder {
		font-size: 28upx;
		margin-left: 10upx;
	}
	
	.elder /deep/.uni-searchbar__text-placeholder {
		font-size: 40upx;
	}

	/deep/.uni-searchbar__box-search-input {
		font-size: 28upx;
	}
	
	.elder /deep/.uni-searchbar__box-search-input {
		font-size: 40upx;
	}

	.rotate {

		animation: rotate 1s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.card {
		border-bottom: 1px solid rgba(232, 233, 236, 1);
		padding: 26rpx 0;
		display: flex;
	}

	.card:last-child {
		border-bottom: 0;
	}

	.card .item {
		width: 80%;
	}

	.card .title {
		font-size: 28rpx !important;
	}
	.elder .card .title{
		font-size: 40rpx !important;
	}

	.card .nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #666666;
		font-size: 24rpx;
	}
	
	.elder .card .nav {
		font-size: 32rpx;
	}

	.card .nav .icon-send-plane-fill {
		font-size: 28rpx;
		background-color: #428FFC;
		border-radius: 50%;
		color: white;
		padding: 10rpx 10rpx 7rpx 7rpx;
		margin-bottom: 8rpx;
	}
	
	.elder .card .nav .icon-send-plane-fill {
		font-size: 40rpx;
	}
</style>
