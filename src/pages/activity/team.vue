<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-form :model="form" ref="uForm" :border-bottom="true" label-width="184">
			<uniSection title="上传照片" type="line">
				<view class="u-p-lr-40  upPic">
					<view class="content u-font-24 u-m-b-20">至少上传一张配图</view>
					<u-form-item label="" :borderBottom="false" prop="assetid">
						<u-upload :action="action" :max-size="20 * 1024 * 1024" @on-remove="remove"
							@on-uploaded="uploaded" ref="uUpload" :header="header" :file-list="picList"></u-upload>
					</u-form-item>
				</view>

			</uniSection>
			<uniSection title="活动信息" type="line">
				<u-form-item label="活动名称" required prop="activityname">
					<u-input v-model="form.activityname" placeholder="请输入活动名称" />
				</u-form-item>
				<u-form-item label="报名开始时间" required prop="enrollstarttime">
					<u-picker :default-time="form.enrollstarttime" v-model="show1" mode="time"
						@confirm="DateChange(1,$event)" :params="params" :safe-area-inset-bottom="true"></u-picker>
					<!-- <view class="picker" @click="show1 = true">
						<view :class="form.enrollstarttime?'':'placeholder'">
							{{form.enrollstarttime?form.enrollstarttime:'请选择开始时间'}}
						</view>
						<view class="icon-arrow-right-s-line"></view>
					</view> -->
					<u-input v-model="form.enrollstarttime" placeholder="请选择开始时间" type="select"  @click="show1 = true" />
					
				</u-form-item>
				<u-form-item label="报名结束时间" required prop="enrollendtime">
					<u-picker :default-time="form.enrollendtime" v-model="show2" mode="time"
						@confirm="DateChange(2,$event)" :params="params" :safe-area-inset-bottom="true"></u-picker>
					<!-- <view class="picker" @click="show2 = true">
						<view :class="form.enrollendtime?'':'placeholder'">
							{{form.enrollendtime?form.enrollendtime:'请选择开始时间'}}
						</view>
						<view class="icon-arrow-right-s-line"></view>
					</view> -->
					<u-input v-model="form.enrollendtime" placeholder="请选择结束时间" type="select"  @click="show2 = true" />
					
				</u-form-item>
				<u-form-item label="活动开始时间" required prop="starttime">
					<u-picker :default-time="form.starttime" v-model="show3" mode="time" @confirm="DateChange(3,$event)"
						:params="params" :safe-area-inset-bottom="true"></u-picker>
					<!-- <view class="picker" @click="show3 = true">
						<view :class="form.starttime?'':'placeholder'">
							{{form.starttime?form.starttime:'请选择开始时间'}}
						</view>
						<view class="icon-arrow-right-s-line"></view>
					</view> -->
					<u-input v-model="form.starttime" placeholder="请选择开始时间" type="select"  @click="show3 = true" />
					
				</u-form-item>
				<u-form-item label="活动结束时间" required prop="endtime">
					<u-picker :default-time="form.endtime" v-model="show4" mode="time" @confirm="DateChange(4,$event)"
						:params="params" :safe-area-inset-bottom="true"></u-picker>
					<!-- <view class="picker" @click="show4 = true">
						<view :class="form.endtime?'':'placeholder'">
							{{form.endtime?form.endtime:'请选择开始时间'}}
						</view>
						<view class="icon-arrow-right-s-line"></view>
					</view> -->
					<u-input v-model="form.endtime" placeholder="请选择结束时间" type="select"  @click="show4 = true" />
					
				</u-form-item>
				<u-form-item label="活动地点" required prop="schoolid">
					<!-- <view class="picker" @click="toChoose()">
						<view :class="schoolName?'':'placeholder'">
							{{schoolName?schoolName:'请选择活动地点'}}
						</view>
						<view class="icon-arrow-right-s-line"></view>
					</view> -->
					<u-input v-model="schoolName" placeholder="请选择活动地点" type="select"  @click="toChoose()" />
					
				</u-form-item>
				<u-form-item label="活动人数" required prop="needpeople">
					<u-input v-model="form.needpeople" placeholder="请输入活动人数" type="number" />
				</u-form-item>
				<u-form-item label="活动介绍" required prop="introduce">
					<view style="width: 100%;">
						<u-input v-model="form.introduce" type="textarea" maxlength="160" placeholder="请输入活动介绍" />
						<view style="color: #00000070;width: 100%;text-align: end;line-height: 1;">
							{{form.introduce.length}}/160字
						</view>
					</view>
				</u-form-item>
			</uniSection>
		</u-form>
		<view class="buttom">
			<button @click="sub">立即发布</button>
		</view>

	</view>
</template>

