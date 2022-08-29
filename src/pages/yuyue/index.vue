<template>
	<view class="container" :class="uiStyle=='normal'?'':'elder'">
		<view class="top">
			<view class="map" @click="toMap()">
				<!-- toMap() -->
				<view class="icon-road-map-fill"></view>
				<view class="u-font-24">地图</view>
			</view>
			<view class="search" @click="toSearch">
				<view class="icon-search-line"></view>
				<view>搜索操场</view>
			</view>
			<view class="item">
				<view>{{topList.total|getBouble()}}</view>
				<view>可预约总量</view>
			</view>
			<view class="item">
				<view>{{topList.ready|getBouble()}}</view>
				<view>已预约</view>
			</view>
			<view class="item">
				<view style="color: #FDE163;">{{topList.left|getBouble()}}</view>
				<view>剩余可预约</view>
			</view>
		</view>

		<view class="flex space-between u-m-t-70 u-m-b-30 u-p-lr-40" style="color: #363A44;">
			<view class="flex">
				<!-- <picker @change="areaChange" :value="0" :range="arealist" range-key="text">
					<view>{{area?area:'选择区域'}}<span class="icon-arrow-down-s-fill"></span></view>
				</picker> -->
				<view class="u-flex u-m-r-20">
					<u-picker mode="selector" v-model="show1" @confirm="areaChange" :range="arealist" range-key="text" :defaultSelector="[areaIndex]"></u-picker>
					<view class="picker u-flex" @click="show1 = true">
						<view :class="area?'':'placeholder'">
							{{area?area:'选择区域'}}
						</view>
						<span class="icon-arrow-down-s-fill"></span>
					</view>
				</view>
				<view class="u-flex">
					<u-picker mode="selector" v-model="show2" @confirm="sportChange" :range="sporttype" range-key="text" :defaultSelector="[sportIndex]"></u-picker>
					<view class="picker u-flex" @click="show2 = true">
						<view :class="sport?'':'placeholder'">
							{{sport?sport:'选择运动'}}
						</view>
						<span class="icon-arrow-down-s-fill"></span>
					</view>
				</view>

				<!-- <picker class="u-m-l-40" @change="sportChange" :value="0" :range="sporttype" range-key="text">
					<view>{{sport?sport:'选择运动'}}<span class="icon-arrow-down-s-fill"></span></view>
				</picker> -->
			</view>
			<!-- <view class="action">更多筛选<span class="icon-filter-2-fill"></span></view> -->
		</view>
		<view v-if="list.list && list.list.length>0">
			<view class="card card2" v-for="(item,index) in list.list" @click="toYuyue(item.id)">
				<image 
				  style="width: 220upx;height: 184upx;" 
				  :src="item.cover[0].url"
				   mode="aspectFill"
				   lazy-load
				>
				</image>
				<view class="content" style="justify-content: flex-start;">
					<view class="title text-ellipsis-2" style="flex-shrink: 0;">{{item.schoolname}}</view>
					<view>
						<view class="flex space-between">
							<view class="icon-map-pin-line text-ellipsis-1">{{item.address}}
							</view>
							<view>{{item.distance}}</view>
						</view>
						<view style="display: flex; margin-top: 10upx;flex-wrap: wrap;">
							<view class="tag" v-for="(i,inx) in item.label">{{i}}</view>
						</view>
						<button v-if="!item.is_full" class="btn-s" >可预约</button>
						<button v-else class="btn-orange btn-s btn-disabled">已约满</button>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="list.list && list.list.length>0" :status="status" margin-top="20" />
		<u-empty text="暂无数据" mode="data" v-if="(list.list.length==0) || (!list.list)" margin-top="100"></u-empty>
	</view>
</template>

