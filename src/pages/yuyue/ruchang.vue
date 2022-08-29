<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="bg"></view>

		<view class="main">

			<view style="width: 100%; color: white; text-align: center;margin: 34upx 0 24rpx 0;padding: 0 40upx;">
				<view class="font-bold u-font-36 text-ellipsis-2">{{title}}</view>
			</view>
			<view class="panel">
				<view class="dot1"></view>
				<view class="dot2"></view>
				<view class="card">
					<view class="title">时间选择</view>

					<view class="sportsCheck">
						<view v-for="(item,index) in date" class="item" :class="checkDate == item.id?'checked':''"
							@click="dateChange(item.id)" v-if="index<3">
							<view>{{item.name}}</view>
							<view class="u-m-t-8">{{item.date.split('-')[1]+'-'+item.date.split('-')[2]}}
							</view>
							<!-- <view class="u-m-t-8" >{{item.date}}</view> -->
						</view>
						<uni-datetime-picker type="date" :value="startTime" :start="startTime" @change="timeChange">
							<view v-for="(item,index) in date" class="item item2"
								:class="checkDate == item.id?'checked':''" @click="dateChange(item.id)" v-if="index==3">
								<view>{{item.name}}</view>
								<view class="u-m-t-8" v-if="item.date">
									{{item.date.split('-')[1]+'-'+item.date.split('-')[2]}}
								</view>
								<view class="u-m-t-8" v-if="!item.date">时间</view>
							</view>
						</uni-datetime-picker>

					</view>
					<view class="line-dash"></view>
					<view class="title">喜好运动类型（可多选）</view>

					<view class="sportsCheck">
						<uni-data-checkbox mode="tag" multiple v-model="checkSports" :localdata="sports">
						</uni-data-checkbox>
					</view>

				</view>
			</view>

			<view class="panel">
				<view class="card" style="padding-right: 30rpx;">
					<view>
						<view class="title">入场须知</view>
						<view class="text-black" style="margin: 15rpx 0 40rpx 0 ;">
							<view style="margin-top: 30rpx;">1、每日早7：00开放新的预约资源。</view>
							<view style="margin: 20rpx 0;">
								2、选择运动类型后，系统会自动为您分配运动场地。为避免健身资源浪费，请根据实际需求预约场地。</view>
							<view>3、提交预约时系统会自动查验您的健康码、行程码，不符合防疫要求的人员将无法预约。</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="mask " :class="value?'show':''" @touchmove.prevent>
				<view class="toast" style="height: auto;">
					<view class="titleArea" style="padding: 76rpx 0 52rpx 0;">
						<view class="title">免责声明</view>
					</view>
					<view class="line"></view>
					<view class="u-m-t-40 u-m-b-60">在使用本应用前，请您务必仔细阅读并透彻理解本声明。若您使用本应用，您的使用行为将被视为对本声明全部内容的认可。</view>
					<view class="btnArea u-m-b-60">
						<button @click="agree()">同意</button>
						<button class="btn-line" @click="disagree()">不同意</button>
					</view>
				</view>
			</view>
			
		</view>


		<view class="bottom">
			<button @click="submit()">提交预约</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				value:true,
				id: null,
				title: '',
				show: false,
				shiyong: 0,
				single: '',
				date: [{
					id: '0',
					name: '今日',
					date: ''
				}, {
					id: '1',
					name: '明日',
					date: ''
				}, {
					id: '2',
					name: '',
					date: ''
				}, {
					id: '3',
					name: '更多',
					date: ''
				}],
				sports: [],
				checkDate: '0',
				checkSports: [],
				startTime: '',
			}
		},
		mounted() {
			this.setDate()
		},
		onLoad(option) {
			if(uni.getStorageSync('agreement')) {
				this.value = false
			}
			if (option.id) {
				this.id = option.id
				if(option.title) {
					this.title = option.title
				} else {
					this.http.post('order/orderPrevSimple', {
						schoolid: this.id
					}, 2).then((data) => {
						this.title = data.schoolname
					})
				}
				
			}
			this.getSports()
		},
		methods: {
			getSports() {
				this.sports = []
				this.http.post('order/getSearchParam', {
					schoolid:this.id
				}, 2).then((data) => {
					for (var j in data.hobby) {
						this.sports.push({
							value: j,
							text: data.hobby[j]
						})
					}
				})
			},
			agree() {
				uni.setStorageSync('agreement',true)
				this.value = false
			},
			disagree() {
				uni.navigateBack({
					delta:1
				})
			},
			timeChange(res) {
				this.date[3].date = res
				this.checkDate = '3'
			},
			dateChange(id) {
				if (id == 3) {
					// this.checkDate = ''
				} else {
					this.checkDate = id
					this.date[3].date = ''
				}
			},
			setDate() {
				var t1 = new Date();
				t1.setDate(t1
					.getDate()
				); //获取昨日日期 t.setDate(t.getDate()-1),获取今日日期 t.setDate(t.getDate()),获取明日日日期 t.setDate(t.getDate()+1),
				var m1 = t1.getMonth() + 1;
				var d1 = t1.getDate();
				if (m1 < 10) m1 = '0' + m1
				if (d1 < 10) m1 = '0' + d1
				// this.date[0].date = m1+'-'+d1
				this.date[0].date = t1.toISOString().split('T')[0]

				var t2 = new Date();
				t2.setDate(t2.getDate() +
					1); //获取昨日日期 t.setDate(t.getDate()-1),获取今日日期 t.setDate(t.getDate()),获取明日日日期 t.setDate(t.getDate()+1),
				var m2 = t2.getMonth() + 1;
				var d2 = t2.getDate();
				if (m2 < 10) m2 = '0' + m2
				if (d2 < 10) m2 = '0' + d2
				// this.date[1].date = m2+'-'+d2
				this.date[1].date = t2.toISOString().split('T')[0]

				var t3 = new Date();
				t3.setDate(t3.getDate() +
				2); //获取昨日日期 t.setDate(t.getDate()-1),获取今日日期 t.setDate(t.getDate()),获取明日日日期 t.setDate(t.getDate()+1),
				var m3 = t3.getMonth() + 1;
				var d3 = t3.getDate();
				var day = t3.getDay()
				switch (day) {
					case 1:
						day = '周一';
						break;
					case 2:
						day = '周二';
						break;
					case 3:
						day = '周三';
						break;
					case 4:
						day = '周四';
						break;
					case 5:
						day = '周五';
						break;
					case 6:
						day = '周六';
						break;
					case 0:
						day = '周日';
						break;
				}
				// if (m3 < 10) m3 = '0' + m3
				// if (d3 < 10) m3 = '0' + d3
				// this.date[2].date = m3+'-'+d3
				this.date[2].date = t3.toISOString().split('T')[0]
				this.date[2].name = day

				var t4 = new Date();
				t4.setDate(t4.getDate() + 3);
				this.startTime = t4.toISOString().split('T')[0]
			},
			submit() {

				if (!this.checkDate) {
					uni.showToast({
						title: '请选择预约时间',
						icon: 'none'
					})
				} else if (this.checkSports.length <= 0) {
					uni.showToast({
						title: '请至少选择一项运动类型',
						icon: 'none'
					})
				} else {

					var date = this.date[this.checkDate].date
					var label = []
					this.checkSports.forEach((v) => {
						var num = this.sports.find(data=> data.value == v).text
						label.push(num)
					})
					this.http.post('order/orderSimple', {
						schoolid: this.id,
						date: date,
						label: label
					}, 2).then((data) => {
						uni.redirectTo({
							url: './success?id=' + data.ordernum + '&&type=0' //0成功1失败
						})
					}).catch(()=>{
						// uni.redirectTo({
						// 	url: './success?id=' + this.id + '&&type=1' //0成功1失败
						// })
					})

				}
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: calc(248upx + env(safe-area-inset-bottom));
	}

	.bg {
		top: 0;
		width: 100%;
		height: 410upx;
		position: fixed;
		overflow: hidden;
		/* background-color: rgb(66,143,252); */
		z-index: 0;
	}

	.bg:after {
		content: '';
		width: 140%;
		height: 410upx;
		position: absolute;
		left: -20%;
		top: 0;
		border-radius: 0 0 80% 80%;
		background-color: rgb(66, 143, 252);
		z-index: -1;
	}

	.main {
		width: 100%;
		position: absolute;
		top: 0;
		padding: 0 40upx;
		padding-bottom: calc(164upx + env(safe-area-inset-bottom));
	}

	.panel {
		position: relative;
		width: 100%;
		background-color: white;
		border-radius: 20upx;
	}

	.card {
		background-color: white;
		border-radius: 16upx;
		padding: 30upx 10upx 22upx 26upx;
		height: auto;
		margin-bottom: 20upx;
	}


	.card .title {
		margin-top: 20upx;
		/* font-size: 32upx; */
	}

	.used {
		position: relative;
	}

	.used .erweima {
		opacity: 0.5;
	}

	.dot1,
	.dot2 {
		position: absolute;
		width: 10upx;
		height: 20upx;
		background-color: rgb(66, 143, 252);
		border-radius:0 10rpx 10rpx  0 ;
		top: 100upx;
	}
	
	.dot1 {
		left: 0upx;
	}
	
	.dot2 {
		right: 0upx;
		border-radius:10rpx 0 0 10rpx ;
	}

	.title:first-child {
		margin-top: 0;
	}


	.uni-data-checklist .checklist-group .checklist-box.is--tag {}

	.sportsCheck {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		margin-top: 15rpx;
	}

	/deep/.uni-data-checklist .checklist-group .checklist-box {}

	/deep/.uni-data-checklist .checklist-group .checklist-box.is--tag,
	.sportsCheck .item {
		box-sizing: border-box;
		width: 136rpx;
		min-height: 72rpx;
		border-radius: 10rpx;
		border: 2rpx solid rgba(211, 212, 215, 1) !important;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #363A44 !important;
		margin-bottom: 20rpx !important;
		margin-right: 18rpx !important;
		flex-direction: column;
		padding: 10rpx !important;
		background-color: white !important;
	}
	
	.elder /deep/.uni-data-checklist .checklist-group .checklist-box.is--tag,
	.elder .sportsCheck .item {
		font-size:36rpx;
	}

	.sportsCheck .item2 {
		margin-right: 0rpx !important;
	}

	/* /deep/.uni-data-checklist .checklist-group .checklist-box.is--tag:nth-child(4n),
	.sportsCheck .item:nth-child(4n) {
		margin-right: 0 !important;
	} */

	/deep/.uni-data-checklist .checklist-group .checklist-box.is--tag.is-checked,
	.sportsCheck .checked {
		color: #FF6A2A !important;
		border: 2rpx solid rgba(255, 106, 42, 1) !important;
		background-color: rgba(255, 106, 42, 0.2) !important;
	}

	/deep/.uni-data-checklist .checklist-group .checklist-box.is--tag .checklist-text {
		text-align: center !important;
		font-size: 24rpx !important;
	}
	
	.elder /deep/.uni-data-checklist .checklist-group .checklist-box.is--tag .checklist-text {
		font-size: 36rpx !important;
	}

	/deep/.is-checked .checklist-text {
		color: #FF6A2A !important;
	}
</style>
