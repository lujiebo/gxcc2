<template>
	<view class="container" :class="uiStyle=='normal'?'':'elder'">
		<view id="map"></view>
		<view class="right-panel">
			<view class="item" :class="park?'item2':''" @click="park = !park">
				<view class="icon-device-parking"></view>
				<view class="text">停车场</view>
			</view>
			<view class="item" :class="aed?'item2':''" @click="aed = !aed">
				<view class="icon-aed" style="font-weight: bold;"></view>
				<view class="text">AED</view>
			</view>
			<view class="item" :class="hos?'item2':''" @click="hos = !hos">
				<view class="icon-hospital-line"></view>
				<view class="text">医院</view>
			</view>
		</view>


		<view class="callout" v-if="calloutShow">
			<view style="width: 100%;display: flex;justify-content: flex-end;">
				<view class="icon-close-fill" style="color: white;" @click="calloutShow = false"></view>
			</view>
			<view style="display: flex;width: 100%;height: 100%;">
				<view style="height: 100rpx;width: 90rpx;margin: auto 0; margin-right: 20rpx;">
					<image v-if="calloutList.onepic" :src="calloutList.onepic" style="height: 100rpx;width: 90rpx;">
					</image>
				</view>

				<view style="height: 100%;width: 100%;">
					<view class="u-font-22" style="color: rgb(242, 84, 3);width: 420rpx;">{{calloutList.juli}}</view>
					<view class="u-font-24"
						style="color: rgb(255, 255, 255);font-weight: bold;width: 400rpx;margin-top: 8rpx;">
						{{calloutList.address}}
					</view>
					<view class="u-font-24" style="color: rgb(206, 219, 222);width: 400rpx;margin-top: 8rpx;">
						{{calloutList.detail}}
					</view>
				</view>
				<view class="daohangIcon icon-send-plane-fill" @click="daohang">
				</view>
			</view>
		</view>
		
		<view class="refresh" @click="refresh">
			<view class="icon-restart-line"></view>
		</view>

		<view class="search" @click="toSearch">
			<view class="icon-search-line"></view>
			<view class="u-m-l-20">搜索周边</view>
		</view>
	</view>
</template>