<script>
	import mixin_list from '@/utils/list.js'
	export default {
		mixins: [mixin_list],
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list_url: 'order/search',
				// status: 'nomore',
				search_params: {},
				show1:false,
				show2:false,
				area: '',
				areaIndex: 0,
				arealist: [{
					value: null,
					text: '全部'
				}],
				sport: '',
				sportIndex: 0,
				sporttype: [{
					value: null,
					text: '全部'
				}],
				topList: {
					total: 0,
					ready: 0,
					left: 0
				},
				loc: {
					lat: null,
					lon: null
				},
			}
		},
		onLoad() {
			this.init()
		},
		filters: {
			getBouble(val) {
				if (val != 'undefined' && val) {
					var b = val.toString();
					return b;
				} else {
					return '0';
				}
			}
		},
		methods: {
			async getData() {
				this.loc = await this.location.getLocation()
				this.search_params = {
					area: this.arealist[this.areaIndex].value,
					sporttype: this.sporttype[this.sportIndex].value,
					longitude: this.loc.lon,
					latitude: this.loc.lat,
				}
				this.getlist(true)
			},
			init() {
				this.arealist = [{
					value: null,
					text: '全部'
				}]
				this.sporttype = [{
					value: null,
					text: '全部'
				}]
				this.http.post('order/getSearchParam', {}, 2).then((data) => {

					for (var i in data.arealist) {
						this.arealist.push({
							value: i,
							text: data.arealist[i]
						})
					}
					for (var j in data.sporttype) {
						this.sporttype.push({
							value: j,
							text: data.sporttype[j]
						})
					}
				})

				this.http.post('order/getOrdercount', {}, 2).then((data) => {
					this.topList = data
				})

				this.getData()
			},
			toSearch() {
				uni.navigateTo({
					url: './search'
				})
			},
			toYuyue(id) {
				uni.navigateTo({
					url: './yuyueDetail?id=' + id
				})
			},
			areaChange(e) {
				if (this.areaIndex != e) {
					this.areaIndex = Number(e)
					if (e != 0) {
						this.area = this.arealist[e].text
					} else {
						this.area = ''
					}
					this.getData()
				}

			},
			sportChange(e) {
				if (this.sportIndex != e) {
					this.sportIndex = Number(e)
					if (e != 0) {
						this.sport = this.sporttype[e].text
					} else {
						this.sport = ''
					}
					this.getData()
				}

			},
			toMap() {
				uni.navigateTo({
					url: 'map'
				})
			}

		}
	}
</script>

<style scoped>
	page {
		background-color: white;
	}


	.container {
		font-size: 28upx;
	}
	.elder  {
		font-size: 40upx;
	}
	.elder .top {
		height: 220rpx;
	}
	
	.elder .top .item {
		margin-right: 10rpx;
	}
	
	.elder .top .map {
		width: 130rpx;
		height: 130rpx;
		right: 20rpx;
	}
	.elder .top .item view:first-child {
		font-size: 48rpx;
	}
	
	.elder .top .search {
		top: 186rpx;
	}

	.top {
		height: 180upx;
		width: 100%;
		background-color: rgb(96, 160, 239);
		display: flex;
		color: white;
		padding: 26upx 0 0 40upx;
	}

	.top .item {
		text-align: center;
		margin-right: 62upx;
	}

	.top .item view:first-child {
		font-size: 32upx;
		line-height: 1.5;
	}

	.top .item view:last-child {
		margin-top: 8upx;
		line-height: 1.2;
	}


	.top .map {
		position: absolute;
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 1);
		border: 6upx solid rgba(158, 197, 253, 0.51);
		color: #428FFC;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 48upx;
		right: 40upx;
	}
	
	

	.top .search {
		position: absolute;
		width: 650upx;
		height: 68upx;
		border-radius: 34upx;
		background-color: #E9F0F9;
		color: #686868;
		display: flex;
		align-items: center;
		padding-left: 24upx;
		top: 146upx;
	}

	/deep/.uni-load-more__text {
		font-size: 28rpx;
		margin-left: 16rpx;
	}

	.card2 {
		height: auto;
		border-bottom: 2upx solid rgb(232, 233, 236);
		padding: 20upx 40upx;
		margin: 0;
	}

	.card2:last-child {
		border-bottom: 0;
	}

	.tag {
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	
	.elder button {
		height: 60rpx;
		border-radius: 30rpx;
	}
</style>
