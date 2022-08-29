<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bar-width="100" bg-color="#F6F7F8"
			height="100"></u-tabs>
		<view class="u-p-40">
			<view class="card" v-for="(item,index) in data" @click="toDetail(item.ordernum)">
				<view class="mark-used" v-if="type == 1">
					已使用
				</view>
				<view class="mark-used" v-if="type == 2">
					已失效
				</view>
				<view class="mark-used" v-if="type == 3">
					已入场
				</view>
				<view class="card2">
					<image
						:src="item.cover[0].url" mode="aspectFill" lazy-load>
					</image>
					<view class="content">
						<view class="title text-ellipsis-1">{{item.schoolname}}</view>
						<view>
							<view class="text-ellipsis-1 u-m-t-20">{{item.address}}</view>
							<view class="text-ellipsis-1 u-m-t-20">{{item.time}}</view>
						</view>
					</view>
				</view>
				<view class="line-dash"></view>
				<view class="u-flex u-row-between u-m-t-20">
					<view class="content">{{item.is_fee?'收费预约':'入场预约'}}</view>
					<button v-if="type == 0" >立即使用</button>
					<button v-if="(type == 1) && (item.is_pingjia == 0)" style="background-color: #F99D18;"
						@click.stop="toPingjia(item.appointmentid)">立即评价</button>
					<button v-if="(type == 1) && (item.is_pingjia == 1)" class="btn-disabled" style="background-color: #C3C3C3;">已评价</button>
					<button v-if="type == 2" class="btn-line" @click.stop="toDelete(item.appointmentid)">删除</button>
					<view v-if="type == 3" style="color: #428FFC;">入场时间：<span>{{new Date(parseInt(item.intime)*1000).toLocaleString()}}</span></view>
				</view>
			</view>
		</view>
		<myModal v-model="show" :title="modalTitle" @click="modalClick"></myModal>
		<u-empty text="暂无数据" mode="data" v-if="data.length == 0" margin-top="100" icon-color="white" color="white"></u-empty>
	</view>
</template>

<script>
	import myModal from '../../component/modal.vue'
	export default {
		components:{
			myModal
		},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				status: 'nomore',
				list: [{
					name: '未使用'
				}, {
					name: '已入场'
				}, {
					name: '已使用'
				}, {
					name: '已失效',
				}],
				current: 0,// 0:未使用 1：已使用 2：已取消或已过期 
				data:[],
				show:false,
				modalTitle:'是否确认删除此条预约',
				choosen:null,
				type:0,
			}
		},
		onLoad() {
			
			// uni.$on('myYuyueUpdate', ()=>{
			// 	this.getData()
			// })
		},
		// onUnload() {
		// 	uni.$off('myYuyueUpdate')
		// },
		onShow() {
			this.getData()
		},
		methods: {
			change(index) {
				this.data = []
				this.current = index;
				if (this.current == 0) {
					this.type = 0
				} else if (this.current == 1) {
					this.type = 3
				} else if (this.current == 2) {
					this.type = 1
				} else if (this.current == 3) {
					this.type = 2
				}
				this.getData()
			},
			tabSelect(id) {
				this.current = id
			},
			getData() {
				this.http.post('appointment/myappointment',{
					type:this.type
				},2).then((data)=>{
					this.data = data.appointment
					
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: './yuyueDetail?id=' + id + '&&type=' + this.type
				})
			},
			toPingjia(id) {
				uni.navigateTo({
					url: './pingjia?id=' + id +'&&type=1'
				})
			},

			toDelete(id) {
				this.choosen = id
				this.modalTitle = '是否确认删除此条预约'
				this.show = true
			},
			modalClick() {
				this.show = false
				this.http.post('appointment/delappoint',{appointid: this.choosen},2).then((data)=>{
					uni.startPullDownRefresh()
				})
			},
			async onPullDownRefresh() {
				await this.getData()
				uni.stopPullDownRefresh()
			},
		}
	}
</script>

<style>
	page {
		background-color: #428FFC;
	}

	.card {
		background-color: white;
		border-radius: 16upx;
		padding: 30upx 30upx 22upx 26upx;
		height: auto;
		margin-bottom: 20upx;
		position: relative;
	}

	.card2 {
		margin: 0;
		padding-bottom: 20rpx;
	}

	.card image {
		width: 182upx;
		height: 146upx;
		border-radius: 8upx;
	}

	.card2 .content {
		justify-content: flex-start;
	}
</style>
