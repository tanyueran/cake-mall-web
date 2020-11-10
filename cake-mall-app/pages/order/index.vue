<template>
	<view class="content">
		<view class="item-wrapper" :key="item.id" v-for="(item,i) in dataList">
			<view class="img-wrapper">
				<image :src="getImg(item.cakeProduct.cakeImgs)" mode="scaleToFill"></image>
			</view>
			<view class="info-wrapper">
				<view class="id-wrapper">
					编号：{{item.id}}
				</view>
				<view>
					{{item.cakeProduct.name}}
				</view>
				<view class="btn-wrapper">
					<view class="price-wrapper">
						{{item.totalPrice}}元
					</view>
					<button type="default">操作</button>
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
			// 分页查询
			pageQuery() {
				this.more = "loading";
				getOrderByPage({
					page: this.pageObj.current,
					size: this.pageObj.size,
					createUserId: this.$store.state.userInfo.cakeUser.id,
				}).then(res => {
					this.pageObj.total = res.total;
					if (this.pageObj.current === 1) {
						this.dataList = res.records;
					} else {
						this.dataList.push(...res.records);
					}
					if (this.pageObj.total === this.dataList.length) {
						this.more = "noMore";
					} else {
						this.more = "more";
					}
					uni.stopPullDownRefresh();
				}).catch(err => {

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
		height: 200rpx;

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
			color: #909090;
			font-size: 24rpx;
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
