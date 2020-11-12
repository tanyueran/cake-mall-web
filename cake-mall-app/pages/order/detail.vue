<template>
	<view class="content">
		<view class="title">
			商品详情
		</view>
		<view class="product-wrapper">
			<view class="text-center img-wrapper white-bg">
				<image :src="getImg(cakeObj.cakeImgs)" mode="aspectFill"></image>
			</view>
			<view class="text-center info-wrapper white-bg">
				<view class="name">
					{{cakeObj.name}}
					<view class="recommend">推荐</view>
				</view>
				<view class="detail">
					{{cakeObj.detail}}
				</view>
				<view class="price">
					￥{{cakeObj.price}}
				</view>
			</view>
		</view>

		<view class="title">
			订单详情
		</view>
		<view class="detail-wrapper">
			<!-- 多行内容显示 -->
			<uni-list>
				<uni-list-item title="订单总金额" :rightText="infoObj.totalPrice + '元'"></uni-list-item>
				<uni-list-item title="购买商品个数" :rightText="infoObj.number + '个'"></uni-list-item>
			</uni-list>
		</view>

		<view class="title">
			订单状态
		</view>
		<view class="step-wrapper">
			<uni-steps :options="orderStautsObj.list" direction="column" :active="orderStautsObj.active"></uni-steps>
		</view>

		<view class="btn-wrapper" v-if="infoObj.status === 0">
			<button @click="payHandler" type="default">付款</button>
		</view>

		<!-- 密码输入框 -->
		<prompt :visible.sync="promptVisible" placeholder="输入密码" :defaultValue="userPwd" @confirm="clickPromptConfirm"
		 mainColor="#e74a39">
		</prompt>
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import {
		previewFile,
	} from '../../api/common.js'

	import {
		getOrderDetailById,
		orderPay,
	} from '../../api/cake.js';

	import Prompt from '@/components/zz-prompt/index.vue'
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		data() {
			return {
				// 控制弹框输入框显示
				promptVisible: false,
				userPwd: '',
				// 订单主键
				id: '',
				// 蛋糕产品
				cakeObj: {},
				// 详情的所有信息
				infoObj: {},
			}
		},
		components: {
			uniSteps,
			Prompt,
		},
		onPullDownRefresh() {
			this.getDetailInfo();
		},
		computed: {
			/* 
			订单状态(
			0、已下单，未付款；
			5、未付款，订单取消；
			10、已付款，待发货；
			15、已拒单，订单取消；
			20、已接单，待配货；
			30、已配送，待收货；
			40、已收货，完成订单)下单后30分未付款，则取消订单；付款后30分钟未接单，则订单取消 
			 */
			orderStautsObj() {
				if (this.infoObj.status === 0) {
					return {
						list: [{
								title: '已下单，未付款',
								desc: this.infoObj.createTime,
							},
							{
								title: '已付款，待发货',
								desc: '-',
							},
							{
								title: '已接单，待配货',
								desc: '-',
							},
							{
								title: '已配送，待收货',
								desc: '-',
							},
							{
								title: '已收货，完成订单',
								desc: '-',
							}
						],
						active: 0,
					}
				} else if (this.infoObj.status === 5) {
					return {
						list: [{
								title: '已下单，未付款',
								desc: this.infoObj.createTime,
							},
							{
								title: '未付款，订单取消',
								desc: this.infoObj.status5Time,
							},
						],
						active: 1,
					}
				} else if (this.infoObj.status === 10) {
					return {
						list: [{
								title: '已下单，未付款',
								desc: this.infoObj.createTime,
							},
							{
								title: '已付款，待发货',
								desc: this.infoObj.status10Time,
							},
							{
								title: '已接单，待配货',
								desc: '-',
							},
							{
								title: '已配送，待收货',
								desc: '-',
							},
							{
								title: '已收货，完成订单',
								desc: '-',
							}
						],
						active: 1,
					}
				} else if (this.infoObj.status === 15) {
					return {
						list: [{
								title: '已下单，未付款',
								desc: this.infoObj.createTime,
							},
							{
								title: '已付款，待发货',
								desc: this.infoObj.status10Time,
							},
							{
								title: '已拒单，订单取消',
								desc: this.infoObj.status15Time,
							}
						],
						active: 2,
					}
				} else if (this.infoObj.status === 20) {
					return {
						list: [{
								title: '已下单，未付款',
								desc: this.infoObj.createTime,
							},
							{
								title: '已付款，待发货',
								desc: this.infoObj.status10Time,
							},
							{
								title: '已接单，待配货',
								desc: this.infoObj.status20Time,
							},
							{
								title: '已配送，待收货',
								desc: '-',
							},
							{
								title: '已收货，完成订单',
								desc: '-',
							}
						],
						active: 2,
					}
				} else if (this.infoObj.status === 30) {
					return {
						list: [{
								title: '已下单，未付款',
								desc: this.infoObj.createTime,
							},
							{
								title: '已付款，待发货',
								desc: this.infoObj.status10Time,
							},
							{
								title: '已接单，待配货',
								desc: this.infoObj.status20Time,
							},
							{
								title: '已配送，待收货',
								desc: this.infoObj.status30Time,
							},
							{
								title: '已收货，完成订单',
								desc: '-',
							}
						],
						active: 3,
					}
				} else if (this.infoObj.status === 40) {
					return {
						list: [{
								title: '已下单，未付款',
								desc: this.infoObj.createTime,
							},
							{
								title: '已付款，待发货',
								desc: this.infoObj.status10Time,
							},
							{
								title: '已接单，待配货',
								desc: this.infoObj.status20Time,
							},
							{
								title: '已配送，待收货',
								desc: this.infoObj.status30Time,
							},
							{
								title: '已收货，完成订单',
								desc: this.infoObj.status40Time,
							}
						],
						active: 4,
					}
				} else {
					return {
						list: [{
							title: '数据有误',
							desc: '-',
						}, ],
						active: 1,
					}
				}
			},
		},
		onLoad(options) {
			this.id = options.id;
		},
		created() {
			this.getDetailInfo();
		},
		methods: {
			payHandler() {
				this.promptVisible = true;
			},
			/**
			 * 点击弹出输入框确定
			 */
			clickPromptConfirm(val) {
				if (val) {
					orderPay({
						orderId: this.id,
						payDto: {
							cakeUserId: this.$store.state.userInfo.cakeUser.id,
							userPwd: md5(val),
						}
					}).then(res => {
						if (res) {
							uni.showToast({
								title: '付款成功',
							});
							this.getDetailInfo();
						} else {
							uni.showToast({
								title: '付款失败',
								icon: 'none'
							})
						}
					}).catch(err => {
						console.log(err);
					}).finally(() => {
						this.promptVisible = false;
					})
				}
			},
			// 预览图片
			getImg(url) {
				return previewFile(url);
			},
			// 请求订单详情
			getDetailInfo() {
				getOrderDetailById(this.id).then(res => {
					this.infoObj = res;
					this.cakeObj = res.cakeProduct;
				}).catch(err => {
					console.log(err);
				}).finally(() => {
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 10rpx;
		padding-bottom: 90rpx;
		background-color: #f0f0f0;
	}

	.product-wrapper {
		margin-bottom: 10rpx;
	}

	.detail-wrapper {
		margin-bottom: 10rpx;
	}

	.img-wrapper {
		padding: 30rpx;
	}

	.white-bg {
		background-color: #fff;
	}

	.info-wrapper {
		padding: 20rpx 0;

		view {
			margin-bottom: 18rpx;
		}

		.name {
			font-size: 40rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.recommend {
				margin-left: 20rpx;
				background-color: #FD994B;
				color: #fff;
				font-size: 20rpx;
				padding: 0 10rpx;
			}
		}

		.detail {
			color: #909090;
		}

		.price {
			color: #FD994B;
		}
	}

	// 步骤条
	.step-wrapper {
		padding: 20rpx 0;
		background-color: #fff;
	}

	// 按钮
	.btn-wrapper {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: #fff;
		z-index: 1000;
		height: 80rpx;

		button {
			height: 100%;
			color: #fff;
			background-color: #F0AD4E;
			border-radius: 0;
		}
	}
</style>
