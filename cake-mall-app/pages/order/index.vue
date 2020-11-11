<template>
	<view class="content">
		<view class="item-wrapper" :key="item.id" v-for="(item,i) in dataList">
			<view class="img-wrapper">
				<image :src="getImg(item.cakeProduct.cakeImgs)" mode="scaleToFill"></image>
			</view>
			<view class="info-wrapper">
				<view class="id-wrapper text-info">
					编号：{{item.id}}
				</view>
				<view class="name-wrapper">
					{{item.cakeProduct.name}}
				</view>
				<view class="status-wrapper">
					<!--
					 订单状态(
					 0、已下单，未付款；
					 5、未付款，订单取消；
					 10、已付款，待发货；
					 15、已拒单，订单取消；
					 20、已接单，待配货；
					 30、已配送，待收货；
					 40、已收货，完成订单)下单后30分未付款，则取消订单；付款后30分钟未接单，则订单取消
					 -->
					<template v-if="item.status === 0">
						<view class="text-warning">
							已下单，未付款
						</view>
					</template>
					<template v-else-if="item.status === 5">
						<view class="text-danger">
							未付款,订单取消
						</view>
					</template>
					<template v-else-if="item.state === 10">
						<view class="text-ice">
							已付款，待发货
						</view>
					</template>
					<template v-else-if="item.state === 15">
						<view class="text-danger">
							已拒单，订单取消
						</view>
					</template>
					<template v-else-if="item.state === 20">
						<view class="text-ice">
							已接单，待配货
						</view>
					</template>
					<template v-else-if="item.state === 30">
						<view class="text-ice">
							已配送，待收货
						</view>
					</template>
					<template v-else-if="item.state === 40">
						<view class="text-success">
							已收货，完成订单
						</view>
					</template>
					<template v-else>
						数据有问题!
					</template>
				</view>
				<view class="btn-wrapper">
					<view class="price-wrapper">
						{{item.totalPrice}}元
					</view>
					<view class="text-ice" @click="goToDetailHandler(item.id)">
						详情>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more style="width: 100%;" :status="more"></uni-load-more>
	</view>
</template>

<script>
	import {
		getOrderByPage,
	} from '../../api/cake.js';
	import {
		previewFile,
	} from '../../api/common.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				pageObj: {
					current: 1,
					size: 10,
					total: 0,
				},
				timer: null,
				more: 'more', //more（loading前）、loading（loading中）、noMore（没有更多了）
				dataList: [],
			}
		},
		components: {
			uniLoadMore,
		},
		onLoad() {
			this.pageQuery();
		},
		onPullDownRefresh() {
			this.pageObj.current = 1;
			this.pageQuery();
		},
		onReachBottom() {
			if (this.more === "noMore") {
				return;
			}
			this.pageObj.current++;
			this.pageQuery();
		},
		methods: {
			// 预览图片
			getImg(url) {
				return previewFile(url);
			},
			// 跳转订单详情页面
			goToDetailHandler(orderId) {
				console.log(orderId)
				uni.navigateTo({
					url: `/pages/order/detail?id=${orderId}`
				});
			},
			// 分页查询
			pageQuery() {
				this.more = "loading";
				getOrderByPage({
					page: this.pageObj.current,
					size: this.pageObj.size,
					createUserId: this.$store.state.userInfo.cakeUser.id,
				}).then(res => {
					this.pageObj.total = res.total;
					let records = res.records;
					records.map(item => {
						item.timerStr = "-";
						return item;
					});
					if (this.pageObj.current === 1) {
						this.dataList = records;
					} else {
						this.dataList.push(...records);
					}
					if (this.pageObj.total === this.dataList.length) {
						this.more = "noMore";
					} else {
						this.more = "more";
					}
					uni.stopPullDownRefresh();
				}).catch(err => {
					console.log(err);
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: var(--window-bottom);
		background-color: #F0F0F0;
		padding-top: 20rpx;
	}

	.item-wrapper {
		display: flex;
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		height: 250rpx;

		>view {
			height: 100%;
			display: flex;
		}

		.img-wrapper {
			width: 30%;
		}

		.info-wrapper {
			display: flex;
			flex-direction: column;
			padding-left: 20rpx;
			flex: 1;
		}

		image {
			height: 80%;
		}

		.id-wrapper {
			font-size: 24rpx;
		}

		.status-wrapper {
			font-size: 24rpx;
			margin-bottom: 10rpx;
		}

		.name-wrapper {
			margin-bottom: 20rpx;
		}

		.btn-wrapper {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.price-wrapper {
				color: orange;
			}

			button {
				font-size: 28rpx;
				padding: 0 20rpx;
				display: inline-block;
				margin: 0;
				font-size: 24rpx;
			}
		}
	}
</style>
