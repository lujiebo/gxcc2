var http = {
	post: function(url, params, type) {
		var user_token = '';
		if (type == 2 || type == 3) {
			user_token = uni.getStorageSync("user-token");
			if (type == 2) {
				if (!user_token) {
					uni.showToast({
						title: "未登录",
						icon: "none",
						mask: true
					});

					// var nowPage = window.location.href.split('#')[1];
					// uni.setStorageSync("referer_page", nowPage)
					// setTimeout(function() {
					// 	const sUserAgent = window.navigator.userAgent.toLowerCase()
					// 	const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1 // 浙里办APP
					// 	const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent
					// 		.indexOf('alipay') > -1 //支付宝
					// 	if (bIsDtDreamApp) {
					// 		window.location.replace(
					// 			"https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_75dc68cd4b42823600c378cac7fe33b8"
					// 			)
						
					// 	} else if (bIsAlipayMini) {
					// 		// window.location.href =
					// 		window.location.replace(
					// 			"https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=BCDSGA_75dc68cd4b42823600c378cac7fe33b8"
					// 			)
						
					// 	}
					// }, 1500);
					return;
				}
			} else {
				if (!user_token) {
					user_token = ''
				}
			}
		}
		uni.showLoading({});
		var apiurl = 'https://playground.mycej.com/index.php/api/'
		return new Promise(function(resolve, reject) {
			uni.request({
				url: apiurl + url,
				method: "POST",
				data: params,
				header: {
					'token': user_token
				}
			}).then(data => {
				uni.hideLoading();
				var [err, data] = data;
				uni.stopPullDownRefresh()
				if (!err) {
					if (data.statusCode == 200 && data.errMsg == "request:ok") {
						var result = data.data;


						if (result.code == 200) {
							resolve(result.data);
						} else if (result.code == 401) {
							uni.removeStorageSync('user-token');
							uni.showToast({
								title: result.message,
								icon: "none"
							})
							
						} else {
							uni.showToast({
								title: result.message,
								icon: "none"
							})
							reject(result);
						}
						// else if (result.code == 999) {
						// 	uni.removeStorageSync('user-token');
						// 	uni.showToast({
						// 		title: "登录状态过期，请重新登录",
						// 		icon: "none",
						// 		mask: true
						// 	});


						// 	setTimeout(function() {
						// 		// #ifndef ZHELIBAN
						// 		uni.navigateTo({
						// 			url: "/pages/user/login"
						// 		})
						// 		// #endif

						// 		// #ifdef ZHELIBAN
						// 		const sUserAgent = window.navigator.userAgent.toLowerCase()
						// 		const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') >-1 // 浙里办APP
						// 		const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 &&sUserAgent.indexOf('alipay') > -1 //支付宝
						// 		if (bIsDtDreamApp) {
						// 			window.location.href ="https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=zlxr"
						// 		} else if (bIsAlipayMini) {
						// 			window.location.href ="https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=zlxr"
						// 		}
						// 		// #endif
						// 	}, 1500);
						// 	reject(result);
						// }

					} else {
						uni.showToast({
							title: data.message,
							icon: "none"
						});
						reject(data.message);
					}
				} else {
					uni.showToast({
						title: "网络请求出错了",
						icon: "none"
					});
					reject('网络请求出错了');
				}

			})
		});
	},


	post2: function(url, params, type) {
		var user_token = '';
		if (type == 2 || type == 3) {
			user_token = uni.getStorageSync("user-token");
			if (type == 2) {
				if (!user_token) {
					uni.showToast({
						title: "请登录后进行操作",
						icon: "none",
						mask: true
					});
					setTimeout(function() {
						// #ifndef ZHELIBAN
						uni.navigateTo({
							url: "/pages/user/login"
						})
						// #endif

						// #ifdef ZHELIBAN
						const sUserAgent = window.navigator.userAgent.toLowerCase()
						const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1 // 浙里办APP
						const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent
							.indexOf('alipay') > -1 //支付宝
						if (bIsDtDreamApp) {
							window.location.href =
								"https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=zlxr"
						} else if (bIsAlipayMini) {
							window.location.href =
								"https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=zlxr"
						}
						// #endif
					}, 1500);

					return;
				}
			} else {
				if (!user_token) {
					user_token = ''
				}
			}
		}
		var apiurl = getApp().globalData.apiurl;
		return new Promise(function(resolve, reject) {
			uni.request({
				url: apiurl + url,
				method: "POST",
				data: params,
				header: {
					'session': user_token
				}
			}).then(data => {
				var [err, data] = data;
				if (!err) {
					if (data.statusCode == 200 && data.errMsg == "request:ok") {
						var result = data.data;

						if (result.code == 100) {
							resolve(result.data);
						} else if (result.code == 101) {
							uni.showToast({
								title: result.msg,
								icon: "none"
							})
							reject(result);
						} else if (result.code == 999) {
							uni.removeStorageSync('user-token');
							uni.showToast({
								title: "登录状态过期，请重新登录",
								icon: "none",
								mask: true
							});
							setTimeout(function() {
								// #ifndef ZHELIBAN
								uni.navigateTo({
									url: "/pages/user/login"
								})
								// #endif

								// #ifdef ZHELIBAN
								const sUserAgent = window.navigator.userAgent
									.toLowerCase()
								const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') >
									-1 // 浙里办APP
								const bIsAlipayMini = sUserAgent.indexOf(
									'miniprogram') > -1 && sUserAgent.indexOf(
									'alipay') > -1 //支付宝
								if (bIsDtDreamApp) {
									window.location.href =
										"https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=zlxr"
								} else if (bIsAlipayMini) {
									window.location.href =
										"https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=zlxr"
								}
								// #endif
							}, 1500);

							reject(result);
						}

					} else {
						uni.showToast({
							title: data.errMsg,
							icon: "none"
						});
						reject(data.errMsg);
					}
				} else {
					uni.showToast({
						title: "网络请求出错了",
						icon: "none"
					});
					reject('网络请求出错了');
				}

			})
		});
	}
};
export default http
