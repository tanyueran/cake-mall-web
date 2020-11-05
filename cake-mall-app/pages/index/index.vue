<template>
	<view class="content">
		<view class="search-wrapper">
			<uni-search-bar style="width: 100%;" :radius="100" @cancel="searchHandler('')" @confirm="searchHandler"></uni-search-bar>
		</view>
		<view class="scroll-wrapper">
			<view class="item-wrapper" v-for="(item,index) in dataList" :key="item.id" @click="gotoDetailHandler(item.id)">
				<image :lazy-load="true" :src="getUrl(item.cakeImgs)" mode="aspectFit"></image>
				<view class="info-wrapper">
					<view class="name">
						<view v-if="item.recommendStatus === 1" class="iconfont icon-hotfill"></view>
						{{item.name}}
					</view>
					<view class="price">
						￥{{item.price}}元
					</view>
				</view>
			</view>
			<uni-load-more style="width: 100%;" :status="more"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		getCake,
	} from "../../api/cake.js"
	import {
		previewFile,
	} from '../../api/common.js'
	export default {
		data() {
			return {
				pageObj: {
					keywords: '',
					current: 1,
					size: 10,
					total: 0,
				},
				more: 'more', //more（loading前）、loading（loading中）、noMore（没有更多了）
				dataList: [],
			}
		},
		components: {
			uniSearchBar,
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
			// 搜索
			searchHandler(keywords) {
				this.pageObj.keywords = keywords.value;
				this.pageObj.current = 1;
				this.pageQuery();
			},
			// 分页查询
			pageQuery() {
				this.more = "loading";
				getCake({
					page: this.pageObj.current,
					size: this.pageObj.size,
					keywords: this.pageObj.keywords,
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
			// 获取url
			getUrl(fileId) {
				return previewFile(fileId);
			},
			// 查看详情
			gotoDetailHandler(id) {
				uni.navigateTo({
					url: `/pages/detail/index?id=${id}`,
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		padding-bottom: var(--window-bottom);
		padding-top: 100rpx;
		position: relative;

		.search-wrapper {
			position: fixed;
			top: var(--window-top);
			left: 0;
			right: 0;
			z-index: 100;
			height: 100rpx;
			display: flex;
			background-color: #fff;
			z-index: 10;
			align-items: center;
			box-shadow: 0 2rpx 2rpx #909090;
		}

		.scroll-wrapper {
			flex: 1;
			overflow: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			background-color: #f0f0f0;
			padding-top: 20rpx;
		}

		.item-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 45vw;
			margin: 2.5vw;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 10rpx 10rpx 20rpx;
			height: 30vh;

			image {
				width: 90%;
			}

			.info-wrapper {
				display: flex;
				align-items: center;
				justify-content: center;

				.name {
					.iconfont {
						display: inline-block;
						color: red;
					}
				}

				.price {
					color: orange;
				}
			}
		}
	}
</style>
