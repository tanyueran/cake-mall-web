<template>
	<view class="content">
		<view class="text-center img-wrapper white-bg">
			<image :src="previewImg(infoObj.cakeImgs)" mode="aspectFill"></image>
		</view>
		<view class="text-center info-wrapper white-bg">
			<view class="name">
				{{infoObj.name}}
				<view class="recommend">推荐</view>
			</view>
			<view class="detail">
				{{infoObj.detail}}
			</view>
			<view class="price">
				￥{{infoObj.price}}
			</view>
		</view>
		<view class="btn-wrapper">
			<uni-number-box :min="1" :max="9"></uni-number-box>
			<button>下单</button>
		</view>
	</view>
</template>

<script>
	/**
	 * 订单状态(
            0、已下单，未付款；
            5、未付款，订单取消；
            10、已付款，待发货；
            15、已拒单，订单取消；
            20、已接单，待配货；
            30、已配送，待收货；
            40、已收货，完成订单)下单后30分未付款，则取消订单；付款后30分钟未接单，则订单取消
	 */
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
	import {
		getCakeInfoById,
	} from '../../api/cake.js';
	import {
		previewFile,
	} from "../../api/common.js"
	export default {
		data() {
			return {
				id: '',
				infoObj: {},
				orderId: '',
			}
		},
		components: {
			uniNumberBox,
		},
		onLoad(option) {
			this.id = option.id;
			this.getDetail();
		},
		methods: {
			// 获取蛋糕详情
			getDetail() {
				getCakeInfoById(this.id).then(res => {
					this.infoObj = res;
				}).catch(err => {
					console.log(err);
				})
			},
			// 预览图片
			previewImg(fileId) {
				return previewFile(fileId);
			}
		},
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

	.btn-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		bottom: var(--window-bottom);
		z-index: 100;
		display: flex;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 50rpx;
		border-top: 2rpx solid #eee;
		background-color: #fff;

		button {
			background-color: #FD994B;
			color: #fff;
			border-radius: 0;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0;
			width: 50%;

		}
	}
</style>
