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
					<input v-model="userCode" placeholder="账号" />
				</view>
				<view class="item-wrapper">
					<view class="iconfont icon-people"></view>
					<input v-model="nickname" placeholder="昵称" />
				</view>
				<view class="item-wrapper">
					<view class="iconfont icon-people"></view>
					<input v-model="userName" placeholder="账号" />
				</view>
				<view class="item-wrapper">
					<view class="iconfont icon-lock"></view>
					<input v-model="userPwd" type="password" placeholder="密码" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				userName: '',
				nickname: '',
				headImg: '',
				userCode: '',
				userPwd: '',
			}
		}
	}
</script>

<style lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.form-wrapper {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;

		.item-wrapper {
			border-bottom: 1rpx solid #333;
			display: flex;
			align-items: center;

			input {
				height: 60rpx;
				padding-left: 20rpx;
			}
		}
	}
</style>
