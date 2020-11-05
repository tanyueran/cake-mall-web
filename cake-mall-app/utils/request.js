function request(obj) {
	let token = uni.getStorageSync('token');
	return new Promise((resolve, reject) => {
		uni.request({
			url: obj.url,
			method: obj.method,
			data: obj.data,
			header: {
				token: token ? token : '',
			},
			success(res) {
				if (res.data.code === 200) {
					resolve(res.data.data);
				} else if (res.data.code === 401) {
					uni.redirectTo({
						url: '/pages/login/index',
						success() {
							// 清空token
							uni.setStorageSync("token", "");
							uni.showToast({
								icon: 'none',
								title: res.data.msg || "请求出错",
							});
						}
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data.msg || "请求出错",
					});
					reject(res.data);
				}
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: "请求出错",
				});
				reject(err);
			}
		});
	});
}

export default request;
