<template>
	<view>
		<view id="map"></view>
		<view class="top">
			<view class="search" @click="toSearch()">
				<view class="icon-search-line"></view>
				<view>搜索操场</view>
			</view>
			<view class="list" @click="toList()">
				<u-icon name="list-dot" color="white" size="40"></u-icon>
			</view>
		</view>

		<u-popup v-model="calloutShow" mode="bottom" :closeable="true">
			<view class="u-p-lr-40 text-grey" style="width: 100%;">
				<view class="title u-m-t-20">{{calloutList.schoolname}}
					<button v-if="!calloutList.is_full" class="btn-s u-m-l-10">可预约</button>
					<button v-else class="btn-orange btn-s btn-disabled u-m-l-10">已约满</button>
				</view>
				<view class="u-flex u-row-between u-m-tb-10 u-font-28">
					<view><span class="icon-map-pin-line text-grey-icon u-m-r-10"></span>{{calloutList.address}}</view>
					<view>{{calloutList.distance}}</view>
				</view>
				<view class="u-m-tb-10 u-flex u-font-28" style="align-items: baseline;">
					<span class="icon-time-line text-grey-icon u-m-r-10"></span>
					<span>
						<view>
							工作日:{{calloutList.opentime}}
						</view>
						<view>
							节假日:{{calloutList.opentimeweek}}
						</view>
					</span>
				</view>
				<view style="display: flex; margin-top: 10upx;flex-wrap: wrap;">
					<view class="tag u-m-r-10" v-for="(i,inx) in calloutList.label">{{i}}</view>
				</view>
				<view class="u-m-t-20" style="padding-bottom: calc(40rpx + env(safe-area-inset-bottom));">
					<button class="btn-line u-m-r-14" style="width: 200rpx;height: 74rpx;border-radius: 37rpx;" @click="detail(calloutList.id)">查看详情</button>
					<button style="width: 460rpx;height: 74rpx;border-radius: 37rpx;"@click="toYuyue(calloutList.id,calloutList.schoolname)">预约入场名额</button>
				</view>
				
			</view>
		</u-popup>


	</view>
</template>

<script>
	import AMapLoader from '@amap/amap-jsapi-loader';
	import myIcon from '@/static/myIcon.png'
	import yuyueIcon from '@/static/yuyueIcon.png'
	import manIcon from '@/static/manIcon.png'
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				map: null,
				pos_my: null,
				pos_yuyue: null,
				pos_man: null,
				myPoint: null,
				allPoint: null,
				calloutList: {

				},
				calloutShow: false,
			}
		},
		onLoad() {
			AMapLoader.load({
				"key": "97a32e26b52e4b2711187e213a08b837", // 申请好的Web端开发者Key，首次调用 load 时必填
				"version": "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
				"plugins": [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
			}).then((AMap) => {
				this.map = new AMap.Map('map', {
					zoom: 12, //级别
					center: [121.266470, 30.169640], //中心点坐标
				});
				this.mapInit()
			}).catch(e => {
				console.log(e);
			})
		},
		methods: {
			toList() {
				uni.navigateBack({
					delta: 1
				})
			},
			toSearch() {
				uni.navigateTo({
					url: 'search'
				})
			},
			mapInit() {
				if (this.uiStyle == 'elder') {
					var size = new AMap.Size(60, 60)
				} else {
					var size = new AMap.Size(40, 40)
				}
				this.pos_my = new AMap.Icon({
					// 图标尺寸
					size: size,
					// 图标的取图地址
					image: myIcon,
					// 图标所用图片大小
					imageSize: size,
				});
				this.pos_yuyue = new AMap.Icon({
					// 图标尺寸
					size: size,
					// 图标的取图地址
					image: yuyueIcon,
					// 图标所用图片大小
					imageSize: size,
				});
				this.pos_man = new AMap.Icon({
					// 图标尺寸
					size: size,
					// 图标的取图地址
					image: manIcon,
					// 图标所用图片大小
					imageSize: size,
				});
				this.map.on("complete", () => {
					this.init()

				});
			},
			async init() {
				this.myLoc = await this.location.getLocation()
				this.map.setCenter([this.myLoc.lon, this.myLoc.lat]);
				this.myPoint = new AMap.Marker({
					icon: this.pos_my,
					position: [Number(this.myLoc.lon), Number(this.myLoc.lat)],
					anchor: 'bottom-center',
					clickable: true,
					offset: new AMap.Pixel(0, 0)
				})
				this.map.add(this.myPoint);
				// await this.getData()
				// this.mapAnima(this.myLoc.lon, this.myLoc.lat)
				this.map.setZoom(15)
				this.getData()
			},
			getData() {
				this.allPoint = []
				this.http.post('order/search', {
					latitude: Number(this.myLoc.lat),
					longitude: Number(this.myLoc.lon),
					pageNo: 1,
					pageSize: 75
				}, 2).then((data) => {
					data.list.forEach((v, index) => {
						this.allPoint.push(new AMap.Marker({
							icon: v.is_full ? this.pos_man : this.pos_yuyue,
							position: [Number(v.longitude), Number(v.latitude)],
							anchor: 'bottom-center',
							clickable: true,
							offset: new AMap.Pixel(0, 0)
						}))

						this.allPoint[index].on('click', (val) => {

							this.http.post('order/orderPrevSimple', {
								schoolid: v.id
							}, 2).then((data) => {

								var time1 = ''
								if (data.opentime[0][0] == '00:00' && data.opentime[0][
									1] == '00:00') {
									time1 = '不开放'
								} else {
									data.opentime.forEach((v) => {
										time1 += (v[0] + '-' + v[1] + ' ')
									})
								}

								var time2 = ''
								if (data.opentimeweek[0][0] == '00:00' && data
									.opentimeweek[0][1] == '00:00') {
									time2 = '不开放'
								} else {
									data.opentimeweek.forEach((v) => {
										time2 += (v[0] + '-' + v[1] + ' ')
									})
								}

								this.calloutList = {
									id: Number(data.id),
									latitude: data.latitude,
									longitude: data.longitude,
									schoolname: data.schoolname,
									address: data.address,
									distance: v.distance,
									opentime: time1,
									opentimeweek: time2,
									label: data.label,
									is_full:v.is_full,
									
								}
								this.calloutShow = true
							})
						});
					})

					this.map.add(this.allPoint);
				})
			},
			detail(id){
				uni.navigateTo({
					url:'yuyueDetail?id='+id
				})
			},
			toYuyue(id,title){
				uni.navigateTo({
					url:'ruchang?id='+id+'&&title='+title
				})
			},
		}
	}
</script>

<style>
	#map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.top {
		position: absolute;
		width: 100%;
		top: 16rpx;
		left: 40rpx;
		display: flex;
	}

	.top .search {
		width: 574rpx;
		height: 68rpx;
		border-radius: 34rpx;
		background-color: white;
		color: #686868;
		display: flex;
		align-items: center;
		padding-left: 24rpx;

	}

	.top .list {
		width: 90rpx;
		height: 68rpx;
		background-color: #428FFC;
		border-radius: 34rpx;
		margin-left: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
