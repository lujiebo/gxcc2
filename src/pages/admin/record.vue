<template>
	<view>
		<view class="top">
			<view class="u-font-36" v-if="type == 2">
				<u-picker :default-time="date" v-model="show" mode="time"
					@confirm="DateChange" :safe-area-inset-bottom="true"></u-picker>
				<view class="picker u-flex" @click="show = true">
					<view :class="date?'':'placeholder'">
						{{date?date:'请选择时间'}}
					</view>
					<view class="icon-arrow-right-s-line"></view>
				</view>
			</view>
			<view class="topNum u-m-t-20">
				<view class="item">
					<view class="text1">{{list.res.yuyuerenshu|getBouble()}}</view>
					<view>预约人数</view>
				</view>
				<view class="item">
					<view class="text1">{{list.res.jinchangrenshu|getBouble()}}</view>
					<view>已进场人数</view>
				</view>
				<view class="item">
					<view class="text1">{{list.res.chuchangrenshu|getBouble()}}</view>
					<view>已退场人数</view>
				</view>
			</view>
			
			<div class="wave"></div>
		</view>
		<view class="u-p-lr-40 u-m-t-40">
			<u-subsection :list="items" :current="current" mode="subsection" active-color="#428FFC"
				@change="onClickItem">
			</u-subsection>
			<view v-if="list.lists">
				<view v-for="(item,index) in list.lists" class="listItem u-m-t-40">
					<view class="u-flex">
						<view style="width: 50rpx;">{{index+1}}</view>
						<view>{{item.name}}</view>
					</view>
					<view>{{current==0?item.intime:item.outtime}}</view>
				</view>
			</view>
			<u-loadmore v-if="list.lists && list.lists.length>0" :status="status" margin-top="20" />
			<u-empty text="暂无数据" mode="data" v-if="(!list.lists) || (list.lists.length==0)" margin-top="100"></u-empty>
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
				current: 0,
				items: ['入场名单', '出场名单'],
				
				topList: {
					total: 40,
					ready: 33,
					left: 6,
				},
				list_url: 'hexiao/getlist',
				// status: 'nomore',
				search_params: {
					dateline:'',
					type:0//0入 1出
				},
				date:'',
				show:false,
				type:1//1今天 2历史
			}
		},
		filters: {
			getBouble(val) {
				if (val != 'undefined' && val) {
					var b = val.toString();
					return b.length > 1 ? b : b.padStart(2, '0');
				} else {
					return '00';
				}
			}
		},
		onLoad(option) {
			
			var t1 = new Date();
			t1.setDate(t1
				.getDate()
			); //获取昨日日期 t.setDate(t.getDate()-1),获取今日日期 t.setDate(t.getDate()),获取明日日日期 t.setDate(t.getDate()+1),
			var m1 = t1.getMonth() + 1;
			var d1 = t1.getDate();
			if (m1 < 10) m1 = '0' + m1
			if (d1 < 10) m1 = '0' + d1
			// this.date[0].date = m1+'-'+d1
			this.date = t1.toISOString().split('T')[0]
			if(option.type) {
				this.type = option.type
				if(this.type == 2) {
					uni.setNavigationBarTitle({
						title: '历史记录'
					});
				}
			}
			
			this.list = {
				list: [],
				res : {
					yuyuerenshu:0,
					jinchangrenshu:0,
					chuchangrenshu:0,
					lists:[]
				}
			},
			this.pageSize = 20
			this.getlist(true)
		},
		methods: {
			onClickItem(res) {
				this.search_params.type = res
				this.current = res
				this.getlist(true)
			},
			DateChange(res) {
				this.date = res.year +'-'+res.month+'-'+res.day
				this.search_params.dateline = this.date
				this.getlist(true)
			}
		},
	}
</script>

<style>
	page {
		background-color: white;
	}

	.elder /deep/ .u-subsection .u-item-text {
		font-size: 40rpx !important;
	}

	.listItem {
		display: flex;
		height: 68rpx;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx solid rgb(223, 223, 223);
	}

	.top {
		height: 270upx;
		width: 750rpx;
		background-color: #428FFC;
		color: white;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx 40rpx;
		overflow: hidden;
	}
	
	.top .topNum {
		
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	
	.icon-arrow-right-s-line {
		transform: rotate(90deg);
	}

	.top .item {
		text-align: center;
		/* margin-right: 62upx; */
	}
	
	.top .item .text1 {
		font-size: 40rpx;
	}
	
	.elder .top .item .text1 {
		font-size: 60rpx;
	}
	
	.wave {
	    background: url(../../static/wave.png) repeat-x;
	    position: absolute;
	    top: 135rpx;
	    width: 10750rpx;
	    height: 180rpx;
		/* left: -1500rpx; */
	  /* -webkit-animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) forwards;
	    animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) forwards; */
	    transform: translate3d(0, 0, 0);
		opacity: 1;
	}
	
	.wave:nth-of-type(2) {
	    top: -175px;
	    -webkit-animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 7s ease -1.25s infinite;
	    animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 7s ease -1.25s infinite;
	    
	}
	
	@keyframes wave{
		0% {
		    margin-left: 0;
		}
		100% {
		    margin-left: -4500rpx;
		}
	}
	
	@keyframes swell{
		0%, 100% {
		    transform: translate3d(0, -25px, 0);
		}
		50% {
		    transform: translate3d(0, 5px, 0);
		}
	}
</style>