<script>
	import uniSection from '../../uni-section/uni-section.vue'
	export default {
		components: {
			uniSection
		},
		watch: {

		},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				header: {},
				picUped: true,
				activityid: null,
				type: 1, //0：志愿活动1：组队活动 2：宣讲活动 3：科普活动
				action: 'https://playground.mycej.com/index.php/api/activity/uploadCover',
				schoolName: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					// second: false
				},
				picList:[],
				form: {
					activityname: '',
					assetid: [],
					starttime: '',
					endtime: '',
					enrollstarttime: '',
					enrollendtime: '',
					schoolid: '',
					needpeople: '',
					score: '', //0,2,3
					introduce: '',
					category: '', //2：宣讲活动 3：科普活动
					organization: '', //2：宣讲活动 3：科普活动
				},
				rules: {
					assetid: [
						// 对name字段进行必填验证
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return value.length > 0;
							},
							message: '请至少上传一张配图',
							trigger: ['change', 'blur']
						},
					],
					activityname: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请输入活动名称',
							trigger: ['change', 'blur']
						},
					],
					starttime: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请选择活动开始时间',
							trigger: ['change', 'blur']
						},
					],
					endtime: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请选择活动结束时间',
							trigger: ['change', 'blur']
						},
					],
					enrollstarttime: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请选择报名开始时间',
							trigger: ['change', 'blur']
						},
					],
					enrollendtime: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请选择报名结束时间',
							trigger: ['change', 'blur']
						},
					],
					schoolid: [
						// 对name字段进行必填验证
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return value ? true : false;
							},
							message: '请选择活动地点',
							trigger: ['change', 'blur']
						},
					],
					needpeople: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请填写活动人数',
							trigger: ['change', 'blur']
						},
						// {
						// 	validator: (rule, value, callback) => {
						// 		// 上面有说，返回true表示校验通过，返回false表示不通过
						// 		// this.$u.test.mobile()就是返回true或者false的
						// 		return value ? true : false;
						// 	},
						// 	message: '请填写活动人数',
						// 	trigger: ['change', 'blur']
						// },
					],
					introduce: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请填写活动介绍',
							trigger: ['change', 'blur']
						},
					],
				}
			}
		},
		onLoad(option) {
			var token = uni.getStorageSync('user-token')
			this.header = {
				token: token
			}
			uni.$on('chooseSchool', (data) => {
				this.form.schoolid = data.id
				this.schoolName = data.schoolname
			})

			if (option.id) {
				this.activityid = option.id
				this.getData()
			}
		},
		onUnload() {
			uni.$off('chooseSchool')
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			getData() {
				this.http.post('activity/activityDetail', {
					activityid: this.activityid
				}, 2).then((data) => {
					var tmp = data.activity
					this.form = {
						activityname: tmp.activityname,
						assetid: JSON.parse(tmp.assetid) ,
						starttime: tmp.starttime,
						endtime: tmp.endtime,
						enrollstarttime: tmp.enrollstarttime,
						enrollendtime: tmp.enrollendtime,
						schoolid: tmp.schoolid,
						needpeople: tmp.needpeople,
						introduce: tmp.introduce,
					}
					this.schoolName = tmp.schoolname
					this.picList = []
					tmp.cover.forEach((v)=>{
						this.picList.push({
							url:v.url,
							id:v.id
						})
					})
					
				})
			},
			uploaded(lists) {
				console.log(lists)
				this.form.assetid = []
				this.picUped = true
				lists.forEach((v, index) => {
					if (v.progress == 100) {
						if (v.response) {
							console.log(v)
							this.form.assetid.push(v.response.data.id)
						} else {
							this.form.assetid.push(v.id)
						}
					} else {
						this.picUped = false
					}
				})
			},
			remove(index, lists) {
				this.form.assetid = []
				this.picUped = true
				lists.forEach((v, index) => {
					if (v.progress == 100) {
						if (v.response) {
							console.log(v)
							this.form.assetid.push(v.response.data.id)
						} else {
							this.form.assetid.push(v.id)
						}
					} else {
						this.picUped = false
					}
				})
			},
			DateChange(index, e) {
				console.log(e)
				if (index == 1) {
					this.form.enrollstarttime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
					 // + ':' + e.second
				} else if (index == 2) {
					this.form.enrollendtime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
					 // + ':' + e.second
				} else if (index == 3) {
					this.form.starttime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
					 // + ':' + e.second
				} else if (index == 4) {
					this.form.endtime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute 
					// + ':' + e.second
				}
			},
			toChoose() {
				uni.navigateTo({
					url: 'chooseSchool'
				})
			},
			sub() {
				if (this.picUped == false) {
					uni.showToast({
						icon: 'none',
						title: '有图片上传失败，请重新上传'
					})
					return;
				}
				this.$u.throttle((data) => {
					this.$refs.uForm.validate((valid) => {
						if(valid) {
							this.http.post('activity/addActivity', {
								activityid: this.activityid,
								...this.form,
								type: this.type
							}, 2).then((data) => {
								if (this.activityid) {
									uni.redirectTo({
										url: 'success2?id=' + this.activityid
									})
								} else {
									uni.redirectTo({
										url: 'success2?id=' + data.id
									})
								}
							
							})
						}
						
					});
				}, 500)
			}
		}
	}
</script>

<style>
	page {
		background-color: white;

	}

	.upPic /deep/ .u-form-item {
		padding: 0;
	}

	picker {
		width: 100%;
	}

	.picker {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.elder .picker {
		font-size: 36rpx;
	}

	.picker .placeholder {
		color: #c0c4cc;
		flex: 1 0 0;
	}

	.picker .icon-arrow-right-s-line {
		color: #C7C7CC;
		flex: 0 0 0;
		font-size: 40rpx;
		transform: translateX(10rpx);
	}

	/deep/ .u-form-item--left[data-v-5e7216f1] {
		display: block;
	}
	
	.elder /deep/.u-form-item {
		font-size:40rpx ;
	}
	.elder /deep/ .u-input__input {
		font-size: 36rpx;
	}

	.buttom {
		width: 100%;
		text-align: center;

	}

	.buttom button {
		margin: 40rpx auto;
		width: 460rpx;
		height: 96rpx;
		font-size: 28rpx;
		border-radius: 48rpx;
	}
	.elder .buttom button{
		font-size: 40rpx;
	}
</style>
