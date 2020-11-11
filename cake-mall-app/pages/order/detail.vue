<template>
	<view class="content">
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

		<view class="step-wrapper">
			<uni-steps :options="orderStautsObj.list" direction="column" :active="orderStautsObj.active"></uni-steps>
		</view>
	</view>
</template>

<script>
	import {
		previewFile,
	} from '../../api/common.js'
	import {
		getOrderDetailById
	} from '../../api/cake.js';

	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		data() {
			return {
				// 订单主键
				id: '',
				// 蛋糕产品
				cakeObj: {},
				// 详情的所有信息
				infoObj: {},
			}
		},
		components: {
			uniSteps
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
						active: 1,
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
						active: 2,
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
						active: 2,
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
						active: 3,
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
						active: 3,
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
						active: 4,
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
						active: 5,
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
		height: 100%;
		padding-top: 30rpx;
		padding-bottom: 90rpx;
		background-color: #f0f0f0;
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
		margin-top: 20rpx;
		padding: 20rpx 0;
		background-color: #fff;
	}
</style>
