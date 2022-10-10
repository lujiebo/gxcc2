<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="u-p-lr-40">
			<uni-search-bar v-model="keyWord" radius="100" placeholder="请输入搜索关键词" bgColor="#F2F3F4" @confirm="search"
				:focus="true" @cancel="cancel" />
		</view>
		<view class="panel">
			<view v-if="courseList && courseList.length>0">
				<view class="card card2" v-for="(item,index) in courseList" @click="choosen(item)">
					<image 
					  style="width: 120upx;height: 104upx;" 
					  src="../../static/v2_index2.jpeg" 
					  mode="aspectFill"
					  lazy-load
					>
					</image>
					<view class="content" style="justify-content: flex-start;">
						<view class="title text-ellipsis-2" style="flex-shrink: 0;">{{item.text}}</view>
						<view>
							<view class="flex space-between u-m-t-8">
								<view class="icon-map-pin-line text-ellipsis-2">
									{{item.text}}
								</view>
								<view>{{item.text}}</view>
							</view>

						</view>
					</view>
				</view>
			</view>
			<u-loadmore v-if="courseList && courseList.length>0" :status="status" margin-top="20" />
			<u-empty text="暂无数据" mode="data" v-if="(courseList.length==0) || (!courseList)" margin-top="100"></u-empty>
		</view>


	</view>
</template>

<script>
	import mixin_list from '@/utils/list.js'
	export default {
		mixins: [mixin_list],
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				list_url: 'order/search',
				// status: 'nomore',
				search_params: {},
				keyWord: '',
				courseList:[],
				loc:{
					lon:'',
					lat:'',
				}
			}
		},
		onLoad() {
			// this.getData()
			this.getCourseware()
		},
		methods: {
			getCourseware() {
				this.http.get(
					'/api/courseware', {
						key: this.keyWord
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.courseList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			search() {
				this.courseList = []
				if (this.keyWord) {
					this.getCourseware()
				}
			},
			choosen(item) {
				uni.$emit('chooseCourseware',item)
				uni.navigateBack({
					delta:1
				})
			},
			toYuyue(id) {
				uni.navigateTo({
					url: './yuyueDetail?id=' + id
				})
			},
			async getData() {
				
				this.loc = await this.location.getLocation()
				
				this.search_params = {
					search: this.keyWord,
					longitude: this.loc.lon,
					latitude: this.loc.lat,
				}
				await this.getlist(true)
			},
			cancel() {
				this.keyWord = ''
				// this.getData()
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

	/deep/ .uni-searchbar {
		padding: 0;
		margin: 32upx 0;
	}

	/deep/.uni-searchbar__box {
		height: 72upx;
		padding: 10upx 16upx 10upx 0;
	}

	/deep/.uni-searchbar__cancel {
		padding-left: 20upx;
		line-height: 72upx;
		font-size: 28upx;
		color: #428FFC;
	}

	/deep/.uni-searchbar__box-icon-search {
		padding: 0 16upx;

	}

	/deep/.uni-searchbar__box-icon-search uni-text {
		font-size: 36upx !important;
	}

	/deep/.uni-searchbar__text-placeholder {
		font-size: 28upx;
		margin-left: 10upx;
	}

	/deep/.uni-searchbar__box-search-input {
		font-size: 28upx;
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
	
	
	
	.elder /deep/.uni-searchbar__cancel {
		font-size: 40rpx;
	}
	
	
	.elder /deep/.uni-searchbar__box-icon-search uni-text {
		font-size: 48upx !important;
	}
	
	
	.elder /deep/.uni-searchbar__text-placeholder {
		font-size: 40upx;
	}
	
	
	.elder /deep/.uni-searchbar__box-search-input {
		font-size: 40upx;
	}


	.searchArea .card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40upx;
	}

	.searchArea .card .label {
		position: absolute;
		width: 110upx;
		height: 48upx;
		border-radius: 20upx 0px 20upx 0px;
		background-color: #00000060;
		top: 0;
		left: 0;
		color: white;
		padding: 10upx;
		font-size: 24upx;
	}

	.searchArea .card image {
		width: 320upx;
		height: 190upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
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
