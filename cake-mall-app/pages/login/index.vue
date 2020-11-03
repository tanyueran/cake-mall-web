<template>
	<view class="content">
		<view>
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<view></view>
			<view class="form-wrapper">
				<view class="item-wrapper">
					<view class="iconfont icon-people"></view>
					<input v-model="username" placeholder="账号" />
				</view>
				<view class="item-wrapper">
					<view class="iconfont icon-lock"></view>
					<input v-model="password" type="password" placeholder="密码" />
				</view>
				<view class="text-right forget-wrapper" @click="forgetPwdHandler">
					忘记密码
				</view>
				<view class="text-center login-btn-wrapper">
					<button type="default" @click="loginHandler">登录</button>
				</view>
				<view class="text-center register-wrapper">
					注册账号
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from "js-md5";
	// 用户登录页面
	import {
		login,
	} from "../../api/user.js"
	export default {
		data() {
			return {
				username: '',
				password: '',
			}
		},
		onLoad() {

		},
		methods: {
			// 忘记密码
			forgetPwdHandler() {
				uni.showToast({
					icon: 'none',
					title: '请联系管理员',
					duration: 2000
				});
			},
			// 登录
			loginHandler() {
				if (this.username && this.password) {
					login({
						username: this.username,
						password: md5(this.password),
					}).then(res => {
						console.log(res);
					}).catch((err) => {
						this.username = "";
						this.password = "";
						console.log(err);
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '账号密码不可为空',
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.form-wrapper {
		&:after {
			content: "";
			display: table;
		}

		position: absolute;
		top: 40%;
		left: 50%;
		width: 65%;
		transform: translate(-50%, -50%);

		.item-wrapper {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #303030;

			.iconfont {
				font-size: 40rpx;
			}
		}

		.forget-wrapper,
		.register-wrapper {
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			color: #2AB795;
		}

		input {
			height: 60rpx;
			padding: 10rpx;
		}

		.login-btn-wrapper {
			button {
				height: 60rpx;
				line-height: 60rpx;
				border: none;
				background-color: #2AB795;
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
</style>
