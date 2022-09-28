<template>
	<view :class="uiStyle == 'normal' ? '' : 'elder'">
		<u-form :model="form" ref="uForm" :border-bottom="true" label-width="184">
			<uniSection title="教师信息" type="line">
				<u-form-item label="教师姓名" required prop="name">
					<u-input v-model="form.name" placeholder="请输入教师姓名" />
				</u-form-item>
				<u-form-item label="教师年龄" required prop="name">
					<u-input v-model="form.age" placeholder="请输入教师年龄" />
				</u-form-item>
				<u-form-item label="联系手机" prop="mobile">
					<u-input v-model="form.mobile" placeholder="请输入联系手机" />
				</u-form-item>
				<u-form-item label="人员性质" prop="nature">
					<u-picker mode="selector" v-model="showNature" @confirm="NatureChange" :range="natureList"
						range-key="text" :safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.nature_name" placeholder="请选择人员性质" type="select"
						@click="showNature = true" />
				</u-form-item>
				<u-form-item label="课程语言" prop="course">
					<u-picker mode="selector" v-model="showCourse" @confirm="CourseChange" :range="courseList"
						range-key="text" :safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.course_language_name" placeholder="请选择课程语言" type="select"
						@click="showCourse = true" />
				</u-form-item>
				<u-form-item label="文化程度" prop="course">
					<u-picker mode="selector" v-model="showEducation" @confirm="EducationChange" :range="educationList"
						range-key="text" :safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.education_name" placeholder="请选择文化程度" type="select"
						@click="showEducation = true" />
				</u-form-item>
				<u-form-item label="所在镇街道" prop="town">
					<u-picker mode="selector" v-model="show" @confirm="TownChange" :range="townList" range-key="text"
						:safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.town_name" placeholder="请选择镇街道" type="select" @click="show = true" />
				</u-form-item>
				<u-form-item label="详细地址" prop="address">
					<u-input v-model="form.address" placeholder="请输入详细地址" type="select" @tap="chooseLocation" />
				</u-form-item>
				<u-form-item label="地址经度" prop="ing">
					<u-input v-model="form.lngview" placeholder="请输入地址经度" />
				</u-form-item>
				<u-form-item label="地址纬度" prop="lat">
					<u-input v-model="form.latview" placeholder="请输入地址纬度" />
				</u-form-item>
				<u-form-item label="服务时长" prop="time">
					<u-input v-model="form.service_duration" placeholder="请输入服务时长" />
				</u-form-item>
				<u-form-item label="职业" prop="occupation">
					<u-picker mode="selector" v-model="showOccupation" @confirm="OccupationChange"
						:range="occupationList" range-key="text" :safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.occupation_name" placeholder="请选择职业" type="select"
						@click="showOccupation = true" />
				</u-form-item>
				<view class="panel">
					<view class="card">
						<view class="title">时间选择</view>

						<view class="sportsCheck">
							<view v-for="(item, index) in date" class="item" :class="item.checked ? 'checked' : ''"
								@click="dateChange(item.id)">
								<view>{{ item.name }}</view>
								<view class="u-m-t-8">{{ item.time }} </view>
							</view>
						</view>
					</view>
				</view>
			</uniSection>
		</u-form>

		<view class="buttom">
			<button @click="sub">立即登记</button>
		</view>
	</view>
</template>

