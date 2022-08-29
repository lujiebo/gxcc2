<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view  class="u-p-lr-40">
			<uni-search-bar v-model="keyWord" radius="100" placeholder="请输入搜索关键词" bgColor="#F2F3F4" @confirm="search"
				:focus="true" @cancel="cancel" />
			<view v-if="!active" class="searchArea">
			
				<view class="title-area">
					<view class="title">大家都在搜</view>
					<view class="action icon-restart-line" @click="refresh()" ></view>
				</view>
				<view style="display: flex;flex-wrap: wrap;">
					<view class="tag u-p-15" style="background-color: #F6F7F8;color: #101010;margin:0 26upx 22upx 0;"
						v-for="(item,index) in hot" @click="hotTap(index)">
						<view class="text-ellipsis-1">{{item.text}}</view>
					</view>
				</view>
			
				<view class="title-area">
					<view class="title">历史搜索记录</view>
					<view class="action icon-delete-bin-line" @click="jiluDelete()"></view>
				</view>
			
				<view style="display: flex;flex-wrap: wrap;">
					<view class="tag u-p-15" style="background-color: #F6F7F8;color: #101010;margin:0 26upx 22upx 0;"
						v-for="(item,index) in jilu" @click="jiluTap(index)">
						<view class="text-ellipsis-1">{{item.text}}</view>
					</view>
				</view>
			
				<recommend></recommend>
			</view>
		</view>
		
		<view v-if="active" class="panel">
			<view v-if="list.list && list.list.length>0">
				<view class="card card2" v-for="(item,index) in list.list"  @click="toYuyue(item.id)">
					<image style="width: 220upx;height: 184upx;" :src="item.cover[0].url" mode="aspectFill" lazy-load>
					</image>
					<view class="content" style="justify-content: flex-start;">
						<view class="title text-ellipsis-2" style="flex-shrink: 0;">{{item.schoolname}}</view>
						<view>
							<view class="flex space-between">
								<view class="icon-map-pin-line text-ellipsis-1">
									{{item.address}}
								</view>
								<view>{{item.distance}}</view>
							</view>
							<view style="display: flex; margin-top: 10upx;flex-wrap: wrap;">
								<view class="tag" v-for="(i,inx) in item.label">{{i}}</view>
							</view>
							<button v-if="!item.is_full" class="btn-s">可预约</button>
							<button v-else class="btn-orange btn-s btn-disabled">已约满</button>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore v-if="list.list && list.list.length>0" :status="status" margin-top="20" />
			<u-empty text="暂无数据" mode="data" v-if="(list.list.length==0) || (!list.list)" margin-top="100"></u-empty>
		</view>


	</view>
</template>

<script>
	import mixin_list from '@/utils/list.js'
	import recommend from '../../component/recommend.vue'
	export default {
		mixins: [mixin_list],
		components: {
			recommend
		},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list_url: 'order/search',
				// status: 'nomore',
				search_params: {},
				keyWord: '',
				active: false,
				jilu: [],
				hot:[{text:'慈溪市第四实验小学'}],
			}
		},
		onLoad() {
			var data = uni.getStorageSync('search-jilu')
			if (data) {
				this.jilu = data
			}
		},
		methods: {
			refresh() {
				
			},
			search() {
				if (this.keyWord) {
					this.getData()
				}
			},
			toYuyue(id) {
				uni.navigateTo({
					url: './yuyueDetail?id=' + id
				})
			},
			async getData() {
				this.search_params = {
					search: this.keyWord
				}
				await this.getlist(true)
				this.active = true
				if (this.jilu.length < 5) {
					var have = false
					this.jilu.forEach((v) => {
						if (v.text == this.keyWord) {
							have = true
						}
					})
					if (have == false) {
						this.jilu.push({
							text: this.keyWord
						})
						uni.setStorageSync('search-jilu', this.jilu)
					}

				} else {
					var have = false
					this.jilu.forEach((v) => {
						if (v.text == this.keyWord) {
							have = true
						}
					})
					if (have == false) {
						this.jilu.shift()
						this.jilu.push({
							text: this.keyWord
						})
						uni.setStorageSync('search-jilu', this.jilu)
					}
				}
			},
			jiluDelete() {
				this.jilu = []
				uni.setStorageSync('search-jilu', this.jilu)
			},
			jiluTap(index) {
				this.keyWord = this.jilu[index].text
				this.search()
			},
			hotTap(index) {
				this.keyWord = this.hot[index].text
				this.search()
			},
			cancel() {
				this.active = false
			}
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	.title-area .title {
		font-size: 28upx;
	}

	.elder .title-area .title {
		font-size: 40upx;
	}

	.tag {
		max-width: 100%;
	}

	.elder .tag {
		font-size: 32upx;
	}

	/deep/ .uni-searchbar {
		padding: 0;
		margin: 32upx 0;
	}

	/deep/.uni-searchbar__box {
		height: 72upx;
		padding: 10upx 16upx 10upx 0;
	}

	.elder /deep/.uni-searchbar__cancel {
		font-size: 40rpx;
	}
	
	/deep/.uni-searchbar__box-icon-search {
		padding: 0 16upx;
	
	}
	
	/deep/.uni-searchbar__box-icon-search uni-text {
		font-size: 36upx !important;
	}
	
	.elder /deep/.uni-searchbar__box-icon-search uni-text {
		font-size: 48upx !important;
	}
	
	/deep/.uni-searchbar__text-placeholder {
		font-size: 28upx;
		margin-left: 10upx;
	}
	
	.elder /deep/.uni-searchbar__text-placeholder {
		font-size: 40upx;
	}
	
	/deep/.uni-searchbar__box-search-input {
		font-size: 28upx;
	}
	
	.elder /deep/.uni-searchbar__box-search-input {
		font-size: 40upx;
	}

	/deep/.segmented-control {
		height: 72rpx !important;
	}

	/deep/.segmented-control__text {
		font-size: 28rpx;
		line-height: 40rpx;
	}

	/deep/ .segmented-control__item--button--first {
		border-left-width: 2rpx;
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
	}





	.panel .card2 {
		height: auto;
		border-bottom: 2upx solid rgb(232, 233, 236);
		padding: 20upx 40upx;
		margin: 0;
	}

	.panel .card2:last-child {
		border-bottom: 0;
	}

	.panel .tag {
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
</style>