<script>
	import AMapLoader from '@amap/amap-jsapi-loader';
	// import myIcon from '@/static/location-mine.png'
	// import otherIcon from '@/static/location-other.png'

	import AEDIcon from '@/static/AEDIcon.png'
	import hospitalIcon from '@/static/hospitalIcon.png'
	import pIcon from '@/static/p.png'
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				map: null,
				park: true,
				aed: false,
				hos: false,
				pos_aed: null,
				pos_hos: null,
				pos_park: null,
				aedList: [],
				hosList: [],
				parkList: [],
				myLoc: {
					lat: 30.169640,
					lon: 121.266470,
				},
				calloutShow: false,
				calloutList: {
					onepic: '',
					juli: 123,
					address: 'gfdgfdgf',
					detail: 'gfdgfdgdfgdfgfdgf',
				},
				data: null,

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
		onShow() {
			
		},
		watch: {
			park(val) {
				if (val) {
					this.map.add(this.parkList);
				} else {
					this.map.remove(this.parkList);
				}
			},
			aed(val) {
				if (val) {
					this.map.add(this.aedList);
				} else {
					this.map.remove(this.aedList);
				}
			},
			hos(val) {
				if (val) {
					this.map.add(this.hosList);
				} else {
					this.map.remove(this.hosList);
				}
			}
		},
		methods: {
			refresh() {
				this.calloutShow = false
				this.init()
			},
			mapInit() {
				if(this.uiStyle == 'elder') {
					var size = new AMap.Size(60, 60)
				} else {
					var size = new AMap.Size(40, 40)
				}
				this.pos_aed = new AMap.Icon({
					// 图标尺寸
					size: size,
					// 图标的取图地址
					image: AEDIcon,
					// 图标所用图片大小
					imageSize: size,
				});
				this.pos_hos = new AMap.Icon({
					// 图标尺寸
					size: size,
					// 图标的取图地址
					image: hospitalIcon,
					// 图标所用图片大小
					imageSize: size,
				});
				this.pos_park = new AMap.Icon({
					// 图标尺寸
					size: size,
					// 图标的取图地址
					image: pIcon,
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
				await this.getData()
				this.setAed()
				this.setHos()
				this.setPark()
				// this.mapAnima(this.myLoc.lon, this.myLoc.lat)
				this.map.setZoom(15)
			},
			setAed() {
				this.aedList = []
				this.data.aed.forEach((v, index) => {
					this.aedList.push(new AMap.Marker({
						icon: this.pos_aed,
						position: [Number(v.lon), Number(v.lat)],
						anchor: 'bottom-center',
						clickable: true,
						offset: new AMap.Pixel(0, 0)
					}))
					this.aedList[index].on('click', (data) => {
						this.calloutList = {
							id: Number(v.id),
							latitude: v.lat,
							longitude: v.lon,
							address: v.address,
							detail: v.streetNo,
							juli: v.distance,
							onepic: v.onePic,
						}
						this.calloutShow = true
					});
				})
				if (this.aed) {
					this.map.add(this.aedList);
				}

			},
			setHos() {
				this.hosList = []
				this.data.hospital.forEach((v, index) => {
					this.hosList.push(new AMap.Marker({
						icon: this.pos_hos,
						position: [Number(v.lon), Number(v.lat)],
						anchor: 'bottom-center',
						clickable: true,
						offset: new AMap.Pixel(0, 0)
					}))

					this.hosList[index].on('click', (data) => {
						this.calloutList = {
							id: Number(v.id),
							latitude: v.lat,
							longitude: v.lon,
							address: v.name,
							detail: v.address,
							juli: v.distance,
							onepic: hospitalIcon,
						}
						this.calloutShow = true
					});

				})
				if (this.hos) {
					this.map.add(this.hosList);
				}

			},
			setPark() {
				this.parkList = []
				this.data.parking.forEach((v, index) => {
					this.parkList.push(new AMap.Marker({
						icon: this.pos_park,
						position: [Number(v.baidulo), Number(v.baidula)],
						anchor: 'bottom-center',
						clickable: true,
						offset: new AMap.Pixel(0, 0)
					}))

					this.parkList[index].on('click', (data) => {
						this.calloutList = {
							id: Number(v.id),
							latitude: v.baidula,
							longitude: v.baidulo,
							address: v.parkpointname,
							detail: v.address,
							juli: v.distance,
							onepic: pIcon,
						}
						this.calloutShow = true
					});

				})
				if (this.park) {
					this.map.add(this.parkList);
				}

			},
			async getData() {
				await this.http.post('around/index', {
					latitude: this.myLoc.lat,
					longitude: this.myLoc.lon,
					type: 0,
					distance: 5000,
					status: 0,
					search: ''
				}, 2).then((data) => {
					
					var parkList = []
					for (var i in data.parking) {
						parkList.push(data.parking[i])
					}
					
					this.data = data
					this.data.parking = parkList
				})
			},
			daohang() {
				var data = {
					longitude: this.calloutList.longitude,
					latitude: this.calloutList.latitude,
					schoolname: this.calloutList.address,
					address: this.calloutList.detail,
				}
				this.location.openMap(data)
			},
			toSearch() {
				uni.navigateTo({
					url: 'search'
				})
			},
			mapAnima(lon, lat) {
				lon = Number(lon)
				lat = Number(lat)
				var canvas = document.createElement('canvas');
				canvas.width = canvas.height = 200;

				var context = canvas.getContext('2d')
				context.fillStyle = 'rgba(0,100,255,0.7)';
				context.strokeStyle = 'rgba(255,255,255,0.0)';
				context.globalAlpha = 1;
				context.lineWidth = 2;

				var radious = 0;
				var draw = function() {
					context.clearRect(0, 0, 200, 200)
					context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1;
					radious = (radious + 1) % 100;

					context.beginPath();
					context.arc(100, 100, radious, 0, 2 * Math.PI);
					context.fill();
					context.stroke();

					//2D视图时可以省略
					CanvasLayer.reFresh();

					AMap.Util.requestAnimFrame(draw);
				};

				var CanvasLayer = new AMap.CanvasLayer({
					canvas: canvas,
					bounds: new AMap.Bounds(
						[lon - 0.01, lat - 0.005],
						[lon + 0.01, lat + 0.005]
					), //116.335183, 39.941735
					zooms: [3, 18],
				});

				CanvasLayer.setMap(this.map);
				draw();
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

	.right-panel {
		position: fixed;
		top: 210rpx;
		right: 20rpx;
		width: 104rpx;
		background-color: white;
		height: 338rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		border-radius: 8rpx;
		box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.24);
	}

	.right-panel .item {
		width: 100%;
		height: 33.3%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.right-panel .item [class*="icon-"] {
		color: #686B73;
		font-size: 44rpx;
	}

	.right-panel .item .text {
		color: #363A44;
		font-size: 24rpx;
		margin-top: 5rpx;
	}

	.elder .right-panel {
		width: 140rpx;
		height: 370rpx;
	}

	.elder .right-panel .item .text {
		font-size: 40rpx;
	}

	.right-panel .item2 [class*="icon-"] {
		color: #428FFC;
		font-size: 44rpx;
	}

	.right-panel .item2 .text {
		color: #428FFC;
		font-size: 24rpx;
		margin-top: 5rpx;
	}

	.callout {
		width: 650rpx;
		background-color: rgb(50, 70, 87);
		box-shadow: rgb(0 0 0 / 40%) 0rpx 4rpx 12rpx 0rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		padding: 10rpx 20rpx 20rpx 20rpx;
		position: absolute;
		top: 120rpx;
		left: 50rpx;
		z-index: 99999;
	}

	.elder .callout .daohangIcon {
		top: 100rpx;
	}

	.callout .daohangIcon {
		width: 80rpx;
		height: 80rpx;
		background-color: #428FFC;
		position: absolute;
		font-size: 42rpx;
		right: 30rpx;
		top: 50rpx;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search {
		position: fixed;
		width: 88%;
		height: 68rpx;
		border-radius: 34rpx;
		background-color: white;
		color: #686868;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		top: 70rpx;
		left: 40rpx;
	}
	
	.refresh {
		width: 60rpx;
		height: 60rpx;
		border-radius: 8rpx;
		background-color: white;
		position: absolute;
		right: 20rpx;
		box-shadow: rgb(0 0 0 / 40%) 0rpx 4rpx 12rpx 0rpx;
		bottom: 500rpx;
		font-size: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}
	
	.elder .refresh{
		width: 90rpx;
		height: 90rpx;
		font-size: 48rpx;
	}
</style>