<script>
	import uniSection from '../../uni-section/uni-section.vue';
	import * as util from '../../common/util.js';
	var formatLocation = util.formatLocation;

	export default {
		components: {
			uniSection
		},
		watch: {},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				show: false,
				header: {},
				type: 2, //0：志愿活动1：组队活动 2：场地登记 3：科普活动
				action: 'https://playground.mycej.com/index.php/api/activity/uploadCover',
				date: [],
				town: '',
				townList: [],
				natureList: [],
				courseList: [],
				occupationList: [],
				educationList: [],
				location: {},
				hasLocation: false,
				showNature: false,
				showCourse: false,
				showEducation: false,
				showOccupation: false,
				form: {
					name: '',
					age: '',
					town_id: '',
					town_name: '',
					address: '',
					lng: '', //经度
					lat: '', //纬度
					teacherTimeSection:[]
				},
				rules: {
					name: [
						// 对sitename字段进行必填验证
						{
							required: true,
							message: '请输入学生姓名',
							trigger: ['change', 'blur']
						}
					]
				}
			}
		},
		onLoad(option) {
			var token = uni.getStorageSync('user-token')
			this.header = {
				token: token
			}
			this.getCategory()
			this.getDate()
			this.getCourse()
			this.getEducation()
			this.getNature()
			this.getOccuption()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			chooseLocation: function() {
				uni.chooseLocation({
					success: (res) => {
						console.log(formatLocation(res.longitude, res.latitude), res.address)
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
						this.form.lngview = "E: " + this.location.longitude[0] + "°" + this.location
							.longitude[1] + "′";
						this.form.latview = "N: " + this.location.latitude[0] + "°" + this.location
							.latitude[1] + "′";
						this.form.lng = this.location.longitude[0] + "." + this.location
							.longitude[1];
						this.form.lat = this.location.latitude[0] + "." + this.location
							.latitude[1];
						this.form.address = res.address;
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			getCategory() {
				this.http.get(
					'/api/sys/item/104', {
						type: 0
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.townList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			getCourse() {
				this.http.get(
					'/api/sys/item/101', {
						type: 0
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
			getNature() {
				this.http.get(
					'/api/sys/item/105', {
						type: 0
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.natureList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			getOccuption() {
				this.http.get(
					'/api/sys/item/106', {
						type: 0
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.occupationList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			getEducation() {
				this.http.get(
					'/api/sys/item/102', {
						type: 0
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.educationList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			getDate() {
				this.http.get(
					'/api/sys/item/108', {
						type: 0,
						ppc: -1
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						if (!data.rows[i].status) {
							continue
						}
						this.date.push({
							id: data.rows[i].id,
							no: data.rows[i].no,
							name: data.rows[i].name,
							time: data.rows[i].relevant_info,
							checked: false
						})
					}
				})
			},
			dateChange(id) {
				let time = this.date.find(v => {
					// 防止找不到id==0的对象，以致所以有对象的name都会被改为 'name'
					if (v.id != id) {
						return
					}
					v.checked = !v.checked
					return v.id == id
				})
				this.form.teacherTimeSection.push({
					time_section_id: time.id
				})
			},
			TownChange(e) {
				this.form.town_name = this.townList[e].text
				this.form.town_id = this.townList[e].value
			},
			NatureChange(e) {
				this.form.nature_name = this.natureList[e].text
				this.form.nature_id = this.natureList[e].value
			},
			CourseChange(e) {
				this.form.course_language_name = this.courseList[e].text
				this.form.course_language_id = this.courseList[e].value
			},
			OccupationChange(e) {
				this.form.occupation_name = this.occupationList[e].text
				this.form.occupation_id = this.occupationList[e].value
			},
			EducationChange(e) {
				this.form.education_name = this.educationList[e].text
				this.form.education_id = this.educationList[e].value
			},
			sub() {
				var josnform = JSON.stringify(this.form);
				console.log(josnform)

				this.http.post1('/api/teacher', josnform, 2).then((data) => {
					if (data.status == 1) {
						console.log(data.data.id)
						uni.redirectTo({
							url: './success?id=' + data.id + '&&type=0' //0成功1失败
						})
					} else {
						uni.redirectTo({
							url: './success?id=' + data.id + '&&msg=' + data.msg + '&&type=1' //0成功1失败
						})
					}

				}).catch(() => {
					// uni.redirectTo({
					// 	url: './success?id=' + this.id + '&&type=1' //0成功1失败
					// })
				})
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

	.picker .placeholder {
		color: #c0c4cc;
		flex: 1 0 0;
	}

	.picker .icon-arrow-right-s-line {
		color: #c7c7cc;
		flex: 0 0 0;
		font-size: 40rpx;
		transform: translateX(10rpx);
	}

	/deep/ .u-form-item--left[data-v-5e7216f1] {
		display: block;
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

	.elder .picker {
		font-size: 36rpx;
	}

	.elder /deep/.u-form-item {
		font-size: 40rpx;
	}

	.elder /deep/ .u-input__input {
		font-size: 36rpx;
	}

	.panel {
		position: relative;
		width: 100%;
		background-color: white;
		border-radius: 20upx;
		border-bottom: 1px solid rgb(236, 236, 236);
	}

	.card {
		background-color: white;
		border-radius: 16upx;
		padding: 22upx 10upx 22upx 45upx;
		height: auto;
		margin-bottom: 20upx;
	}

	.card .title {
		/* margin-top: 20upx; */
		/* font-size: 32upx; */
		font-weight: normal;
	}

	.cd /deep/ .label-text {
		font-size: 28rpx;
	}

	.cd /deep/ .uni-forms-item__label {
		width: 120rpx;
		margin-left: 40rpx;
		margin-top: 15rpx;
	}

	.cd /deep/ .uni-forms-item__content {
		margin-top: 20rpx;
		margin-right: 40rpx;
	}

	.cd {
		text-align: right;
	}

	.cd /deep/ .btn1 {
		width: 80rpx;
		height: 40rpx;
		font-size: 22rpx;
		background-color: #5ac725;
	}

	.cd /deep/ .btn2 {
		width: 80rpx;
		height: 40rpx;
		font-size: 22rpx;
		background-color: #f56c6c;
	}

	.mycard /deep/ .uni-forms-item__inner {
		padding-bottom: 15rpx;
	}

	.mycard /deep/ .label-text {
		font-size: 22rpx;
	}


	.sportsCheck {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		margin-top: 15rpx;
	}

	.sportsCheck .item {
		box-sizing: border-box;
		width: 136rpx;
		min-height: 72rpx;
		border-radius: 10rpx;
		border: 2rpx solid rgba(211, 212, 215, 1) !important;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18rpx;
		color: #363a44 !important;
		margin-bottom: 20rpx !important;
		margin-right: 18rpx !important;
		flex-direction: column;
		padding: 10rpx !important;
		background-color: white !important;
	}

	.sportsCheck .checked {
		color: #ff6a2a !important;
		border: 2rpx solid rgba(255, 106, 42, 1) !important;
		background-color: rgba(255, 106, 42, 0.2) !important;
	}
</style>
