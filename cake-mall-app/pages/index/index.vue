<template>
	<view class="content">
		<view class="search-wrapper">
			<uni-search-bar style="width: 100%;" :radius="100" @cancel="searchHandler('')" @confirm="searchHandler"></uni-search-bar>
		</view>
		<view class="scroll-wrapper">
			<view class="item-wrapper" v-for="(item,index) in dataList" :key="item.id">
				<image :src="getUrl(item.cakeImgs)" mode="aspectFill"></image>
				<view class="info-wrapper">
					<view class="name">
						{{item.name}}
					</view>
					<view class="price">
						￥{{item.price}}元
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
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
				dataList: [],
				more: 'more',
			}
		},
		components: {
			uniSearchBar,
		},
		onLoad() {
			this.pageQuery();
		},
		onPullDownRefresh() {
			console.log("执行了下拉")
			this.pageObj.current = 1;
			this.pageQuery();
		},
		onReachBottom(){
			console.log("执行了上拉")
			this.pageObj.current ++;
			this.pageQuery();
		},
		methods: {
			// 搜索
			searchHandler(keywords) {
				console.log(keywords);
			},
			// 分页查询
			pageQuery() {
				getCake({
					page: this.pageObj.current,
					size: this.pageObj.size,
					keywords: this.pageObj.keywords,
				}).then(res => {
					this.pageObj.total = res.tota;
					this.dataList = res.records;
				}).catch(err => {

				});
			},
			// 获取url
			getUrl(fileId) {
				return previewFile(fileId);
			},
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		height: 100%;
		flex-direction: column;

		.search-wrapper {
			height: 100rpx;
			width: 100%;
			display: flex;
			background-color: #fff;
			position: relative;
			z-index: 1000;
			align-items: center;
			box-shadow: 0 2rpx 2rpx #909090;
		}

		.scroll-wrapper {
			flex: 1;
			overflow: auto;
		}

		.item-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			border: 1rpx solid #909090;
			padding: 20rpx;
			margin: 10rpx;
			margin-bottom: 10rpx;

			.info-wrapper {
				display: flex;
				align-items: center;
				justify-content: center;

				.price {
					color: orange;
				}
			}
		}
	}
</style>
