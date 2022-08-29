var location = {
	async getLocation() {
		var oldTime = getApp().globalData.timestamp
		var now = Date.now()
		if (now - oldTime > 30000) {
			var res = await ZWJSBridge.getLocation({})
			console.log(res)
			if (res) {
				getApp().globalData.timestamp = now
				getApp().globalData.myLoc.lat = res.latitude
				getApp().globalData.myLoc.lon = res.longitude
			}

			return getApp().globalData.myLoc
		} else {
			return getApp().globalData.myLoc
		}

	},
	openMap: function(data) {
		const sUserAgent = window.navigator.userAgent.toLowerCase()
		const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1 // 浙里办APP
		const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1 //支付宝
		
		if (bIsDtDreamApp) {
			ZWJSBridge.openLink({
				"url": 'zwfw://openThirdMap?longitude='+ data.longitude +'&latitude='+ data.latitude +'&locationName=' + data.schoolname
			}).then(res => {
				console.log(res)
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '唤起地图失败'
				})
			})
		} else if (bIsAlipayMini) {
			my.openLocation({
				longitude: data.longitude,
				latitude: data.latitude,
				name: data.schoolname,
				address: data.address,
			})
		}
	},
	bd09togcj02: function(bd_lon, bd_lat) {
		var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
		var x = bd_lon - 0.0065;
		var y = bd_lat - 0.006;
		var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
		var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
		var gg_lng = z * Math.cos(theta);
		var gg_lat = z * Math.sin(theta);
		return [gg_lng, gg_lat]
	}
}



export default location
