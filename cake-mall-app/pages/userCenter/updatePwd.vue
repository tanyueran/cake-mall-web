<template>
	<view class="content">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<uni-nav-bar left-icon="back" left-text="" @clickRight="saveHandler" @clickLeft="backHandler" right-text="保存" title="密码修改"></uni-nav-bar>

		<view class="form-wrapper">
			<form>
				<view class="item-wrapper">
					<view class="title">旧密码</view>
					<input v-model="formObj.oldUserPwd" name="oldUserPwd" class="content-wrapper" type="text" placeholder="请输入旧密码">
				</view>
				<view class="item-wrapper">
					<view class="title">新密码</view>
					<input v-model="formObj.newUserPwd" name="newUserPwd" class="content-wrapper" type="text" placeholder="请输入新密码">
				</view>
				<view class="item-wrapper">
					<view class="title">确认密码</view>
					<input v-model="formObj.newUserPwd2" name="newUserPwd2" class="content-wrapper" type="text" placeholder="再次确认密码">
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		updatePwd,
	} from "../../api/user.js"
	import md5 from 'js-md5';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				loading: false,
				formObj: {
					id: '',
					oldUserPwd: '',
					newUserPwd: '',
					newUserPwd2: '',
				},
			}
		},
		components: {
			uniNavBar
		},
		created() {
			this.formObj.id = this.userInfo.id;
		},
		computed: {
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
				if (this.formObj.oldUserPwd && this.formObj.newUserPwd && this.formObj.newUserPwd2) {
					updatePwd({
						id: this.formObj.id,
						oldUserPwd: md5(this.formObj.oldUserPwd),
						newUserPwd: md5(this.formObj.newUserPwd),
						newUserPwd2: md5(this.formObj.newUserPwd2),
					}).then(res => {
						if (res) {
							uni.showToast({
								title: '更新成功',
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '更新失败',
							});
						}
						this.formObj.oldUserPwd = "";
						this.formObj.newUserPwd = "";
						this.formObj.newUserPwd2 = "";
					}).catch(err => {

					});
				} else {
					uni.showToast({
						icon: "none",
						title: '输入内容不可为空！',
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

	.content {
		background-color: #f0f0f0;
		height: 100%;
	}

	.form-wrapper {
		background-color: #fff;
		padding: 20rpx;
		margin-top: 30rpx;

		.item-wrapper {
			display: flex;
			flex-direction: row;
			justify-content: center;
			border-bottom: 2rpx solid #efefef;
			height: 90rpx;
			line-height: 90rpx;

			.title {
				width: 180rpx;
				padding-left: 10rpx;
			}

			.content-wrapper {
				flex: 1;
				height: 100%;
			}
		}
	}
</style>
