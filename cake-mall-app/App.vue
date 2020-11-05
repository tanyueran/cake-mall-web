<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function(options) {
			console.log('App Show');
			// 判断是否登录
			if (this.$store.getters.getToken == "") {
				if (options.path != "pages/register/index") {
					uni.reLaunch({
						url: '/pages/login/index'
					});
				}
			} else {
				this.$store.dispatch("refreshToken");
				this.$store.dispatch("getUserInof");
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError: function(err) {
			console.log(err);
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		height: 100%;
	}
</style>
