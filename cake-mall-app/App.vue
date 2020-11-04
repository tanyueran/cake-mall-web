<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show');
			// 判断是否登录
			if (this.$store.getters.getToken == "") {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			} else {
				this.$store.dispatch("refreshToken");
				this.$store.dispatch("getUserInof");
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		height: 100%;
	}
</style>
