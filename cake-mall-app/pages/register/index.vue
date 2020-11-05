<template>
	<view class="content">
		<view>
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<view></view>
			<view class="form-wrapper">
				<view class="head-img-wrapper">
					<view class="head-img" @click="chooseHandler">
						<template v-if="!headImg">
							<view class="iconfont icon-add"></view>
							添加头像
						</template>
						<template v-else>
							<image :src="previewImg(headImg)" mode="scaleToFill"></image>
						</template>
					</view>
				</view>
				<view class="item-wrapper">
					<view class="iconfont icon-people"></view>
					<input v-model="userCode" placeholder="账号" />
				</view>
				<view class="item-wrapper">
					<view class="iconfont icon-profile_light"></view>
					<input v-model="nickname" placeholder="昵称" />
				</view>
				<view class="item-wrapper">
					<view class="iconfont icon-profile"></view>
					<input v-model="userName" placeholder="姓名" />
				</view>
				<view class="item-wrapper">
					<view class="iconfont icon-lock"></view>
					<input v-model="userPwd" type="password" placeholder="密码" />
				</view>
				<view class="btn-wrapper">
					<button :loading="loading" @click="registerHandler">注册</button>
				</view>
				<view class="text-right link" @click="loginHanlder">
					已有账号
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from "js-md5";
	import {
		getKey,
		uploadFile,
		previewFile,
	} from '../../api/common.js';
	import {
		register,
	} from '../../api/user.js'
	export default {
		data() {
			return {
				loading: false,
				id: '',
				userName: '',
				nickname: '',
				headImg: '',
				userCode: '',
				userPwd: '',
			}
		},
		methods: {
			// 获取主键
			getPrimarykey() {
				getKey(1).then(res => {
					this.id = res[0];
				}).catch(() => {});
			},
			// 登录
			loginHanlder() {
				uni.reLaunch({
					url: '../login/index',
				})
			},
			// 预览
			previewImg(fileId) {
				return previewFile(fileId);
			},
			// 选择头像
			chooseHandler() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						// 上传图片
						uploadFile(res.tempFilePaths[0]).then(res => {
							this.$set(this, "headImg", res);
						}).catch(err => {
							console.log(err);
						})
					}
				});
			},
			// 注册账号
			registerHandler() {
				this.loading = true;
				register({
					id: this.id,
					nickname: this.nickname,
					userName: this.userName,
					headImg: this.headImg,
					userCode: this.userCode,
					userPwd: md5(this.userPwd),
				}).then(res => {
					if (res) {
						uni.reLaunch({
							url: '/pages/login/index',
							success() {
								uni.showToast({
									title: '注册成功，请登录！',
								});
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '注册失败',
						});
					}
				}).catch((err) => {
					console.log(err);
				}).finally(() => {
					this.loading = false;
				})
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
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;

		.item-wrapper {
			border-bottom: 1rpx solid #333;
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;

			input {
				height: 80rpx;
				padding-left: 20rpx;
			}
		}

		.btn-wrapper {
			button {
				height: 70rpx;
				line-height: 70rpx;
				margin: 20rpx 0;
				background-color: #2AB795;
				color: #fff;
			}
		}

		.link {
			color: #2AB795;
		}

		.head-img-wrapper {
			display: flex;
			justify-content: center;

			.head-img {
				height: 200rpx;
				width: 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 2rpx solid #f0f0f0;
				border-radius: 50%;
				background-color: rgba(33, 33, 33, .3);
				color: #fff;
				overflow: hidden;

				image {
					height: 100%;
					width: 100%;

				}

				.iconfont {
					font-size: 40rpx;
				}
			}
		}
	}
</style>
