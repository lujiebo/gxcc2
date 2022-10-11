var http = {
	//访问yj服务器
	get: function(url, params, type) {
		var user_token = '';
		if (type == 2 || type == 3) {}
		user_token = uni.getStorageSync("user-token");
		uni.showLoading({});
		var apiurl = 'https://test.nbyjzh.com/api/'
		return new Promise(function(resolve, reject) {
			uni.request({
				//url: apiurl + url,
				url: url,
				method: "GET",
				data: params,
				header: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Ca-Token': user_token
				}
			}).then(data => {
				uni.hideLoading();
				var [err, data] = data;
				uni.stopPullDownRefresh()
				if (!err) {
					if (data.statusCode == 200 && data.errMsg == "request:ok") {
						var result = data.data;
						if (result.status == 1) {
							resolve(result.data);
						}
					} else {
						uni.showToast({
<<<<<<< HEAD
							title: data.data.msg,
							icon: "none"
						});
						reject(data.data.msg);
=======
							title: data.msg,
							icon: "none"
						});
						reject(data.msg);
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
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
	post1: function(url, params, type) {
		var user_token = '';
		if (type == 2 || type == 3) {
			user_token = uni.getStorageSync("user-token");
		}
		uni.showLoading({});
		var apiurl = 'https://test.nbyjzh.com/api/'
		return new Promise(function(resolve, reject) {
			uni.request({
				//url: apiurl + url,
				url: url,
				method: "POST",
				data: params,
				header: {
					'X-Ca-Token': user_token,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}).then(data => {
				uni.hideLoading();
				var [err, data] = data;
				uni.stopPullDownRefresh()
				if (!err) {
					if (data.statusCode == 200 && data.errMsg == "request:ok") {
						var result = data.data;
						resolve(result);
					} else {
						uni.showToast({
<<<<<<< HEAD
							title: data.data.msg,
							icon: "none"
						});
						reject(data.data.msg);
=======
							title: data.message,
							icon: "none"
						});
						reject(data.message);
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
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
