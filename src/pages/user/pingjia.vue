<template>
	<view>
		<view class="title">您的评价让我们做的更好</view>
		<view class="flex column align-center">
			<view class="flex align-center">
				<view class="u-m-r-30">服务态度</view>
				<uni-rate v-model="rateValue1" @change="onChange" :allowHalf="true" size="40" />
			</view>
			<view class="flex align-center margin-tb-30">
				<view class="u-m-r-30">场地环境</view>
				<uni-rate v-model="rateValue2" @change="onChange" :allowHalf="true" size="40" />
			</view>
			<view class="flex align-center">
				<view class="u-m-r-30">综合评价</view>
				<uni-rate v-model="rateValue3" @change="onChange" :allowHalf="true" size="40" />
			</view>

			<textarea placeholder="其他建议" v-model="suggest"></textarea>
			<button class="btn-l u-margin-60" @click="sub">提交</button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id:null,
				rateValue1: 5,
				rateValue2: 5,
				rateValue3: 5,
				suggest: '',
				type:1,//1.预约2.活动
			}
		},
		onLoad(option) {
			if(option.id) {
				this.id = option.id
			}
			if(option.type) {
				this.type = option.type
			}
		},
		methods: {
			
			sub() {
				if(this.type == 1) {
					this.http.post('appointment/addpingjia',{
						appointid:this.id ,
						serverstar:this.rateValue1*2 ,
						groundstar:this.rateValue2*2 ,
						multiplestar:this.rateValue3*2 ,
						otheradvice:this.suggest ,
					},2).then(()=>{
						uni.showModal({
							showCancel:false,
							title:'评价成功',
							content:'点击确定返回上级',
							success:(res) => {
								if(res.confirm) {
									uni.$emit('myYuyueUpdate')
									uni.navigateBack({
										delta:1
									})
								}
							}
						})
					})
				} else if(this.type == 2) {
					this.http.post('activity/addpingjia',{
						activityid:this.id ,
						serverstar:this.rateValue1*2 ,
						groundstar:this.rateValue2*2 ,
						multiplestar:this.rateValue3*2 ,
						otheradvice:this.suggest ,
					},2).then(()=>{
						uni.showModal({
							showCancel:false,
							title:'评价成功',
							content:'点击确定返回上级',
							success:(res) => {
								if(res.confirm) {
									uni.$emit('myActivityUpdate')
									uni.navigateBack({
										delta:1
									})
								}
							}
						})
					})
				}
				
				
			},
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	.title {
		width: 100%;
		text-align: center;
		font-size: 40upx;
		color: #428FFC;
		font-weight: bold;
		margin: 50upx 0 70upx 0;
	}

	/deep/ .uni-icons {
		/* font-size: 62upx !important; */
	}

	/deep/ .uni-rate__icon {
		/* margin-left: 18upx !important; */
	}

	textarea {
		width: 548upx;
		height: 130upx;
		border: 2upx solid rgba(221, 221, 221, 1);
		border-radius: 6upx;
		margin-top: 44upx;
		padding: 20upx;
	}
</style>
