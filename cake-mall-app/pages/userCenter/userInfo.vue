<template>
	<view class="content">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<uni-nav-bar left-icon="back" left-text="" @clickRight="saveHandler" @clickLeft="backHandler" right-text="保存" title="个人信息"></uni-nav-bar>
		<view class="head-wrapper" @click="chooseImgHandler">
			<image :src="headImg" mode="scaleToFill"></image>
			<view class="name">
				点击修改头像
			</view>
		</view>

		<view class="form-wrapper">
			<form>
				<view class="item-wrapper">
					<view class="title">账号</view>
					<view class="content-wrapper">{{userInfo.userCode}}</view>
				</view>
				<view class="item-wrapper">
					<view class="title">姓名</view>
					<input v-model="formObj.userName" name="userName" class="content-wrapper" type="text" placeholder="请输入姓名">
				</view>
				<view class="item-wrapper">
					<view class="title">昵称</view>
					<input v-model="formObj.nickname" name="nickname" class="content-wrapper" type="text" placeholder="请输入昵称">
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		previewFile,
		uploadFile,
	} from "../../api/common.js"
	import {
		editUser,
	} from "../../api/user.js"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				loading: false,
				formObj: {
					id: '',
					userName: '',
					nickname: '',
					headImg: '',
					userCode: '',
				},
				rules: {
					userName: {
						rules: [{
							required: true,
							message: '请输入姓名',
						}]
					}
				}
			}
		},
		components: {
			uniNavBar
		},
		created() {
			this.formObj.id = this.userInfo.id;
			this.formObj.headImg = this.userInfo.headImg;
			this.formObj.userCode = this.userInfo.userCode;
			this.formObj.userName = this.userInfo.userName;
			this.formObj.nickname = this.userInfo.nickname;
		},
		computed: {
			headImg() {
				if (this.formObj.headImg) {
					return previewFile(this.formObj.headImg);
				} else {
					return "data:image/png;base64,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"
				}
			},
			userInfo() {
				return this.$store.state.userInfo.cakeUser;
			},
		},
		methods: {
			// 返回
			backHandler() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 保存
			saveHandler() {
				if (this.formObj.userName && this.formObj.nickname) {
					editUser(this.formObj).then(res => {
						if (res) {
							uni.showToast({
								title: '更新成功',
							});
							this.$store.dispatch("getUserInfo");
						}
					}).catch(err => {

					});
				} else {
					uni.showToast({
						icon: "none",
						title: '输入内容不可为空！',
					})
				}
			},
			// 修改头像
			chooseImgHandler() {
				// 选择头像
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						// 上传图片
						uploadFile(res.tempFilePaths[0]).then(res => {
							this.$set(this.formObj, "headImg", res);
							uni.showToast({
								title: "修改成功，需求点击“保存”生效",
							})
						}).catch(err => {
							console.log(err);
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	
	.content {
		background-color: #f0f0f0;
	}

	.head-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 80rpx 40rpx;
		margin-bottom: 20rpx;
		background-color: #fff;

		.name {
			color: #909090;
			margin-top: 10rpx;
			font-size: 24rpx;
		}

		image {
			height: 160rpx;
			width: 160rpx;
			border-radius: 50%;
		}
	}

	.form-wrapper {
		background-color: #fff;
		padding: 20rpx;

		.item-wrapper {
			display: flex;
			flex-direction: row;
			justify-content: center;
			border-bottom: 2rpx solid #efefef;
			height: 90rpx;
			line-height: 90rpx;

			.title {
				width: 120rpx;
				padding-left: 10rpx;
			}

			.content-wrapper {
				flex: 1;
				height: 100%;
			}
		}
	}
</style>
